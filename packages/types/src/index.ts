export type MicronType =
	| 'align'
	| 'h1' | 'h2' | 'h3'
	| 'bold' | 'italic' | 'underline'
	| 'link' | 'input' | 'divider' | 'color' | 'paragraph' | 'radio' | 'checkbox';

export type ComponentMeta = {
	/** The micron element type this component maps to. */
	type: MicronType;
	/**
	 * Whether this element supports color/backgroundColor props.
	 * When true the serializer adds `\`Fxxx`/`\`Bxxx` tokens before content
	 * and appends `\`f`/`\`b` reset tokens after.
	 */
	canHaveColor: boolean;
	/**
	 * Whether this element supports formatting props (bold, italic, underline, align).
	 * When true the serializer adds the corresponding tokens before content.
	 */
	canHaveFormatting: boolean;
	/** Whether the serializer should append a newline after the element's output. */
	endsWithNewLine: boolean;
	/** Whether the serializer should prepend a newline before the element's output. */
	startsWithNewLine: boolean;
};

const typeDefaults: Record<MicronType, Omit<ComponentMeta, 'type'>> = {
	align: { canHaveColor: false, canHaveFormatting: false, endsWithNewLine: false, startsWithNewLine: false },
	h1: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: true, startsWithNewLine: false },
	h2: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: true, startsWithNewLine: false },
	h3: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: true, startsWithNewLine: false },
	bold: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: false, startsWithNewLine: false },
	italic: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: false, startsWithNewLine: false },
	underline: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: false, startsWithNewLine: false },
	link: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: false, startsWithNewLine: false },
	// color uses its own hex prop; color/backgroundColor props would conflict
	color: { canHaveColor: false, canHaveFormatting: false, endsWithNewLine: false, startsWithNewLine: false },
	input: { canHaveColor: true, canHaveFormatting: false, endsWithNewLine: false, startsWithNewLine: false },
	divider: { canHaveColor: true, canHaveFormatting: false, endsWithNewLine: true, startsWithNewLine: true },
	paragraph: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: true, startsWithNewLine: false },
	radio: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: true, startsWithNewLine: false },
	checkbox: { canHaveColor: true, canHaveFormatting: true, endsWithNewLine: false, startsWithNewLine: true },
};

const registry = new WeakMap<React.ComponentType<any>, ComponentMeta>();

export const register = (
	component: React.ComponentType<any>,
	type: MicronType,
	meta?: Partial<Omit<ComponentMeta, 'type'>>
) => {
	registry.set(component, { type, ...typeDefaults[type], ...meta });
};

export const getMicronMeta = (component: unknown): ComponentMeta | null => {
	if (typeof component !== 'function') return null;
	return registry.get(component as React.ComponentType<any>) ?? null;
};

export const getMicronType = (component: unknown): MicronType | null =>
	getMicronMeta(component)?.type ?? null;
