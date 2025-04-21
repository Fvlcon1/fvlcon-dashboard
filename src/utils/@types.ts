import { TypographyBold, TypographySize } from "@styles/style.types"
import { ElementType, MouseEventHandler, ReactNode } from "react"

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
    loading? : boolean
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
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export type checkFaceDetails = {
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

export type checkedFaceType = { 
  matchedPerson? : string
  similarity? : number
  croppedImage : string
  boundedImage : string
  matchedImage? : string
  faceid? : string,
  occurances? : {
    index: number;
    content: fvlconizedFaceType[];
  }
  details ?: any
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
export type IPosition = "top" | "bottom" | "left" | "right"

export type FetchState<T> = {
  isLoading?: boolean;
  data?: T;
  error?: string;
  isEmpty?: boolean;
};

export type menuItemsTypes = {
  name: string;
  onClick?: (index: number, id : string) => void;
  setActive?: (index: number, active : boolean) => void;
  icon?: ReactNode;
  closeOnClick?: boolean;
  dropdown?: menuItemsTypes[];
  active: boolean;
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
  url : string,
  location? : string
  coordinates? : number[]
  streamName? : string
  type? : string
}

export type fvlconizedFaceType = {
  Person : {
      Face : any,
      Index : number
  },
  Timestamp : number
  FaceMatches : any[]
}

export type occurance = {
  index: number;
  content: fvlconizedFaceType[];
  croppedImage? : string
  croppedImageS3Key? : string
}
export interface WebSocketMessage {
  action: string;
  data: any;
}
export interface UseWebSocketReturn {
  messages: WebSocketMessage[];
  sendMessage: (message: WebSocketMessage) => void;
}

export interface DropdownItem {
  key: string;
  label?: ReactNode | string;
  disabled?: boolean;
  type?: "divider" | "title" | "link" | "loading"
  href? : string
  icon?: ReactNode;
  onClick? : ()=>void
}