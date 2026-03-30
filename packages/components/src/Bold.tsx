import React from "react";
import { StyleProps } from "./generictypes/Style";

export interface BoldProps extends StyleProps {
  children: React.ReactNode;
}
export function Bold({
  children,
  align: alignement,
  backgroundColor,
  bold,
  color,
  italic,
  underline,
}: BoldProps) {
  return <b>{children}</b>;
}
