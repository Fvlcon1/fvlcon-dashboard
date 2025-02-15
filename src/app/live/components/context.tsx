'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export const liveComponentsContext = createContext<{
  screenShotUrl: string | undefined
  setScreenShotUrl: Dispatch<SetStateAction<string | undefined>>
  setShowDvlaRecord: Dispatch<SetStateAction<boolean>>
  showDvlaRecord: boolean
}>({
  screenShotUrl: undefined,
  setScreenShotUrl : ()=>{},
  showDvlaRecord : false,
  setShowDvlaRecord : ()=>{}
});

export const LiveComponentsContextProvider = ({ 
    children
 } : {
    children : ReactNode
 }) => {
  const [screenShotUrl, setScreenShotUrl] = useState<string>()
  const [showDvlaRecord, setShowDvlaRecord] = useState(false)
  return (
    <liveComponentsContext.Provider 
      value={{
        screenShotUrl,
        setScreenShotUrl,
        showDvlaRecord,
        setShowDvlaRecord
      }}
    >
      {children}
    </liveComponentsContext.Provider>
  );
}