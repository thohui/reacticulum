import type { MicronType } from '@reacticulum/types';
import { escapeHtml } from '../utils/styles';
import type { Handler } from './handler';

function styleAttr(props: Record<string, any>): string {
	const s: string[] = [];
	if (props.color) s.push(`color:${escapeHtml(props.color)}`);
	if (props.backgroundColor) s.push(`background-color:${escapeHtml(props.backgroundColor)}`);
	if (props.bold) s.push('font-weight:bold');
	if (props.italic) s.push('font-style:italic');
	if (props.underline) s.push('text-decoration:underline');
	if (props.align) s.push(`text-align:${props.align}`);
	return s.length ? ` style="${s.join(';')}"` : '';
}

export const htmlHandlers: Record<MicronType, Handler> = {
	h1: (props, ctx) => `<h1${styleAttr(props)}>${ctx.serialize(props.children)}</h1>`,
	h2: (props, ctx) => `<h2${styleAttr(props)}>${ctx.serialize(props.children)}</h2>`,
	h3: (props, ctx) => `<h3${styleAttr(props)}>${ctx.serialize(props.children)}</h3>`,
	bold: (props, ctx) => `<strong${styleAttr(props)}>${ctx.serialize(props.children)}</strong>`,
	italic: (props, ctx) => `<em${styleAttr(props)}>${ctx.serialize(props.children)}</em>`,
	underline: (props, ctx) => `<u${styleAttr(props)}>${ctx.serialize(props.children)}</u>`,
	link: ({ children, to, ...styles }, ctx) => `<a href="${escapeHtml(to)}"${styleAttr(styles)}>${ctx.serialize(children)}</a>`,
	divider: () => `<hr />`,
	color: ({ hex, children }, ctx) => `<span style="color:#${escapeHtml(hex)}">${ctx.serialize(children)}</span>`,
	paragraph: (props, ctx) => `<p${styleAttr(props)}>${ctx.serialize(props.children)}</p>`,
	align: ({ align, children }, ctx) => {
		const justifyContent = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
		return `<div style="display:flex;justify-content:${justifyContent}">${ctx.serialize(children)}</div>`;
	},
	input: ({ name, placeholder, passWord, width = 24 }) =>
		`<input type="${passWord ? 'password' : 'text'}" name="${escapeHtml(name)}" placeholder="${escapeHtml(placeholder ?? '')}" size="${width}" />`,
	checkbox: ({ fieldName, value, label, checked, align }) => {
		const inner = `<label><input type="checkbox" name="${escapeHtml(fieldName)}" value="${escapeHtml(value)}"${checked ? ' checked' : ''} />${label ? escapeHtml(label) : ''}</label>`;
		return align ? `<div style="text-align:${align}">${inner}</div>` : inner;
	},
	radio: ({ group, value, label, checked, align }) => {
		const inner = `<label><input type="radio" name="${escapeHtml(group)}" value="${escapeHtml(value)}"${checked ? ' checked' : ''} />${label ? escapeHtml(label) : ''}</label>`;
		return align ? `<div style="text-align:${align}">${inner}</div>` : inner;
	},
};
