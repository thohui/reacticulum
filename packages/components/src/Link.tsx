import React from "react";
import { StyleProps } from "./generictypes/Style";

export interface LinkProps extends StyleProps {
  to: string;
  children: React.ReactNode;
}
export function Link({
  children,
  to,
  align,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: LinkProps) {
  return <a>{children}</a>;
}
