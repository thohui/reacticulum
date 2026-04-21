import type { Renderer } from './renderers';

export type SerializeContext = {
	/** Serializes a child node using the current context. Passed to handlers for recursion. */
	serialize: (node: unknown) => string;
	renderer: Renderer;
};
