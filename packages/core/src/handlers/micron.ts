import type {
	AlignProps,
	CheckboxProps,
	ColorProps,
	DividerProps,
	H1Props,
	H2Props,
	H3Props,
	InputProps,
	LinkProps,
	MicronType,
	RadioProps,
} from '@reacticulum/types';
import { escapeMarkdown } from '../utils/styles';
import { Handler } from './handler';

const alignTokens: Record<string, string> = {
	left: '`l',
	center: '`c',
	right: '`r',
};

export const micronHandlers: Record<MicronType, Handler> = {
	align: ({ align }: AlignProps) => alignTokens[align] ?? '',
	h1: ({ children }: H1Props, ctx) => `>${ctx.serialize(children)}`,
	h2: ({ children }: H2Props, ctx) => `>>${ctx.serialize(children)}`,
	h3: ({ children }: H3Props, ctx) => `>>>${ctx.serialize(children)}`,
	bold: ({ children }, ctx) => `\`!${ctx.serialize(children)}\`!`,
	italic: ({ children }, ctx) => `\`*${ctx.serialize(children)}\`*`,
	underline: ({ children }, ctx) => `\`_${ctx.serialize(children)}\`_`,
	link: ({ children, to }: LinkProps, ctx) => `\`[${ctx.serialize(children)}\`${to}]\``,
	divider: ({ symbol }: DividerProps) => `-${symbol}`,
	color: ({ hex, children }: ColorProps, ctx) => `\`F${hex}${ctx.serialize(children)}\`f`,
	paragraph: ({ children }, ctx) => ctx.serialize(children),

	radio: ({ group, value, checked, label }: RadioProps) => {
		const out = ['`<^|', escapeMarkdown(group), '|', escapeMarkdown(value)];
		if (checked) out.push('|*');
		const labelPart = label ? escapeMarkdown(label) : '';
		out.push('`>', labelPart);
		return out.join('');
	},

	input: ({ name, placeholder, passWord, width = 24 }: InputProps) => {
		const out: (string | number)[] = ['`<'];
		if (passWord) out.push('!');
		out.push(width, '|', escapeMarkdown(name), '`');
		if (placeholder) out.push(escapeMarkdown(placeholder));
		out.push('>');
		return out.join('');
	},

	checkbox: ({ fieldName, value, label, checked }: CheckboxProps) => {
		const out = ['`<?|', escapeMarkdown(fieldName), '|', escapeMarkdown(value)];
		if (checked) out.push('|*');
		const labelPart = label ? escapeMarkdown(label) : '';
		out.push('`>', labelPart);
		return out.join('');
	},
};
