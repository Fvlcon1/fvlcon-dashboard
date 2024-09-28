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
  descriptor? : Float32Array
}

export type checkedFaceType = { 
  matchedPerson? : string
  similarity? : number
  originalImage : string
  matchedImage? : string
  faceid? : string,
  details ?: {
    Address : string,
    Citizenship : string,
    CriminalRecord : string,
    DateOfBirth : string,
    DigitalAddress : string,
    ExternalImageId : string,
    FaceId : string,
    FirstName : string,
    HasCriminalRecord : string,
    LastName : string,
    MiddleName : string,
    PersonId : string,
    PersonName : string,
    PlaceOfBirth : string,
    S3Key : string,
    imageUrl : string
  }
}

export type ImageCardType = {
  imageURL? : string
  title? : string,
  rightButtonTitle? : string,
  rightButtonClick? : ()=> void,
  MiddleButtonTitle? : string,
  MiddleButtonClick? : ()=> void
  description? : string
}

export type overflow = "visible" | "hidden" | "clip" | "scroll" | "auto"

export type FetchState<T> = {
  isLoading?: boolean;
  data?: T;
  error?: string;
  isEmpty?: boolean;
};

export type menuItemsTypes = {
  name: string;
  onClick?: (index: number, id : string) => void;
  setActive?: (index: number, active: boolean) => void;
  icon?: ReactNode;
  closeOnClick?: boolean;
  dropdown?: menuItemsTypes[];
  active?: boolean;
};

export type cameraFolderType = {
  id: string;
  type: "folder";
  folderName: string;
  cameras: FolderOrCamera[];
  open: boolean;
  renaming? : boolean
  hover: boolean;
  activeMenu: boolean;
  select? : boolean
};

export type cameraType = {
  id: string;
  type: "camera";
  name: string;
  renaming? : boolean
  description?: string;
  hover: boolean;
  activeMenu: boolean;
  active: boolean;
  select? : boolean
};

export type FolderOrCamera = cameraFolderType | cameraType;

export type logsType = {
  date : Date,
  log : {
    maxLines? : number,
    content : string
  }
}

export type activeCameraType = {
  id : string,
  url : string
}