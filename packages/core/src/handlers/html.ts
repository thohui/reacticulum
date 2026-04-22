import type { MicronType } from '@reacticulum/types';
import { escapeHTML } from '../utils/styles';
import type { Handler } from './handler';

function normalizeAlign(align: string | undefined): string | undefined {
	if (!align) return undefined;
	if (align === 'left' || align === 'center' || align === 'right') return align;
	return undefined;
}

function styleAttr(props: Record<string, any>): string {
	const s: string[] = [];
	if (props.color) s.push(`color:${escapeHTML(props.color)}`);
	if (props.backgroundColor) s.push(`background-color:${escapeHTML(props.backgroundColor)}`);
	if (props.bold) s.push('font-weight:bold');
	if (props.italic) s.push('font-style:italic');
	if (props.underline) s.push('text-decoration:underline');

	const normalizedAlign = normalizeAlign(props.align);
	if (normalizedAlign) s.push(`text-align:${normalizedAlign}`);

	return s.length ? ` style="${s.join(';')}"` : '';
}

export const htmlHandlers: Record<MicronType, Handler> = {
	h1: (props, ctx) => `<h1${styleAttr(props)}>${ctx.serialize(props.children)}</h1>`,
	h2: (props, ctx) => `<h2${styleAttr(props)}>${ctx.serialize(props.children)}</h2>`,
	h3: (props, ctx) => `<h3${styleAttr(props)}>${ctx.serialize(props.children)}</h3>`,
	bold: (props, ctx) => `<strong${styleAttr(props)}>${ctx.serialize(props.children)}</strong>`,
	italic: (props, ctx) => `<em${styleAttr(props)}>${ctx.serialize(props.children)}</em>`,
	underline: (props, ctx) => `<u${styleAttr(props)}>${ctx.serialize(props.children)}</u>`,
	link: ({ children, to, ...styles }, ctx) => `<a href="${escapeHTML(to)}"${styleAttr(styles)}>${ctx.serialize(children)}</a>`,
	divider: () => `<hr />`,
	color: ({ hex, children }, ctx) => `<span style="color:#${escapeHTML(hex)}">${ctx.serialize(children)}</span>`,
	paragraph: (props, ctx) => `<p${styleAttr(props)}>${ctx.serialize(props.children)}</p>`,
	align: ({ align, children }, ctx) => {
		const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
		return `<div style="display:flex;justify-content:${justifyContent}">${ctx.serialize(children)}</div>`;
	},
	input: ({ name, placeholder, passWord, width = 24 }) =>
		`<input type="${passWord ? 'password' : 'text'}" name="${escapeHTML(name)}" placeholder="${escapeHTML(placeholder ?? '')}" size="${width}" />`,
	checkbox: ({ fieldName, value, label, checked, align }) => {
		const inner = `<label><input type="checkbox" name="${escapeHTML(fieldName)}" value="${escapeHTML(value)}"${checked ? ' checked' : ''} />${label ? escapeHTML(label) : ''}</label>`;
		const normalizedAlign = normalizeAlign(align);
		return normalizedAlign ? `<div style="text-align:${normalizedAlign}">${inner}</div>` : inner;
	},
	radio: ({ group, value, label, checked, align }) => {
		const inner = `<label><input type="radio" name="${escapeHTML(group)}" value="${escapeHTML(value)}"${checked ? ' checked' : ''} />${label ? escapeHTML(label) : ''}</label>`;
		const normalizedAlign = normalizeAlign(align);
		return normalizedAlign ? `<div style="text-align:${normalizedAlign}">${inner}</div>` : inner;
	},
};
