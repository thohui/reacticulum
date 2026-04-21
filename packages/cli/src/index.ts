import { build } from '@reacticulum/build';
import { loadConfig, type ReacticulumConfig } from '@reacticulum/config';
import cac from 'cac';
import chokidar from 'chokidar';
import { startServer } from './server';

async function resolveConfig(options?: Partial<ReacticulumConfig>): Promise<ReacticulumConfig> {
	const config = await loadConfig();
	return { ...config, ...options };
}

const cli = cac('reacticulum');

cli
	.command('build', 'Build Reacticulum pages')
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
	.action(async (options) => {
		const config = await resolveConfig({
			...(options.pagesDir && { pagesDir: options.pagesDir }),
			...(options.outDir && { outDir: options.outDir }),
		});

		await build(config);

		chokidar.watch(config.pagesDir).on('change', async () => {
			console.log('file change detected, rebuilding...');
			await build(config);
		});

		console.log(`watching ${config.pagesDir}`);
	});

cli
	.command('serve', 'Start a dev server')
	.option('--pages-dir <dir>', 'Pages directory')
	.option('--port <port>', 'Port to listen on')
	.action(async (options) => {

		const config = await resolveConfig({
			...(options.pagesDir && { pagesDir: options.pagesDir }),
			...(options.port && { port: Number(options.port) }),
		});

		await startServer({ pagesDir: config.pagesDir, port: options.port });

	});

cli.help();
cli.version('0.0.1');
cli.parse();

if (!cli.matchedCommand) {
	cli.outputHelp();
}
