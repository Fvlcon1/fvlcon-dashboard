'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { IPersonTrackingType, IPlateOrPerson, IPlateTrackingType, IPlateTrackingWaypoints, ITrackingWaypointsType } from "../components/types";
import { LatLngExpression } from "leaflet";

export const trackingContext = createContext<{
    showCameras : boolean,
    setShowCameras : Dispatch<SetStateAction<boolean>>
    imageUrl : string | undefined
    setImageUrl: Dispatch<SetStateAction<string | undefined>>
    captureDetails? : {data? : IPlateOrPerson, status? : 'loading'}
    setCaptureDetails : Dispatch<SetStateAction<{data? : IPlateOrPerson, status? : 'loading'}>>
    wayPoints?: ITrackingWaypointsType[] | IPlateTrackingWaypoints[]
    setWayPoints: Dispatch<SetStateAction<ITrackingWaypointsType[] | IPlateTrackingWaypoints[]>>
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
    const [captureDetails, setCaptureDetails] = useState<{data? : IPlateOrPerson, status? : 'loading'}>({})
    const [wayPoints, setWayPoints] = useState<ITrackingWaypointsType[] | IPlateTrackingWaypoints[]>([])
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