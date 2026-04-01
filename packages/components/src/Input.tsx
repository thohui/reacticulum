export interface InputProps {
	name: string;
	placeholder?: string;
	width?: number;
	passWord?: boolean;
	color?: string;
	backgroundColor?: string;
}

export function Input({
	name,
	placeholder,
	width = 24,
	backgroundColor,
	passWord,
	color,
}: InputProps) {
	return null;
}
