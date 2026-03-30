import { build } from '@reacticulum/build';
import { loadConfig, ReacticulumConfig } from '@reacticulum/config';
import cac from 'cac';
import fs from 'fs';

async function resolveConfig(options: Partial<ReacticulumConfig>): Promise<ReacticulumConfig> {
	const config = await loadConfig();
	return { ...config, ...options };
}

const cli = cac('reacticulum');

cli
	.command('build', 'Build NomadNet pages')
	.option('--pages-dir <dir>', 'Pages directory')
	.option('--out-dir <dir>', 'Output directory')
	.action(async (options) => {
		const config = await resolveConfig({
			...(options.pagesDir && { pagesDir: options.pagesDir }),
			...(options.outDir && { outDir: options.outDir }),
		});
		await build(config);
	});

cli
	.command('watch', 'Watch pages directory and rebuild on changes')
	.option('--pages-dir <dir>', 'Pages directory')
	.option('--out-dir <dir>', 'Output directory')
	.action(async (options) => {
		const config = await resolveConfig({
			...(options.pagesDir && { pagesDir: options.pagesDir }),
			...(options.outDir && { outDir: options.outDir }),
		});

		await build(config);

		let debounce: ReturnType<typeof setTimeout> | null = null;

		fs.watch(config.pagesDir, { recursive: true }, () => {
			if (debounce) clearTimeout(debounce);
			debounce = setTimeout(async () => {
				console.log('change detected, rebuilding...');
				await build(config);
			}, 300);
		});

		console.log(`watching ${config.pagesDir}`);
	});

cli.help();
cli.version('0.0.1');
cli.parse();

if (!cli.matchedCommand) {
	cli.outputHelp();
}