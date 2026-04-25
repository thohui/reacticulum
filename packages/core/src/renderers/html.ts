import type { ComponentMeta } from '@reacticulum/types';
import type { Renderer } from '.';
import type { SerializeContext } from '../context';
import { htmlHandlers } from '../handlers/html';
import { escapeHTML } from '../utils/styles';

export const htmlRenderer: Renderer = {
	escapeText: escapeHTML,
	render(meta: ComponentMeta, props: any, ctx: SerializeContext): string {
		return htmlHandlers[meta.type](props, ctx);
	},
};
