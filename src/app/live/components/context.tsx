'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export const liveComponentsContext = createContext<{
  screenShotUrl: string | undefined
  setScreenShotUrl: Dispatch<SetStateAction<string | undefined>>
  setShowDvlaRecord: Dispatch<SetStateAction<boolean>>
  showDvlaRecord: boolean
  setDvlaData: Dispatch<any>
  dvlaData: any
}>({
  screenShotUrl: undefined,
  setScreenShotUrl : ()=>{},
  showDvlaRecord: false,
  setShowDvlaRecord : ()=>{},
  dvlaData: {},
  setDvlaData : ()=>{},

});

export const LiveComponentsContextProvider = ({ 
    children
 } : {
    children : ReactNode
 }) => {
  const [screenShotUrl, setScreenShotUrl] = useState<string>()
  const [showDvlaRecord,setShowDvlaRecord] = useState(false)
  const [dvlaData, setDvlaData] = useState<any>()
  return (
    <liveComponentsContext.Provider 
      value={{
        screenShotUrl,
        setScreenShotUrl,
        showDvlaRecord,
        setShowDvlaRecord,
        setDvlaData,
        dvlaData
      }}
    >
      {children}
    </liveComponentsContext.Provider>
  );
}