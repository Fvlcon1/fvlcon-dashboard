'use client'

import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { FaCamera, FaLocationArrow, FaVideo } from "react-icons/fa6"
import { IoIosVideocam } from "react-icons/io"
import { IoPin } from "react-icons/io5"
import { MdOutlineShareLocation } from "react-icons/md"
import { trackingContext } from "../context/trackingContext"
import Skeleton from "react-loading-skeleton"
import { getRelativeTime } from "@/utils/getDate"
import { ICamDetailsPlate, ICamDetilasPersonDataType, IPersonTrackingType, IPlateTrackingType, ITrackingDataTypes } from "./types"
import CamDetailsLoader from "./camDetailsLoader"
import CamDetailsPerson from "./camDetailsPerson"
import CamDetailsPlate from "./camDetailsPlate"

const CamDetails = () => {
    const [zoom, setZoom] = useState(false)
    const {captureDetails} = useContext(trackingContext)
    const coordinates = captureDetails?.data?.coordinates
    const [personData, setPersonData] = useState<ICamDetilasPersonDataType>()
    const [plateData, setPlateData] = useState<ICamDetailsPlate>()

    const setDetails = () => {
        if(captureDetails?.data?.type === ITrackingDataTypes.person){
            const transformedCaptureDetails = captureDetails.data as IPersonTrackingType
            setPersonData({
                streamName : transformedCaptureDetails.streamName,
                lastSeen : transformedCaptureDetails.lastSeen,
                time : transformedCaptureDetails.timeSeen,
                coordinates : transformedCaptureDetails.coordinates
            })
        } else if(captureDetails?.data?.type === ITrackingDataTypes.plate){
            const transformedCaptureDetails = captureDetails.data as IPlateTrackingType
            setPlateData({
                numberPlate : transformedCaptureDetails.plateNumber,
                lastSeen : transformedCaptureDetails.locationName,
                time : new Date(transformedCaptureDetails.timestamp),
                coordinates : transformedCaptureDetails.coordinates
            })
        }
    }

    useEffect(()=>{
        setDetails()
    },[captureDetails])

    return (
        <>
            {
                captureDetails?.data?.imageUrl &&
                <ZoomImage 
                    setShow={setZoom}
                    show={zoom}
                    imageURL={captureDetails.data.imageUrl} 
                />
            }
            {
                captureDetails?.status === 'loading' ?
                <CamDetailsLoader />
                : captureDetails?.data &&
                <div className="bg-gradient-container-md  w-[35%] p-3 rounded-xl flex flex-col gap-2">
                    <div 
                        className="relative rounded-lg overflow-hidden h-[200px] w-full"
                    >
                        {
                            captureDetails.data.imageUrl ?
                            <Image
                                src={captureDetails.data.imageUrl} 
                                alt="test-bg"
                                fill
                                width={0}
                                height={0}
                                sizes="large"
                                style={{ objectFit: "cover" }}
                                onClick={()=>setZoom(prev => !prev)}
                                quality={100}
                                className="lg:hover:scale-[1.4] scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                            />
                            :
                            <div className="w-full h-full flex justify-center items-center">
                                <Image 
                                    alt="logo"
                                    width={100}
                                    height={100}
                                    className="opacity-25"
                                    src={require('@/assets/logo.png')}
                                />
                            </div>
                        }
                    </div>
                    {
                        captureDetails.data.type === ITrackingDataTypes.person ?
                        <CamDetailsPerson personData={personData}/>
                        :
                        captureDetails.data.type === ITrackingDataTypes.plate &&
                        <CamDetailsPlate plateData={plateData}/>
                    }
                </div>
            }
        </>
    )
}
export default CamDetails