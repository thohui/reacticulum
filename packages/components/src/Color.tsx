import { StyleProps } from "./generictypes/Style";

export interface ColorProps extends StyleProps {
  hex: string;
  children: React.ReactNode;
}

export function Color({ hex, children, ...rest }: ColorProps) {
  return null;
}
