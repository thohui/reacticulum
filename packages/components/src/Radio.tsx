import { StyleProps } from "./generictypes/style";

export interface InputProps extends StyleProps {
  group: string;
  value: string;
  checked?: boolean;
  label?: string;
}
export function Radio({
  group,
  value,
  checked,
  align: alignement,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: InputProps) {
  return null;
}
