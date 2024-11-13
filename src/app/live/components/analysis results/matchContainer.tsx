import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
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
        </>
    )
}
export default MatchContainer