import { overflow } from "@/utils/@types";
import { ReactNode } from "react";


export interface flexProps {
  children?: ReactNode;
  flex?: number;
  className? : string
  direction?: 'column' | 'row';
  gap?: number;
  padding?: string;
  margin?: string;
  justify?: string;
  align?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minHeight?: string;
  minWidth?: string;
  textColor?: string;
  colorTheme?: string;
  flexWrap?: boolean;
  opacity?: number;
  rounded?: string;
  background?: string;
  cursor?: string;
  shadow?: string;
  z?: number;
  position?: 'relative' | 'absolute' | 'fixed';
  overflow?: overflow;
  overflowX?: overflow;
  overflowY? : overflow
  scrollbarWidth? : "auto" | "thin" | "none"
}
