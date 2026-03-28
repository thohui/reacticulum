export type MicronType =
	| 'h1' | 'h2' | 'h3'
	| 'bold' | 'italic' | 'underline'
	| 'link' | 'input' | 'divider' | 'color' | 'paragraph';

const registry = new WeakMap<React.ComponentType<any>, MicronType>();

export const register = (component: React.ComponentType<any>, type: MicronType) => {
	registry.set(component, type);
};

export const getMicronType = (component: unknown): MicronType | null => {
	if (typeof component !== 'function') return null;
	return registry.get(component as React.ComponentType<any>) ?? null;
};