import React from "react";
import { StyleProps } from "./generictypes/style";

export interface H2props extends StyleProps {
  children: React.ReactNode;
}
export function H2({
  children,
  align: alignement,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: H2props) {
  return <h2>{children}</h2>;
}
