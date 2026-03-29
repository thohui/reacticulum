import { build } from '@reacticulum/build';
import { loadConfig, ReacticulumConfig } from '@reacticulum/config';
import cac from 'cac';

async function buildReacticulum(options: Partial<ReacticulumConfig>) {
	const config = await loadConfig();
	const resolved: ReacticulumConfig = { ...config, ...options };
	build(resolved);
}

const cli = cac('reacticulum');

cli
	.command('build', 'Build NomadNet pages')
	.option('--pages-dir <dir>', 'Pages directory')
	.option('--out-dir <dir>', 'Output directory')
	.action(async (options) => {
		await buildReacticulum({
			...(options.pagesDir && { pagesDir: options.pagesDir }),
			...(options.outDir && { outDir: options.outDir }),
		});
	});

cli.showHelpOnExit = true;
cli.help();
cli.version('0.0.1');
cli.parse();