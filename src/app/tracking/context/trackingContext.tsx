'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const trackingContext = createContext<{
    showCameras : boolean,
    setShowCameras : Dispatch<SetStateAction<boolean>>
}>({
    showCameras : false,
    setShowCameras : ()=>{}
})

const TrackingProvider = ({children} : {children : ReactNode}) => {
    const [showCameras, setShowCameras] = useState(true)
    return (
        <trackingContext.Provider
            value={{
                showCameras,
                setShowCameras
            }}
        >
            {children}
        </trackingContext.Provider>
    )
}

export default TrackingProvider