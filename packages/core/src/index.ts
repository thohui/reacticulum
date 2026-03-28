import { getMicronType } from "@reacticulum/types";
import React, { ReactElement, ReactNode } from "react";

export function serialize(node: ReactNode): string {

	if (node === null || node === undefined) return '';

	if (typeof node === 'string' || typeof node === 'number') return String(node);

	if (typeof node === 'boolean') return '';

	if (Array.isArray(node)) {
		return node.map(serialize).join('');
	}

	const el = node as ReactElement<any>;

	const { type, props } = el;

	// React.Fragment
	if (type === React.Fragment) {
		return serialize(props.children);
	}

	const micronType = getMicronType(type);

	if (micronType) {
		switch (micronType) {
			case 'h1': return `>${serialize(props.children)}\n`;
			case 'h2': return `>>${serialize(props.children)}\n`;
			case 'h3': return `>>>${serialize(props.children)}\n`;
			case 'bold': return `\`!${serialize(props.children)}\`!`;
			case 'italic': return `\`*${serialize(props.children)}\`*`;
			case 'underline': return `\`_${serialize(props.children)}\`_`;
			case 'divider': return `-${props.symbol}\n`;
			// `[test`a]`
			case 'link': return `\`[${serialize(props.children)}\`${props.to}]\``;
			case 'input': return renderInput(props);
			case 'color': return `\`F${props.hex}${serialize(props.children)}\`f`;
			case 'paragraph': return `${serialize(props.children)}\n\n`;
		}

	}

	// handle native elements.
	switch (type) {
		case 'h1': return `#${serialize(props.children)}\n`;
		case 'h2': return `##${serialize(props.children)}\n`;
		case 'h3': return `###${serialize(props.children)}\n`;
		case 'b': return `\`!${serialize(props.children)}\`!`;
		case 'i': return `\`*${serialize(props.children)}\`*`;
		case 'u': return `\`_${serialize(props.children)}\`_`;
		case 'hr': return `---\n`;
		case 'a': return `>[${serialize(props.children)}:${props.href}]`;
		// case 'input': return renderInput(props);
		case 'p': return `${serialize(props.children)}\n\n`;
	}

	// unknown component.
	if (typeof type === 'function') {

		// class component
		if (!!type.prototype?.isReactComponent) {
			const instance = new (type as any)(props);
			return serialize(instance.render());
		}

		// TODO: is there a cleaner way to detect a function component?
		// function component
		if (String(type).includes('return React.createElement')) {
			return serialize((type as (props: any) => ReactNode)(props));
		}

	}

	return serialize(props.children);

}


function renderInput(props: { name: string; placeholder?: string; width?: number; }) {

	let { name, placeholder, width } = props;

	if (width === undefined)
		width = 24;

	const content: string[] = [];

	content.push(`\`<${width}|${name}\``);

	if (placeholder) {
		content.push(`|${placeholder}`);
	}

	content.push('>\n');

	return content.join('');

}