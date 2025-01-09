import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"

const MatchContainer = ({
    originalImageUrl,
    capturedImageUrl,
    originalImageZoom,
    setOriginalImageZoom,
    capturedImageZoom,
    setCapturedImageZoom,
} : {
    originalImageUrl? : string
    capturedImageUrl? : string
    originalImageZoom: boolean
    setOriginalImageZoom: Dispatch<SetStateAction<boolean>>
    capturedImageZoom: boolean
    setCapturedImageZoom: Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <>
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 relative w-fit">
                    <div className="w-[50px] h-[50px] overflow-hidden bg-bg-secondary relative rounded-md">
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
                </div>
            </div>
        </>
    )
}
export default MatchContainer