'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IPersonTrackingType, ITrackingWaypointsType } from "../components/types";
import { LatLngExpression } from "leaflet";

export const trackingContext = createContext<{
    showCameras : boolean,
    setShowCameras : Dispatch<SetStateAction<boolean>>
    imageUrl : string | undefined
    setImageUrl: Dispatch<SetStateAction<string | undefined>>
    captureDetails? : {data? : IPersonTrackingType, status? : 'loading'}
    setCaptureDetails : Dispatch<SetStateAction<{data? : IPersonTrackingType, status? : 'loading'}>>
    wayPoints?: ITrackingWaypointsType[]
    setWayPoints: Dispatch<SetStateAction<ITrackingWaypointsType[]>>
    setCenter: Dispatch<SetStateAction<(LatLngExpression & number[]) | undefined>>
    center?: (LatLngExpression & number[])
}>({
    showCameras : false,
    setShowCameras : ()=>{},
    imageUrl : '',
    setImageUrl : ()=>{},
    setCaptureDetails : ()=>{},
    setWayPoints : ()=>{},
    setCenter : ()=>{},
})

const TrackingProvider = ({children} : {children : ReactNode}) => {
    const [showCameras, setShowCameras] = useState(true)
    const [imageUrl, setImageUrl] = useState<string>()
    const [captureDetails, setCaptureDetails] = useState<{data? : IPersonTrackingType, status? : 'loading'}>({})
    const [wayPoints, setWayPoints] = useState<ITrackingWaypointsType[]>([])
    const [center, setCenter] = useState<LatLngExpression & number[]>()
    return (
        <trackingContext.Provider
            value={{
                showCameras,
                setShowCameras,
                imageUrl,
                setImageUrl,
                captureDetails,
                setCaptureDetails,
                wayPoints,
                setWayPoints,
                setCenter,
                center
            }}
        >
            {children}
        </trackingContext.Provider>
    )
}

export default TrackingProvider