import { MicronType } from '@reacticulum/types';
import { escapeMarkdown } from '../utils/styles';
import { Handler } from './handler';

const alignTokens: Record<string, string> = {
	left: '`l',
	center: '`c',
	right: '`r',
};

export const micronHandlers: Record<MicronType, Handler> = {
	align: ({ align }: { align: string }) => alignTokens[align] ?? '',
	h1: ({ children }, ctx) => `>${ctx.serialize(children)}`,
	h2: ({ children }, ctx) => `>>${ctx.serialize(children)}`,
	h3: ({ children }, ctx) => `>>>${ctx.serialize(children)}`,
	bold: ({ children }, ctx) => `\`!${ctx.serialize(children)}\`!`,
	italic: ({ children }, ctx) => `\`*${ctx.serialize(children)}\`*`,
	underline: ({ children }, ctx) => `\`_${ctx.serialize(children)}\`_`,
	link: ({ children, to }: { children: unknown; to: string }, ctx) => `\`[${ctx.serialize(children)}\`${to}]\``,
	divider: ({ symbol }: { symbol: string }) => `-${symbol}`,
	color: ({ hex, children }: { hex: string; children: unknown }, ctx) => `\`F${hex}${ctx.serialize(children)}\`f`,
	paragraph: ({ children }, ctx) => ctx.serialize(children),

	radio: ({ group, value, checked, label }: { group: string; value: string; checked?: boolean; label?: string }) => {
		const out = ['`<^|', escapeMarkdown(group), '|', escapeMarkdown(value)];
		if (checked) out.push('|*');
		const labelPart = label ? escapeMarkdown(label) : '';
		out.push('`>', labelPart);
		return out.join('');
	},

	input: ({ name, placeholder, passWord, width = 24 }: { name: string; placeholder?: string; passWord?: boolean; width?: number }) => {
		const out: (string | number)[] = ['`<'];
		if (passWord) out.push('!');
		out.push(width, '|', escapeMarkdown(name), '`');
		if (placeholder) out.push(escapeMarkdown(placeholder));
		out.push('>');
		return out.join('');
	},

	checkbox: ({ fieldName, value, label, checked }: { fieldName: string; value: string; label?: string; checked?: boolean }) => {
		const out = ['`<?|', escapeMarkdown(fieldName), '|', escapeMarkdown(value)];
		if (checked) out.push('|*');
		const labelPart = label ? escapeMarkdown(label) : '';
		out.push('`>', labelPart);
		return out.join('');
	},
};
