import React from "react";
import { StyleProps } from "./generictypes/Style";

export interface UnderlineProps extends StyleProps {
  children: React.ReactNode;
}
export function Underline({
  children,
  align,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: UnderlineProps) {
  return <u>{children}</u>;
}
