import { build } from '@reacticulum/build';
import { loadConfig, type ReacticulumConfig } from '@reacticulum/config';
import cac from 'cac';
import chokidar from 'chokidar';
import { startServer } from './server';

async function resolveConfig(options?: Partial<ReacticulumConfig>): Promise<ReacticulumConfig> {
	const config = await loadConfig();
	const overrides = Object.fromEntries(Object.entries(options ?? {}).filter(([, v]) => v != null));
	return { ...config, ...overrides };
}

const cli = cac('reacticulum');

cli
	.command('build', 'Build Reacticulum pages')
	.option('--pages-dir <dir>', 'Pages directory')
	.option('--out-dir <dir>', 'Output directory')
	.action(async (options) => {
		const config = await resolveConfig({ pagesDir: options.pagesDir, outDir: options.outDir });
		await build(config);
	});

cli.command('watch', 'Watch pages directory and rebuild on changes').action(async (options) => {
	const config = await resolveConfig({ pagesDir: options.pagesDir, outDir: options.outDir });

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
		const config = await loadConfig();
		const pagesDir = options.pagesDir ?? config.pagesDir;
		const port = options.port ? Number(options.port) : undefined;

		await startServer({ pagesDir, port });
	});

cli.help();
cli.version('0.0.1');
cli.parse();

if (!cli.matchedCommand) {
	cli.outputHelp();
}
