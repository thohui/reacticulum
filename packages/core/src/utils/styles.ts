export function escapeMarkdown(text: string): string {
	return text
		.replace(/\\/g, '\\\\')
		.replace(/`/g, '\\`')
		.replace(/\*/g, '\\*')
		.replace(/_/g, '\\_')
		.replace(/>/g, '\\>')
		.replace(/\|/g, '\\|')
		.replace(/-/g, '\\-');
}

type StyleProps = {
	align?: 'left' | 'center' | 'right';
	backgroundColor?: string;
	color?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
};

const stripHashTag = (color: string) => color.replaceAll('#', '');

export function stylePrefix(props: StyleProps, canHaveColor: boolean, canHaveFormatting: boolean): string {
	const parts: string[] = [];
	if (canHaveFormatting) {
		if (props.align) {
			switch (props.align) {
				case 'left':
					parts.push('`l');
					break;
				case 'center':
					parts.push('`c');
					break;
				case 'right':
					parts.push('`r');
					break;
			}
		}
		if (props.bold) parts.push('`!');
		if (props.italic) parts.push('`*');
		if (props.underline) parts.push('`_');
	}
	if (canHaveColor) {
		if (props.backgroundColor) parts.push(`\`B${stripHashTag(props.backgroundColor)}`);
		if (props.color) parts.push(`\`F${stripHashTag(props.color)}`);
	}
	return parts.join('');
}

export function buildSuffix(props: StyleProps, canHaveColor: boolean, endsWithNewLine: boolean, blockLevel: boolean = false): string {
	const reset: string[] = [];
	if (canHaveColor) {
		if (props.backgroundColor) reset.push('`b');
		if (props.color) reset.push('`f');
	}

	const newline = endsWithNewLine ? '\n' : '';

	if (reset.length) {
		// Edge case: block-level elements like Divider require color/bg tokens on
		// their own line, so resets must follow suit or they're ignored by micron.
		if (blockLevel) return `\n${reset.join(' ')}\n`;
		return ` ${reset.join(' ')}${newline}`;
	}
	return newline;
}
