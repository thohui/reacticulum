import { StyleProps } from "./types";

export interface CheckboxProps extends StyleProps {
	fieldName: string;
	checked?: boolean;
	value?: string;
	label?: string;
}

export function Checkbox({ fieldName, checked, value, label }: CheckboxProps) {
	return null;
}
