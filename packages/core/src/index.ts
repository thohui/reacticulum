import { getMicronMeta } from '@reacticulum/types';
import { SerializeContext } from './context';
import { micronHandlers } from './handlers/micron';
import { nativeHandlers } from './handlers/native';
import { buildSuffix, escapeMarkdown, stylePrefix } from './utils/styles';

type ReactElement = { type: unknown; props: any; };

export function serialize(node: unknown): string {
	const ctx: SerializeContext = {
		serialize: null as any,
	};
	ctx.serialize = (node) => serializeNode(node, ctx);
	return serializeNode(node, ctx);
}

function serializeNode(node: unknown, ctx: SerializeContext): string {

	if (node === null || node === undefined) return '';
	if (typeof node === 'boolean') return '';
	if (typeof node === 'string' || typeof node === 'number') return escapeMarkdown(String(node));
	if (Array.isArray(node)) return node.map((n) => serializeNode(n, ctx)).join('');

	const el = node as ReactElement;
	const { type, props } = el;

	// React fragment or special React symbols (e.g. Suspense)
	if (type === 'fragment' || typeof type === 'symbol') return serializeNode(props.children, ctx);

	// Registered micron component
	const meta = getMicronMeta(type);

	if (meta) {
		const tokens = stylePrefix(props, meta.canHaveColor, meta.canHaveFormatting);
		const newlinePrefix = meta.startsWithNewLine ? '\n' : '';
		const content = micronHandlers[meta.type](props, ctx);
		const suffix = buildSuffix(props, meta.canHaveColor, meta.endsWithNewLine, meta.startsWithNewLine);
		// tokens must come after '>' not before — micron ignores styles before the heading
		// marker. any '>' here is from the handler, not user content (escapeMarkdown
		// turns user '>' into '\>').
		const body = content.replace(/^(>*)/, (_, headingMarker) => headingMarker + tokens);
		return newlinePrefix + body + suffix;
	}

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
