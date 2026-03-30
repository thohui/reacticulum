import React from "react";
import { StyleProps } from "./generictypes/Style";

export interface ParagraphProps extends StyleProps {
  children: React.ReactNode;
}
export function Paragraph({
  children,
  align: alignement,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: ParagraphProps) {
  return <p>{children}</p>;
}
