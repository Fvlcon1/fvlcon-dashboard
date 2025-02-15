'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

export const liveComponentsContext = createContext<{
  screenShotUrl: string | undefined
  setScreenShotUrl: Dispatch<SetStateAction<string | undefined>>
}>({
  screenShotUrl: undefined,
  setScreenShotUrl : ()=>{},
});

export const LiveComponentsContextProvider = ({ 
    children
 } : {
    children : ReactNode
 }) => {
  const [screenShotUrl, setScreenShotUrl] = useState<string>()
  return (
    <liveComponentsContext.Provider 
      value={{
        screenShotUrl,
        setScreenShotUrl,
      }}
    >
      {children}
    </liveComponentsContext.Provider>
  );
}