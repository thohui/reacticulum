import { StyleProps } from './types';

export interface ParagraphProps extends StyleProps {
	children: React.ReactNode;
}
export function Paragraph({ children, align: alignement, backgroundColor, bold, color, italic, underline }: ParagraphProps) {
	return null;
}
