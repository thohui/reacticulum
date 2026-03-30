import { StyleProps } from "./generictypes/Style";

export interface InputProps extends StyleProps {
  name: string;
  placeholder?: string;
  width?: number;
  passWord?: boolean;
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
