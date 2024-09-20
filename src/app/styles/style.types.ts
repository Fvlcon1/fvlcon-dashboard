import { ReactNode } from "react";

export enum TypographySize {
  xs = "10px",
  body = "12px",
  HM = "14px",
  HL = "16px",
}

export interface AppTypographyProps {
  children? : ReactNode
  className? : string
  fontfamily? : string
  bold?: TypographyBold;
  size?: TypographySize;
  textColor?: string;
  colorTheme? : string;
  wrap?: string;
  underline?: boolean
  clickable?: boolean
  clickableLink?: boolean
  italic?: boolean
  textAlign? : "center" | "end" | "left" | "right" | "start"
  display? : string
  ellipsis? : boolean
  maxLines? : number
  lineHeight? : number
  whiteSpace? : 'normal' | 'pre' | 'nowrap' | 'pre-wrap' | 'pre-line' | 'break-spaces' | 'white-space-collapse' | 'text-wrap' | 'white-space-trim'
}

export interface buttonProps {
  width : string,
  backgroundColor : string,
}

export enum TypographyBold {
  sm = "400",
  sm2 = "500",
  md = "600",
  md2 = "700",
  lg = "800",
}

export interface hrProps {
  size? : {
    width? : string,
    height? : string,
  },
  background? : string,
  margin? : string,
  padding? : string
}

export interface clickableProps {
  cursor? : string
  radius? : string
  padding? : string
  margin? : string
}