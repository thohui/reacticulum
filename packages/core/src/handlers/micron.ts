import { MicronType } from '@reacticulum/types';
import { SerializeContext } from '../context';
import { renderInput } from '../utils/input';

type Handler = (props: any, ctx: SerializeContext) => string;

export const micronHandlers: Record<MicronType, Handler> = {
	align: ({ align }) => {
		switch (align) {
			case 'left': return '`l';
			case 'center': return '`c';
			case 'right': return '`r';
			default: return '';
		}
	},
	h1: ({ children }, ctx) => `>${ctx.serialize(children)}`,
	h2: ({ children }, ctx) => `>>${ctx.serialize(children)}`,
	h3: ({ children }, ctx) => `>>>${ctx.serialize(children)}`,
	bold: ({ children }, ctx) => `\`!${ctx.serialize(children)}\`!`,
	italic: ({ children }, ctx) => `\`*${ctx.serialize(children)}\`*`,
	underline: ({ children }, ctx) => `\`_${ctx.serialize(children)}\`_`,
	link: ({ children, to }, ctx) => `\`[${ctx.serialize(children)}\`${to}]\``,
	divider: ({ symbol }) => `-${symbol}`,
	color: ({ hex, children }, ctx) => `\`F${hex}${ctx.serialize(children)}\`f`,
	paragraph: ({ children }, ctx) => ctx.serialize(children),
	radio: ({ group, value, checked, label }) =>
		`\`<^|${group}|${value}${checked ? '|*' : ''}\`>${label ?? ''}`,
	input: (props) => renderInput(props),
	checkbox: ({ fieldName, value, label, checked }) => `\`<?|${fieldName}|${value}${checked ? '|*' : ''}\`>${label ?? ''}`,
};
