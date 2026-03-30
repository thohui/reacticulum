import React from "react";
import { StyleProps } from "./generictypes/Style";

export interface LinkProps extends StyleProps {
  children: React.ReactNode;
}
export function Link({
  children,
  align,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: LinkProps) {
  return <a>{children}</a>;
}
