import { StyleProps } from "./generictypes/Style";

export interface H2props extends StyleProps {
  children: React.ReactNode;
}
export function H2({
  children,
  align,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: H2props) {
  return <h2>{children}</h2>;
}
