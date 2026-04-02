import { Handler } from './handler';

export const nativeHandlers: Partial<Record<string, Handler>> = {
	h1: ({ children }, ctx) => `#${ctx.serialize(children)}\n`,
	h2: ({ children }, ctx) => `##${ctx.serialize(children)}\n`,
	h3: ({ children }, ctx) => `###${ctx.serialize(children)}\n`,
	b: ({ children }, ctx) => `\`!${ctx.serialize(children)}\`!`,
	i: ({ children }, ctx) => `\`*${ctx.serialize(children)}\`*`,
	u: ({ children }, ctx) => `\`_${ctx.serialize(children)}\`_`,
	hr: () => `---\n`,
	a: ({ children, href }, ctx) => `>[${ctx.serialize(children)}:${href}]`,
	p: ({ children }, ctx) => `${ctx.serialize(children)}\n\n`,
	br: () => `\n`,
	radio: ({ group, value, checked, label }, ctx) => `\`<^${group}|${value}${checked ? '|*' : ''}\`>${label ?? ''}\n`,
};
