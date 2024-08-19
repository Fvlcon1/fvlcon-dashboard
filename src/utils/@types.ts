import { TypographyBold, TypographySize } from "@styles/style.types"
import { ElementType, ReactNode } from "react"

export type ButtonTypes = 'submit' | 'button'

export type ButtonStyleProps = {
    children? : ReactNode
    className? : string
    color?: string
    background?: string
    colorTheme? : string
    border?: string
    PreIcon?: ElementType
    PostIcon?: ElementType
    id?: string
    radius?: number
    padding?:string
    maxWidth?:string
    size?: {
      width?: string
      height?: string
    }
    shadow?: boolean
    textSize?: TypographySize
    textBold?: TypographyBold
    disabled?: boolean
    showLoader? : boolean
    variant? : "text" | "outlined" | "contained"
    disableElevation? : boolean
    opacity? : number
    hover? : Omit<ButtonStyleProps, 'onHover'>
  }
  
export interface ButtonProps extends ButtonStyleProps {
    Loader? : (props : any)=>JSX.Element
    type?: ButtonTypes
    text? : string
    icon? : ReactNode
    onClick?: () => void
}

export interface containerProps {
  children? : ReactNode
  padding? : string
  rounded? : string
  size?: {
    width?: string
    height?: string
  }
}

export interface safeareaProps {
  children? : ReactNode
  width? : string
  background? : string
  defaultBackground? : boolean
  padding? : string
}

export interface baseProps {
  children : ReactNode,
  className? : string,
  onClick? : ()=>void
}

export type canvasTypes = {
  dataUrl : string
  label : string
}

export type checkedFaceType = { 
  matchedPerson? : string
  similarity? : number
  originalImage : string
  matchedImage? : string
}

export type overflow = "visible" | "hidden" | "clip" | "scroll" | "auto"

export type FetchState<T> = {
  isLoading?: boolean;
  data?: T;
  error?: string;
  isEmpty?: boolean;
};