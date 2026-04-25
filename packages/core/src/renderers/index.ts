import type { ComponentMeta } from '@reacticulum/types';
import type { SerializeContext } from '../context';

export interface Renderer {
	render(meta: ComponentMeta, props: any, ctx: SerializeContext): string;
	escapeText(text: string): string;
}
