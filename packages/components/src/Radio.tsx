import { StyleProps } from './types';

export interface RadioProps extends StyleProps {
	group: string;
	value: string;
	checked?: boolean;
	label?: string;
}

export function Radio({ group, value, checked }: RadioProps) {
	return null;
}
