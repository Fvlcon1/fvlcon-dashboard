'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import MatchContainer from "./matchContainer"
import { useContext, useState } from "react"
import { IPersonTrackingType, IPersonTrackingWithImageType } from "./types"
import getDate, { getRelativeTime, getTime } from "@/utils/getDate"
import { capitalizeString } from "@/utils/capitalizeString"
import ZoomImage from "@components/zoomImage/zoomImage"
import { trackingContext } from "../context/trackingContext"

const TableBody = ({
    trackingData,
} : {
    trackingData : IPersonTrackingWithImageType[]
}) => {
    const [onHover, setOnHover] = useState<boolean>(false)
    const [onPress, setOnPress] = useState<boolean>(false)
    const [originalImageZoom, setOriginalImageZoom] = useState(false)
    const [capturedImageZoom, setCapturedImageZoom] = useState(false)
    const [capturedImageUrl, setCapturedImageUrl] = useState<string>()
    const [originalImageUrl, setOriginalImageUrl] = useState<string>()
    const {setCaptureDetails, setWayPoints, setCenter} = useContext(trackingContext)

    const handleItemClick = (data : IPersonTrackingWithImageType) => {
        setCaptureDetails({
            data,
            status : undefined
        })
        setWayPoints([
            {
                ...data,
                radius: 10
            }
        ])
        setCenter(data.coordinates)
    }

    return (
        <>
            {
                originalImageUrl&&
                <ZoomImage
                    setShow={setOriginalImageZoom}
                    show={originalImageZoom}
                    imageURL={originalImageUrl} 
                />
            }
            {
                capturedImageUrl &&
                <ZoomImage
                    setShow={setCapturedImageZoom}
                    show={capturedImageZoom}
                    imageURL={capturedImageUrl} 
                />
            }
            <tbody>
                {
                    trackingData.map((item, index) => (
                        <tr
                            key={index}
                            className={`border-b-solid border-b-[1px] border-b-bg-tetiary hover:scale-[0.98] cursor-pointer duration-200`}
                            onMouseOver={()=>setOnHover(true)}
                            onMouseLeave={()=>setOnHover(false)}
                            onMouseDown={()=>setOnPress(true)}
                            onMouseUp={()=>setOnPress(false)}
                            onClick={()=>handleItemClick(item)}
                        >
                            <td className="py-4 pl-4">
                                <MatchContainer 
                                    originalImageUrl={item.originalImageUrl}
                                    capturedImageUrl={item.imageUrl}
                                    originalImageZoom={originalImageZoom}
                                    setOriginalImageZoom={setOriginalImageZoom}
                                    capturedImageZoom={capturedImageZoom}
                                    setCapturedImageZoom={setCapturedImageZoom}
                                    setCapturedImageUrl={setCapturedImageUrl}
                                    setOriginalImageUrl={setOriginalImageUrl}
                                />
                            </td>
                            <td className="py-4">
                                <div className="flex flex-col gap-0">
                                    {
                                        item.name.length > 2 ?
                                        <Text
                                            textColor={theme.colors.text.primary}
                                        >
                                            {capitalizeString(item.name)}
                                        </Text>
                                        :
                                        <Text>
                                            unknown
                                        </Text>
                                    }
                                    <Text>
                                        {item.alias}
                                    </Text>
                                </div>
                            </td>
                            <td className="py-4">
                                <div className="flex flex-col gap-0">
                                    <Text
                                        textColor={theme.colors.text.primary}
                                    >
                                        {getDate(item.timeSeen)}
                                    </Text>
                                    <Text>
                                        {getRelativeTime(item.timeSeen)} | {getTime(item.timeSeen)}
                                    </Text>
                                </div>
                            </td>
                            <td className="py-4">
                                <Text>
                                    {item.lastSeen}
                                </Text>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </>
    )
}
export default TableBody