import esbuild from 'esbuild';
import { glob } from 'glob';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { runInNewContext } from 'node:vm';

const SHEBANG = '#!/usr/bin/env node\n';

const GUARD = `
process.on('uncaughtException', (e) => {
  process.stdout.write('Error\\n')
  process.stdout.write('Something went wrong.\\n')
  process.stderr.write(e.stack + '\\n')
  process.exit(1)
})
process.on('unhandledRejection', (e) => {
  process.stdout.write('Error\\n')
  process.stdout.write('Something went wrong.\\n')
  process.stderr.write(String(e) + '\\n')
  process.exit(1)
})
`;

// Point React imports at our own JSX runtime.
export const ESBUILD_ALIAS = {
	react: '@reacticulum/jsx-runtime',
	'react-dom': '@reacticulum/jsx-runtime',
	'react/jsx-runtime': '@reacticulum/jsx-runtime',
};

// Base esbuild config shared with the vite plugin. minify is left out so each caller sets it.
export const ESBUILD_BASE = {
	alias: ESBUILD_ALIAS,
	jsx: 'automatic' as const,
	platform: 'node' as const,
	format: 'cjs' as const,
	bundle: true,
	treeShaking: true,
};

// esbuild doesn't support windows paths in the contents property.
// so we have to convert them to posix style before passing to esbuild.
export const posix = (p: string) => p.replaceAll('\\', '/');

const require = createRequire(import.meta.url);

/**
 * Bundles a string of code with esbuild and runs it in memory, returning its exports.
 * Nothing is written to disk. Used to render pages at build time.
 */
export async function evalBundle<T extends object>(
	entryContents: string,
	resolveDir: string,
	options: {
		esbuildOverrides?: Partial<Parameters<typeof esbuild.build>[0]>;
		// Extra globals to expose in the sandbox, e.g. __dirname, __filename.
		vmContext?: Record<string, unknown>;
	} = {},
): Promise<T> {
	const result = await esbuild.build({
		...ESBUILD_BASE,
		minify: false,
		...options.esbuildOverrides,
		stdin: { contents: entryContents, resolveDir, loader: 'tsx' },
		write: false,
	});

	const module: { exports: T } = { exports: {} as T };

	// This file is ESM, but esbuild outputs CJS. CJS needs globals like `module` and `exports`
	// that don't exist in ESM, so plain eval() won't work. runInNewContext lets us spin up a
	// fresh context and inject those globals manually. It also means there's no file to write
	// to disk just to require() it back.
	runInNewContext(result.outputFiles[0].text, {
		exports: module.exports,
		module: module,
		require,
		process,
		console,
		...options.vmContext,
	});

	return module.exports;
}

interface PageConfig {
	config?: Record<string, unknown>;
}

interface PageExports {
	render: () => Promise<string>;
}

export interface BuildOptions {
	pagesDir: string;
	outDir: string;
}

// Common setup shared by every page bundle
function pageImports(pagePath: string): string {
	return `
    import '@reacticulum/components'
    import { renderMicron } from '@reacticulum/core'
    import * as _mod from '${posix(path.resolve(pagePath))}'
    const Page = _mod.default ?? _mod`;
}

/** Attempts to load a page's configuration object. */
async function loadPageConfig(pagePath: string, pagesDir: string) {
	// TODO: make the page configuration typed and export an interface for it from @reacticulum/types or something.
	const exports = await evalBundle<PageConfig>(
		`import * as _mod from '${posix(path.resolve(pagePath))}'; export const config = _mod?.config ?? {};`,
		path.resolve(pagesDir),
	);
	return exports.config ?? {};
}

/** Builds all pages in the specified directory. */
export async function build(options: BuildOptions) {
	const { pagesDir, outDir } = options;

	await fs.mkdir(outDir, { recursive: true });

	const pages = await glob(`${pagesDir}/**/*.{jsx,tsx}`);

	await Promise.all(
		pages.map(async (pagePath) => {
			const config = await loadPageConfig(pagePath, path.dirname(pagesDir));
			const name = path.basename(pagePath, path.extname(pagePath));
			if (config.dynamic) {
				await buildDynamic(options, pagePath, name);
			} else {
				await buildStatic(options, pagePath, name);
			}
		}),
	);

	console.log('build complete');
}

/** Builds a static page bundle. */
async function buildStatic(options: BuildOptions, pagePath: string, name: string) {
	const { pagesDir, outDir } = options;

	const entryContents = `
	${pageImports(pagePath)}
    export const render = async () => {
      const tree = await Page({})
      return renderMicron(tree)
    }
  `;

	const exports = await evalBundle<PageExports>(entryContents, path.resolve(pagesDir), {
		esbuildOverrides: {
			minify: true,
			define: { REACTICULUM_PAGE: JSON.stringify(name) },
		},
		vmContext: {
			__dirname: path.resolve(pagesDir),
			__filename: path.resolve(pagePath),
		},
	});

	const micron = await exports.render();
	const outPath = path.join(outDir, `${name}.mu`);
	await fs.writeFile(outPath, micron);

	// Make the output file read only.
	// If a page was previously dynamic, but is now dynamic. nomadnet would still think it's dynamic and try to execute it.
	await fs.chmod(outPath, '644');

	console.log(`static  => ${outPath}`);
}

/** Builds a dynamic page bundle. */
async function buildDynamic(options: BuildOptions, pagePath: string, name: string) {
	const { outDir, pagesDir } = options;

	const outPath = path.join(outDir, `${name}.mu`);

	const pageImportsContent = pageImports(pagePath);

	const entryContents = `
	${pageImportsContent}
    const serve = async (Component) => {
      try {
        const tree = await Component(process.env)
        process.stdout.write(renderMicron(tree))
      } catch (e) {
        process.stdout.write('#Error\\n')
        process.stdout.write('Something went wrong.\\n')
        process.stderr.write(e.stack + '\\n')
        process.exit(1)
      }
    }
    serve(Page)
  `;

	await esbuild.build({
		...ESBUILD_BASE,
		minify: true,
		stdin: {
			contents: entryContents,
			resolveDir: path.resolve(pagesDir),
			loader: 'tsx',
		},
		outfile: outPath,
		banner: { js: SHEBANG + GUARD },
		define: {
			REACTICULUM_PAGE: JSON.stringify(name),
		},
	});

	if (process.platform !== 'win32') await fs.chmod(outPath, '755');
	console.log(`dynamic => ${outPath}`);
}
