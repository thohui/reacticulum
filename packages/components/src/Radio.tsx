import { StyleProps } from "./generictypes/Style";

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
  align,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: InputProps) {
  return null;
}
