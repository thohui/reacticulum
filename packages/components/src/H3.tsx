import React from "react";
import { StyleProps } from "./generictypes/style";

export interface H3props extends StyleProps {
  children: React.ReactNode;
}
export function H3({
  children,
  align: alignement,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: H3props) {
return <h3>{children}</h3>;
}
