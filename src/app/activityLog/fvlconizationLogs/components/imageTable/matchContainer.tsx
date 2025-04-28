import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"

const MatchContainer = ({
    originalImageUrl,
    capturedImageUrl,
} : {
    originalImageUrl? : string
    capturedImageUrl? : string
}) => {
    const [zoomImage, setZoomImage] = useState<string>('')
    const [zoom, setZoom] = useState(false)
    return (
        <>
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={zoomImage} 
            />
            <div className="flex flex-col gap-1">
                <div className="flex gap-2 relative w-fit">
                    <div className="w-[150px] h-[150px] overflow-hidden bg-bg-secondary relative rounded-md">
                    {
                            capturedImageUrl ?
                            <Image
                                src={capturedImageUrl} 
                                alt="test-bg"
                                fill
                                style={{ objectFit: "cover" }}
                                onClick={()=>{
                                    setZoomImage(capturedImageUrl)
                                    setZoom(prev => !prev)
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
                    <div className="w-[150px] h-[150px] overflow-hidden bg-bg-secondary relative rounded-md">
                        {
                            originalImageUrl ?
                            <Image
                                src={originalImageUrl} 
                                alt="test-bg"
                                fill
                                style={{ objectFit: "cover" }}
                                onClick={()=>{
                                    setZoomImage(originalImageUrl)
                                    setZoom(prev => !prev)
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
                    <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
                        <div className="w-[60px] h-[60px] bg-[#0000002e] p-[6px] backdrop-filter backdrop-blur-lg rounded-full absolute">
                            <div className="w-full h-full bg-[#7A6A5C] rounded-full flex justify-center items-center ">
                                <Text
                                    textColor={theme.colors.text.primary}
                                    bold={TypographyBold.md}
                                >
                                    90%
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MatchContainer