// Some stubs for the JSX runtime to replace react/jsx-runtime in the esbuild bundle for dynamic pages.

export const Fragment = 'fragment';
export const jsx = (type: any, props: any) => ({ type, props });
export const jsxs = jsx;
export const createElement = jsx;

interface HTMLAttributes {
	children?: any;
	class?: string;
	className?: string;
	id?: string;
	style?: string | Record<string, string>;
	[key: string]: any;
}

export namespace JSX {
	export type Element = { type: any; props: any };
	export type IntrinsicAttributes = {};
	export interface ElementChildrenAttribute {
		children: {};
	}

	export interface IntrinsicElements {
		div: HTMLAttributes;
		span: HTMLAttributes;
		section: HTMLAttributes;
		article: HTMLAttributes;
		aside: HTMLAttributes;
		main: HTMLAttributes;
		header: HTMLAttributes;
		footer: HTMLAttributes;
		nav: HTMLAttributes;
		h1: HTMLAttributes;
		h2: HTMLAttributes;
		h3: HTMLAttributes;
		h4: HTMLAttributes;
		h5: HTMLAttributes;
		h6: HTMLAttributes;
		// Text
		p: HTMLAttributes;
		a: HTMLAttributes & { href?: string; target?: string; rel?: string };
		strong: HTMLAttributes;
		em: HTMLAttributes;
		b: HTMLAttributes;
		i: HTMLAttributes;
		u: HTMLAttributes;
		s: HTMLAttributes;
		code: HTMLAttributes;
		pre: HTMLAttributes;
		blockquote: HTMLAttributes;
		br: HTMLAttributes;
		hr: HTMLAttributes;
		ul: HTMLAttributes;
		ol: HTMLAttributes;
		li: HTMLAttributes;
		form: HTMLAttributes;
		input: HTMLAttributes & { type?: string; name?: string; value?: string; placeholder?: string };
		textarea: HTMLAttributes;
		select: HTMLAttributes;
		option: HTMLAttributes & { value?: string };
		label: HTMLAttributes & { for?: string; htmlFor?: string };
		button: HTMLAttributes & { type?: string };
		// Media
		img: HTMLAttributes & { src?: string; alt?: string; width?: string | number; height?: string | number };
		video: HTMLAttributes;
		audio: HTMLAttributes;
		// Table
		table: HTMLAttributes;
		thead: HTMLAttributes;
		tbody: HTMLAttributes;
		tfoot: HTMLAttributes;
		tr: HTMLAttributes;
		th: HTMLAttributes;
		td: HTMLAttributes;
	}
}
