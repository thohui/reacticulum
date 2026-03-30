import React from "react";
import { StyleProps } from "./generictypes/Style";

export interface AlignProps extends StyleProps {
  children?: React.ReactNode;
}
export function Align({ children }: AlignProps) {
  return null;
}
