'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IPersonTrackingType } from "../components/types";

export const trackingContext = createContext<{
    showCameras : boolean,
    setShowCameras : Dispatch<SetStateAction<boolean>>
    imageUrl : string | undefined
    setImageUrl: Dispatch<SetStateAction<string | undefined>>
    captureDetails? : IPersonTrackingType
    setCaptureDetails : Dispatch<SetStateAction<IPersonTrackingType | undefined>>
}>({
    showCameras : false,
    setShowCameras : ()=>{},
    imageUrl : '',
    setImageUrl : ()=>{},
    setCaptureDetails : ()=>{}
})

const TrackingProvider = ({children} : {children : ReactNode}) => {
    const [showCameras, setShowCameras] = useState(true)
    const [imageUrl, setImageUrl] = useState<string>()
    const [captureDetails, setCaptureDetails] = useState<IPersonTrackingType>()
    return (
        <trackingContext.Provider
            value={{
                showCameras,
                setShowCameras,
                imageUrl,
                setImageUrl,
                captureDetails,
                setCaptureDetails
            }}
        >
            {children}
        </trackingContext.Provider>
    )
}

export default TrackingProvider