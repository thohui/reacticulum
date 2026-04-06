import { createJiti } from 'jiti';
import path from 'path';

const CONFIG_FILE = 'reacticulum.config.ts';

export interface ReacticulumConfig {
	pagesDir: string;
	outDir: string;
}

export function defineConfig(config: ReacticulumConfig): ReacticulumConfig {
	return config;
}

export async function loadConfig(configPath: string = CONFIG_FILE): Promise<ReacticulumConfig> {
	const jiti = createJiti(import.meta.url);
	const mod = await jiti.import<{ default?: ReacticulumConfig; }>(path.resolve(configPath));
	if (mod.default) {
		return mod.default;
	} else {
		throw new Error('Config file must export default');
	}
}
