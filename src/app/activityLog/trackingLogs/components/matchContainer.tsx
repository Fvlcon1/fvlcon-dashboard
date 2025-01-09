import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"

const MatchContainer = ({
    capturedImageUrl,
} : {
    capturedImageUrl? : string
}) => {
    const [zoom, setZoom] = useState(false)
    const [zoomImageUrl, setZoomImageUrl] = useState<string>('')

    return (
        <>
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={zoomImageUrl} 
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
                                    setZoom(true)
                                    setZoomImageUrl(capturedImageUrl)
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