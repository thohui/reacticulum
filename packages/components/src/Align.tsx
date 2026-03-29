import React from "react";
import { StyleProps } from "./generictypes/style";

export interface AlignProps extends StyleProps {
  children?: React.ReactNode;
  align: "left" | "center" | "right";
}
export function Align({ children }: AlignProps) {
	return null;
}
