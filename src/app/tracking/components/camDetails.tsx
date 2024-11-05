'use client'

import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import { useContext, useState } from "react"
import { FaCamera, FaLocationArrow } from "react-icons/fa6"
import { IoIosVideocam } from "react-icons/io"
import { IoPin } from "react-icons/io5"
import { MdOutlineShareLocation } from "react-icons/md"
import { trackingContext } from "../context/trackingContext"

const CamDetails = () => {
    const [zoom, setZoom] = useState(false)
    const {captureDetails} = useContext(trackingContext)

    return (
        <>
            <ZoomImage 
                setShow={setZoom}
                show={zoom}
                imageURL={require('@/assets/dev/cctv1.png')} 
            />
            <div className="bg-gradient-container w-[35%] p-3 rounded-lg flex flex-col gap-2">
                <div 
                    className="relative rounded-sm overflow-hidden h-[200px] flex justify-center items-center"
                    onClick={()=>setZoom(prev => !prev)}
                >
                    {
                        captureDetails?.imageUrl ?
                        <Image
                            src={captureDetails.imageUrl} 
                            alt="test-bg"
                            fill
                            style={{ objectFit: "cover" }}
                            className="lg:hover:scale-[1.4] scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                        /> 
                        :
                        <Image 
                            alt="logo"
                            width={100}
                            height={100}
                            className="opacity-25"
                            src={require('@/assets/logo.png')}
                        />
                    }
                </div>
                <div className="flex flex-col gap-2 overflow-y-hidden">
                    <div className="w-full py-2 px-3 gap-2 rounded-md bg-gradient-container flex flex-col">
                        <div className="flex gap-1 items-center">
                            <FaCamera size={11} color={theme.colors.text.secondary}/>
                            <Text>
                                Camera Name •
                                <Text textColor={theme.colors.text.primary}>
                                    &nbsp;Accra City Camera
                                </Text>
                            </Text>
                        </div>
                        <div className="flex gap-1 items-center">
                            <FaLocationArrow size={11} color={theme.colors.text.secondary}/>
                            <Text>
                                Last seen •
                                <Text textColor={theme.colors.text.primary}>
                                    &nbsp;Ayeduase, new site
                                </Text>
                            </Text>
                        </div>
                        <div className="flex gap-1 items-center">
                            <IoPin size={11} color={theme.colors.text.secondary}/>
                            <Text>
                                Location •
                                <Text textColor={theme.colors.text.primary}>
                                    &nbsp;Town council
                                </Text>
                            </Text>
                        </div>
                        <div className="flex gap-1 items-center">
                            <MdOutlineShareLocation size={11} color={theme.colors.text.secondary}/>
                            <Text>
                                Coordinates •
                                <Text textColor={theme.colors.text.primary}>
                                    &nbsp;5.23432, 30.23523
                                </Text>
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CamDetails