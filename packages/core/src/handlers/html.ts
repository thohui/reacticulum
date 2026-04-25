import type {
	AlignProps,
	BoldProps,
	CheckboxProps,
	ColorProps,
	DividerProps,
	H1Props,
	H2Props,
	H3Props,
	InputProps,
	ItalicProps,
	LinkProps,
	MicronType,
	ParagraphProps,
	RadioProps,
	StyleProps,
	UnderlineProps,
} from '@reacticulum/types';
import { escapeHTML } from '../utils/styles';
import type { Handler } from './handler';

function normalizeAlign(align: string | undefined): string | undefined {
	if (!align) return undefined;
	if (align === 'left' || align === 'center' || align === 'right') return align;
	return undefined;
}

function normalizeStyleColor(value: unknown): string {
	const color = String(value);
	return /^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(color) ? `#${color}` : color;
}

// Sanitize href values to prevent XSS vulnerabilities. Only allow relative URLs, anchors, query strings, and safe protocols.
function sanitizeHref(to: string | undefined): string {
	if (!to) return '#';
	const href = to.trim();
	if (!href) return '#';
	if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../') || href.startsWith('#') || href.startsWith('?')) {
		return href;
	}
	if (/^(https?:|mailto:)/i.test(href)) {
		return href;
	}
	return '#';
}

function styleAttr(props: StyleProps): string {
	const attributes: string[] = [];

	if (props.color) {
		const color = normalizeStyleColor(props.color);
		attributes.push(`color:${escapeHTML(color)}`);
	}

	if (props.backgroundColor) {
		const backgroundColor = normalizeStyleColor(props.backgroundColor);
		attributes.push(`background-color:${escapeHTML(backgroundColor)}`);
	}

	if (props.bold) attributes.push('font-weight:bold');
	if (props.italic) attributes.push('font-style:italic');
	if (props.underline) attributes.push('text-decoration:underline');

	const normalizedAlign = normalizeAlign(props.align);
	if (normalizedAlign) attributes.push(`text-align:${normalizedAlign}`);

	return attributes.length ? ` style="${attributes.join(';')}"` : '';
}

export const htmlHandlers: Record<MicronType, Handler> = {
	h1: (props: H1Props, ctx) => `<h1${styleAttr(props)}>${ctx.serialize(props.children)}</h1>`,
	h2: (props: H2Props, ctx) => `<h2${styleAttr(props)}>${ctx.serialize(props.children)}</h2>`,
	h3: (props: H3Props, ctx) => `<h3${styleAttr(props)}>${ctx.serialize(props.children)}</h3>`,
	bold: (props: BoldProps, ctx) => `<strong${styleAttr(props)}>${ctx.serialize(props.children)}</strong>`,
	italic: (props: ItalicProps, ctx) => `<em${styleAttr(props)}>${ctx.serialize(props.children)}</em>`,
	underline: (props: UnderlineProps, ctx) => `<u${styleAttr(props)}>${ctx.serialize(props.children)}</u>`,
	link: ({ children, to, ...styles }: LinkProps, ctx) =>
		`<a href="${escapeHTML(sanitizeHref(to))}"${styleAttr(styles)}>${ctx.serialize(children)}</a>`,
	divider: (_: DividerProps) => `<hr />`,
	color: ({ hex, children }: ColorProps, ctx) => {
		const color = normalizeStyleColor(hex);
		return `<span style="color:${escapeHTML(color)}">${ctx.serialize(children)}</span>`;
	},
	paragraph: (props: ParagraphProps, ctx) => `<p${styleAttr(props)}>${ctx.serialize(props.children)}</p>`,
	align: ({ align, children }: AlignProps, ctx) => {
		const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
		return `<div style="display:flex;justify-content:${justifyContent}">${ctx.serialize(children)}</div>`;
	},
	input: ({ name, placeholder, passWord, width = 24 }: InputProps) =>
		`<input type="${passWord ? 'password' : 'text'}" name="${escapeHTML(name)}" placeholder="${escapeHTML(placeholder ?? '')}" size="${width}" />`,
	checkbox: ({ fieldName, value, label, checked, align }: CheckboxProps) => {
		const inner = `<label><input type="checkbox" name="${escapeHTML(fieldName)}" value="${escapeHTML(value)}"${checked ? ' checked' : ''} />${label ? escapeHTML(label) : ''}</label>`;
		const normalizedAlign = normalizeAlign(align);
		return normalizedAlign ? `<div style="text-align:${normalizedAlign}">${inner}</div>` : inner;
	},
	radio: ({ group, value, label, checked, align }: RadioProps) => {
		const inner = `<label><input type="radio" name="${escapeHTML(group)}" value="${escapeHTML(value)}"${checked ? ' checked' : ''} />${label ? escapeHTML(label) : ''}</label>`;
		const normalizedAlign = normalizeAlign(align);
		return normalizedAlign ? `<div style="text-align:${normalizedAlign}">${inner}</div>` : inner;
	},
};
