'use client'

import { IPersonTrackingType, IPersonTrackingWithImageType, IPlateTrackingType } from "@/app/tracking/components/types"
import ZoomImage from "@components/zoomImage/zoomImage"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { useState } from "react"
import { MdDelete } from "react-icons/md"
import MatchContainer from "./matchContainer"
import PlateContainer from "./plateContainer"

const AnalysisResults = ({
    detections,
    plateDetections
} : {
    detections?: IPersonTrackingWithImageType
    plateDetections? : IPlateTrackingType
}) => {
    const [originalImageZoom, setOriginalImageZoom] = useState(false)
    const [capturedImageZoom, setCapturedImageZoom] = useState(false)
    const [plateImageZoom, setPlateImateZoom] = useState(false)
    console.log({detections})
    return (
        <>
            {
                detections?.originalImageUrl &&
                <ZoomImage
                    setShow={setOriginalImageZoom}
                    show={originalImageZoom}
                    imageURL={detections.originalImageUrl} 
                />
            }
            {
                detections?.imageUrl &&
                <ZoomImage
                    setShow={setCapturedImageZoom}
                    show={capturedImageZoom}
                    imageURL={detections.imageUrl} 
                />
            }
            {
                plateDetections?.imageUrl &&
                <ZoomImage
                    setShow={setPlateImateZoom}
                    show={plateImageZoom}
                    imageURL={plateDetections.imageUrl} 
                />
            }
            <div 
                className="py-2 flex flex-col gap-1 rounded-lg w-full"
            >
                {
                    detections ?
                    <MatchContainer 
                        originalImageUrl={detections?.originalImageUrl}
                        capturedImageUrl={detections?.imageUrl}
                        detections={detections}
                        originalImageZoom={originalImageZoom}
                        setOriginalImageZoom={setOriginalImageZoom}
                        capturedImageZoom={capturedImageZoom}
                        setCapturedImageZoom={setCapturedImageZoom}
                    />
                    : plateDetections &&
                    <PlateContainer
                        detections={plateDetections}
                        imageZoom={plateImageZoom}
                        setImageZoom={setPlateImateZoom}
                    />
                }
            </div>
        </>
    )
}
export default AnalysisResults