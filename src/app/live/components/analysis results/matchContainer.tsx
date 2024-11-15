import { IPersonTrackingWithImageType } from "@/app/tracking/components/types"
import { capitalizeString } from "@/utils/capitalizeString"
import { getRelativeTime } from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Tooltip } from "antd"
import Image from "next/image"
import Link from "next/link"
import { Dispatch, SetStateAction, useState } from "react"
import { FaLocationDot } from "react-icons/fa6"

const MatchContainer = ({
    originalImageUrl,
    capturedImageUrl,
    originalImageZoom,
    setOriginalImageZoom,
    capturedImageZoom,
    setCapturedImageZoom,
    detections,
} : {
    originalImageUrl? : string
    capturedImageUrl? : string
    originalImageZoom: boolean
    setOriginalImageZoom: Dispatch<SetStateAction<boolean>>
    capturedImageZoom: boolean
    setCapturedImageZoom: Dispatch<SetStateAction<boolean>>
    detections: IPersonTrackingWithImageType
}) => {
    console.log({
        originalImageUrl,
        capturedImageUrl,
        originalImageZoom,
        setOriginalImageZoom,
        capturedImageZoom,
        setCapturedImageZoom,
    })
    return (
        <>
            <div className="flex flex-col gap-1">
                <div className="flex justify-between gap-2 items-center">
                    <Text
                        textColor={theme.colors.text.tetiary}
                    >
                        {capitalizeString(detections.type)}
                    </Text>
                    <Tooltip 
                        title="Track"
                        placement="left"
                    >
                        <Link href={`/tracking?personTrackingId=${detections.id}`}>
                            <ClickableTab>
                                <FaLocationDot 
                                    color={theme.colors.text.secondary}
                                    size={13}
                                />
                            </ClickableTab>
                        </Link>
                    </Tooltip>
                </div>
                <div className="flex gap-2 relative w-fit">
                    <div className="absolute z-10 flex justify-center items-center top-[20%] left-[36%] rounded-full w-[30px] h-[30px] p-[3px] border-[3px] border-solid border-bg-secondary bg-[#0000008f] backdrop-filter backdrop-blur-lg">
                        <Text
                            size={TypographySize.xs2}
                            textColor={theme.colors.text.primary}
                        >
                            98%
                        </Text>
                    </div>
                    <div className="w-[65px] h-[65px] overflow-hidden bg-bg-secondary relative rounded-md">
                    {
                            capturedImageUrl ?
                            <Image
                                src={capturedImageUrl} 
                                alt="test-bg"
                                fill
                                style={{ objectFit: "cover" }}
                                onClick={()=>{
                                    setCapturedImageZoom(true)
                                }}
                                className="lg:hover:scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                            /> 
                            :
                            <div className="w-full h-full flex justify-center items-center">
                                <Text>
                                    🚫
                                </Text>
                            </div>
                        }
                    </div>
                    <div className="w-[65px] h-[65px] overflow-hidden bg-bg-secondary relative rounded-md">
                        {
                            originalImageUrl ?
                            <Image
                                src={originalImageUrl} 
                                alt="test-bg"
                                fill
                                style={{ objectFit: "cover" }}
                                onClick={()=>setOriginalImageZoom(true)}
                                className="lg:hover:scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                            /> 
                            :
                            <div className="w-full h-full flex justify-center items-center">
                                <Text>
                                    🚫
                                </Text>
                            </div>
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-[1px]">
                    {
                        detections.name.length > 2 ?
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            {capitalizeString(detections.name)}
                        </Text>
                        :
                        <Text>
                            unknown
                        </Text>
                    }
                    <div className="flex flex-col gap-1">
                        <Text>
                            {getRelativeTime(detections.timeSeen)}
                        </Text>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MatchContainer