export function renderInput(props: {
	name: string;
	placeholder?: string;
	width?: number;
	backgroundColor?: string;
	passWord?: boolean;
	color?: string;
}): string {
	const { name, placeholder, backgroundColor, passWord, color } = props;
	const width = props.width ?? 24;

	const parts: string[] = [];
	parts.push(`\`F${color ?? 'fff'}`);
	parts.push(`\`B${backgroundColor ?? '333'}`);
	parts.push(`\`<${passWord ? '!' : ''}${width}|${name}\``);
	if (placeholder) parts.push(placeholder);
	parts.push('>`b`f\n');

	return parts.join('');
}
