'use client'

import { IPersonTrackingWithImageType } from "@/app/tracking/components/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export const liveComponentsContext = createContext<{
  screenShotUrl: string | undefined
  setScreenShotUrl: Dispatch<SetStateAction<string | undefined>>
  setShowDvlaRecord: Dispatch<SetStateAction<boolean>>
  showDvlaRecord: boolean
  setDvlaData: Dispatch<any>
  dvlaData: any
  setIsNiaVisible: Dispatch<SetStateAction<boolean>>
  isNiaVisible: boolean
  setDetection: Dispatch<SetStateAction<IPersonTrackingWithImageType | undefined>>
  detection: IPersonTrackingWithImageType | undefined
}>({
  screenShotUrl: undefined,
  setScreenShotUrl : ()=>{},
  showDvlaRecord: false,
  setShowDvlaRecord : ()=>{},
  dvlaData: {},
  setDvlaData : ()=>{},
  isNiaVisible: false,
  setIsNiaVisible : ()=>{},
  setDetection : ()=>{},
  detection : undefined

});

export const LiveComponentsContextProvider = ({ 
    children
 } : {
    children : ReactNode
 }) => {
  const [screenShotUrl, setScreenShotUrl] = useState<string>()
  const [showDvlaRecord,setShowDvlaRecord] = useState(false)
  const [dvlaData, setDvlaData] = useState<any>()
  const [isNiaVisible, setIsNiaVisible] = useState(false)
  const [detection, setDetection] = useState<IPersonTrackingWithImageType>()
  return (
    <liveComponentsContext.Provider 
      value={{
        screenShotUrl,
        setScreenShotUrl,
        showDvlaRecord,
        setShowDvlaRecord,
        setDvlaData,
        dvlaData,
        setDetection,
        detection,
        setIsNiaVisible,
        isNiaVisible
      }}
    >
      {children}
    </liveComponentsContext.Provider>
  );
}