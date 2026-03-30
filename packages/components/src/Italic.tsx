import React from "react";
import { StyleProps } from "./generictypes/Style";

export interface ItalicProps extends StyleProps {
  children: React.ReactNode;
}
export function Italic({
  children,
  align,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: ItalicProps) {
  return <i>{children}</i>;
}
