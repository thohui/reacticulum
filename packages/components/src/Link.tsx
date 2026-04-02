import { StyleProps } from './types';

export interface LinkProps extends StyleProps {
	to: string;
	children: React.ReactNode;
}
export function Link({ children, to, align, backgroundColor, bold, color, italic, underline }: LinkProps) {
	return null;
}
