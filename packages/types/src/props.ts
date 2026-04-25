import type { ReactNode } from 'react';

export interface StyleProps {
	align?: 'left' | 'center' | 'right';
	color?: string;
	backgroundColor?: string;
	underline?: boolean;
	italic?: boolean;
	bold?: boolean;
}

export interface AlignProps {
	align: 'left' | 'center' | 'right';
	children?: ReactNode;
}

export interface BoldProps extends StyleProps {
	children?: ReactNode;
}

export interface CheckboxProps extends StyleProps {
	fieldName: string;
	value: string;
	checked?: boolean;
	label?: string;
}

export interface ColorProps {
	hex: string;
	children?: ReactNode;
}

export interface DividerProps extends StyleProps {
	symbol: string;
}

export interface H1Props extends StyleProps {
	children?: ReactNode;
}

export interface H2Props extends StyleProps {
	children?: ReactNode;
}

export interface H3Props extends StyleProps {
	children?: ReactNode;
}

export interface InputProps {
	name: string;
	placeholder?: string;
	width?: number;
	passWord?: boolean;
	color?: string;
	backgroundColor?: string;
}

export interface ItalicProps extends StyleProps {
	children?: ReactNode;
}

export interface LinkProps extends StyleProps {
	to: string;
	children?: ReactNode;
}

export interface ParagraphProps extends StyleProps {
	children?: ReactNode;
}

export interface RadioProps extends StyleProps {
	group: string;
	value: string;
	checked?: boolean;
	label?: string;
}

export interface UnderlineProps extends StyleProps {
	children?: ReactNode;
}
