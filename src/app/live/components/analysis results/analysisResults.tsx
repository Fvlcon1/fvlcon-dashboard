'use client'

import { IPersonTrackingType, IPersonTrackingWithImageType } from "@/app/tracking/components/types"
import ZoomImage from "@components/zoomImage/zoomImage"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { useState } from "react"
import { MdDelete } from "react-icons/md"
import MatchContainer from "./matchContainer"

const AnalysisResults = ({
    detections
} : {
    detections?: IPersonTrackingWithImageType
}) => {
    const [originalImageZoom, setOriginalImageZoom] = useState(false)
    const [capturedImageZoom, setCapturedImageZoom] = useState(false)
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
            <div 
                className="p-3 py-2 flex flex-col gap-1 rounded-lg bg-gradient-container"
            >
                <MatchContainer 
                    originalImageUrl={detections?.originalImageUrl}
                    capturedImageUrl={detections?.imageUrl}
                    originalImageZoom={originalImageZoom}
                    setOriginalImageZoom={setOriginalImageZoom}
                    capturedImageZoom={capturedImageZoom}
                    setCapturedImageZoom={setCapturedImageZoom}
                />
            </div>
        </>
    )
}
export default AnalysisResults