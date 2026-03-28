import { serialize } from '@reacticulum/core';
import fs from 'fs/promises';
import { glob } from 'glob';
import path from 'path';

const PAGES_DIR = './pages';
const OUT_DIR = './dist';

const build = async () => {
	await fs.mkdir(OUT_DIR, { recursive: true });

	const pages = await glob(`${PAGES_DIR}/**/*.{jsx,tsx}`);

	for (const pagePath of pages) {
		const mod = await import(path.resolve(pagePath));
		const name = path.basename(pagePath, path.extname(pagePath));
		await buildStatic(mod, name);
	}

	console.log('build complete');
};

const buildStatic = async (mod: any, name: string) => {
	const Component = mod.default ?? mod;

	if (typeof Component !== 'function') {
		console.error(` skipping ${name}: no default export found`);
		console.error(` exports:`, Object.keys(mod));
		return;
	}

	const tree = await Component({});
	const micron = serialize(tree);
	const outPath = path.join(OUT_DIR, `${name}.mu`);
	await fs.writeFile(outPath, micron);
	console.log(` static  => ${outPath}`);
};


build();
