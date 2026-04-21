import { getMicronMeta } from '@reacticulum/types';
import type { SerializeContext } from './context';

import { nativeHandlers } from './handlers/native';
import { Renderer } from './renderers';
import { htmlRenderer } from './renderers/html';
import { micronRenderer } from './renderers/micron';

type ReactElement = { type: unknown; props: any; };

export function renderMicron(node: unknown): string {
	return serializeWith(node, micronRenderer);
}

export function renderHTML(node: unknown): string {
	return serializeWith(node, htmlRenderer);
}

function serializeWith(node: unknown, renderer: Renderer): string {
	const ctx: SerializeContext = {
		serialize: null as any,
		renderer: renderer,
	};
	ctx.serialize = (node) => serializeNode(node, ctx);
	return serializeNode(node, ctx);
}

function serializeNode(node: unknown, ctx: SerializeContext): string {
	if (node === null || node === undefined) return '';
	if (typeof node === 'boolean') return '';

	if (typeof node === 'string' || typeof node === 'number') {
		return ctx.renderer.escapeText(String(node));
	}

	if (Array.isArray(node)) return node.map((n) => serializeNode(n, ctx)).join('');

	const el = node as ReactElement;
	const { type, props } = el;

	// React fragment or special React symbols (e.g. Suspense)
	if (type === 'fragment' || typeof type === 'symbol') return serializeNode(props.children, ctx);

	// Registered micron component
	const meta = getMicronMeta(type);
	if (meta) return ctx.renderer.render(meta, props, ctx);

	// Native HTML element
	if (typeof type === 'string') {
		const handler = nativeHandlers[type];
		if (handler) return handler(props, ctx);
		return serializeNode(props.children, ctx);
	}

	// Functional or class component
	if (typeof type === 'function') {
		if ((type as any).prototype?.isReactComponent) {
			const instance = new (type as any)(props);
			return serializeNode(instance.render(), ctx);
		}
		return serializeNode((type as any)(props), ctx);
	}

	return '';
}
