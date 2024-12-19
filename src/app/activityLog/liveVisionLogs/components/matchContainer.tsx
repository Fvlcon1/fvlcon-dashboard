import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
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
                    <div className="w-[50px] h-[50px] overflow-hidden bg-bg-secondary relative rounded-md">
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
                    <div className="w-[50px] h-[50px] overflow-hidden bg-bg-secondary relative rounded-md">
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
                </div>
            </div>
        </>
    )
}
export default MatchContainer