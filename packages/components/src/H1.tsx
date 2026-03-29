import React from "react";
import { StyleProps } from "./generictypes/style";

export interface H1props extends StyleProps {
  children: React.ReactNode;
}
export function H1({
  children,
  align: alignement,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: H1props) {
  return <h1>{children}</h1>;
}
