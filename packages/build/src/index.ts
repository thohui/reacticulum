import esbuild from 'esbuild';
import fs from 'fs/promises';
import { glob } from 'glob';
import { createRequire } from 'module';
import path from 'path';
import { runInNewContext } from 'vm';

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

const ESBUILD_ALIAS = {
	react: '@reacticulum/jsx-runtime',
	'react-dom': '@reacticulum/jsx-runtime',
	'react/jsx-runtime': '@reacticulum/jsx-runtime',
};

const ESBUILD_COMMON = {
	alias: ESBUILD_ALIAS,
	jsx: 'automatic' as const,
	platform: 'node' as const,
	format: 'cjs' as const,
	bundle: true,
	minify: true,
	treeShaking: true,
};

export interface BuildOptions {
	pagesDir: string;
	outDir: string;
}

// esbuild doesn't support windows paths in the contents property.
// so we have to convert them to posix style before passing to esbuild.
const posix = (p: string) => p.replaceAll('\\', '/');

async function loadPageConfig(pagePath: string, pagesDir: string) {
	const result = await esbuild.build({
		...ESBUILD_COMMON,
		stdin: {
			contents: `import * as _mod from '${posix(path.resolve(pagePath))}'; export const config = _mod?.config ?? {};`,
			resolveDir: path.resolve(pagesDir),
			loader: 'tsx',
		},
		write: false,
	});

	const mod: any = { exports: {} };
	runInNewContext(result.outputFiles[0].text, {
		exports: mod.exports,
		module: mod,
		require: createRequire(import.meta.url),
		process,
		console,
	});

	return mod.exports.config ?? {};
}

export async function build(options: BuildOptions) {
	const { pagesDir, outDir } = options;

	const parsedOutDir = path.parse(outDir);
	const parsedPagesDir = path.parse(pagesDir);

	await fs.mkdir(parsedOutDir.dir, { recursive: true });

	const pages = await glob(`${pagesDir}/**/*.{jsx,tsx}`);

	for (const pagePath of pages) {
		const config = await loadPageConfig(pagePath, parsedPagesDir.dir);
		const name = path.basename(pagePath, path.extname(pagePath));
		const isDynamic = config.dynamic ?? false;

		if (isDynamic) {
			await buildDynamic(options, pagePath, name);
		} else {
			await buildStatic(options, pagePath, name);
		}
	}

	console.log('build complete');
}

async function buildStatic(options: BuildOptions, pagePath: string, name: string) {
	const entryContents = `
    import '@reacticulum/components'
    import { serialize } from '@reacticulum/core'
    import * as _mod from '${posix(path.resolve(pagePath))}'
    const Page = _mod.default ?? _mod
    export const render = async () => {
      const tree = await Page({})
      return serialize(tree)
    }
  `;

	const { pagesDir, outDir } = options;

	const result = await esbuild.build({
		...ESBUILD_COMMON,
		stdin: {
			contents: entryContents,
			resolveDir: path.resolve(pagesDir),
			loader: 'tsx',
		},
		write: false,
		define: {
			REACTICULUM_PAGE: JSON.stringify(name),
		},
	});

	const code = result.outputFiles[0].text;
	const mod: any = { exports: {} };

	runInNewContext(code, {
		exports: mod.exports,
		module: mod,
		require: createRequire(import.meta.url),
		process,
		console,
		__dirname: path.resolve(pagesDir),
		__filename: path.resolve(pagePath),
	});

	const micron = await mod.exports.render();
	const outPath = path.join(outDir, `${name}.mu`);
	await fs.writeFile(outPath, micron);
	if (process.platform !== 'win32') await fs.chmod(outPath, '644');
	console.log(`static  => ${outPath}`);
}

async function buildDynamic(options: BuildOptions, pagePath: string, name: string) {
	const { outDir, pagesDir } = options;

	const outPath = path.join(path.resolve(outDir), `${name}.mu`);

	const entryContents = `
    import '@reacticulum/components'
    import { serialize } from '@reacticulum/core'
    import * as _mod from '${posix(path.resolve(pagePath))}'
    const Page = _mod.default ?? _mod
    const serve = async (Component) => {
      try {
        const tree = await Component(process.env)
        process.stdout.write(serialize(tree))
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
		...ESBUILD_COMMON,
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
	console.log(`dynamic => ${path.join(outDir, `${name}.mu`)}`);
}
