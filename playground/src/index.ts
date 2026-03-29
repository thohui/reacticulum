import '@reacticulum/components';
import esbuild from 'esbuild';
import fs from 'fs/promises';
import { glob } from 'glob';
import { createRequire } from 'module';
import path from 'path';
import { runInNewContext } from 'vm';

const SHEBANG = '#!/usr/bin/env node\n';
const GUARD = `
process.on('uncaughtException', (e) => {
  process.stdout.write('#Error\\n')
  process.stdout.write('Something went wrong.\\n')
  process.stderr.write(e.stack + '\\n')
  process.exit(1)
})
process.on('unhandledRejection', (e) => {
  process.stdout.write('#Error\\n')
  process.stdout.write('Something went wrong.\\n')
  process.stderr.write(String(e) + '\\n')
  process.exit(1)
})
`;

const PAGES_DIR = './pages';
const OUT_DIR = './dist';

const ESBUILD_ALIAS = {
	'react': '@reacticulum/jsx-runtime',
	'react-dom': '@reacticulum/jsx-runtime',
	'react/jsx-runtime': '@reacticulum/jsx-runtime',
};

const ESBUILD_COMMON = {
	alias: ESBUILD_ALIAS,
	jsx: 'automatic' as const,
	platform: 'node' as const,
	format: 'cjs' as const,
	bundle: true,
};

const build = async () => {
	await fs.mkdir(OUT_DIR, { recursive: true });

	const pages = await glob(`${PAGES_DIR}/*.{jsx,tsx}`);

	for (const pagePath of pages) {
		const mod = await import(path.resolve(pagePath));
		const name = path.basename(pagePath, path.extname(pagePath));
		const isDynamic = mod.config?.dynamic ?? false;

		if (isDynamic) {
			await buildDynamic(pagePath, name);
		} else {
			await buildStatic(pagePath, name);
		}
	}

	console.log('build complete');
};

const buildStatic = async (pagePath: string, name: string) => {
	// bundle the page and its dependencies into a single CJS module.
	// we can't use a normal import() here because Node's module cache
	// would return a different WeakMap instance than the one used by
	// the bundled components meaning getMicronType would find nothing
	// and the serializer would produce unformatted output.
	// by bundling everything together and running it in a fresh VM context,
	// the components and serializer share the same WeakMap instance.
	const entryContents = `
    import '@reacticulum/components'
    import { serialize } from '@reacticulum/core'
    import * as _mod from '${path.resolve(pagePath)}'
    const Page = _mod.default ?? _mod
    export const render = async () => {
      const tree = await Page({})
      return serialize(tree)
    }
  `;

	const result = await esbuild.build({
		...ESBUILD_COMMON,
		stdin: {
			contents: entryContents,
			resolveDir: path.resolve(PAGES_DIR),
			loader: 'tsx',
		},
		write: false,
	});

	const code = result.outputFiles[0].text;
	const mod: any = { exports: {} };

	runInNewContext(code, {
		exports: mod.exports,
		module: mod,
		require: createRequire(import.meta.url),
		process,
		console,
		__dirname: path.resolve(PAGES_DIR),
		__filename: path.resolve(pagePath),
	});

	const micron = await mod.exports.render();
	const outPath = path.join(OUT_DIR, `${name}.mu`);
	await fs.writeFile(outPath, micron);
	console.log(`static  => ${outPath}`);
};

const buildDynamic = async (pagePath: string, name: string) => {
	const outPath = path.join(OUT_DIR, `${name}.mu`);

	const entryContents = `
    import * as _mod from '${path.resolve(pagePath)}'
    const Page = _mod.default ?? _mod
    const serve = async (Component) => {
      try {
        const { serialize } = require('@reacticulum/core')
        require('@reacticulum/components')
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
			resolveDir: path.resolve(PAGES_DIR),
			loader: 'tsx',
		},
		minify: true,
		treeShaking: true,
		outfile: outPath,
		banner: { js: SHEBANG + GUARD },
	});

	await fs.chmod(outPath, '755');
	console.log(`dynamic => ${outPath}`);
};

build();