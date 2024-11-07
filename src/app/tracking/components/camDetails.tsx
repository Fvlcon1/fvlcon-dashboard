'use client'

import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import { useContext, useState } from "react"
import { FaCamera, FaLocationArrow, FaVideo } from "react-icons/fa6"
import { IoIosVideocam } from "react-icons/io"
import { IoPin } from "react-icons/io5"
import { MdOutlineShareLocation } from "react-icons/md"
import { trackingContext } from "../context/trackingContext"
import Skeleton from "react-loading-skeleton"
import { getRelativeTime } from "@/utils/getDate"

const CamDetails = () => {
    const [zoom, setZoom] = useState(false)
    const {captureDetails} = useContext(trackingContext)
    const streamName = captureDetails?.data?.streamName
    const lastSeen = captureDetails?.data?.lastSeen
    const time = captureDetails?.data?.timeSeen
    const coordinates = captureDetails?.data?.coordinates

    return (
        <>
            {
                captureDetails?.data?.imageUrl &&
                <ZoomImage 
                    setShow={setZoom}
                    show={zoom}
                    imageURL={captureDetails.data.imageUrl} 
                />
            }
            {
                captureDetails?.status === 'loading' ?
                <div className="w-[35%]">
                    <Skeleton
                        height={200}
                        baseColor={theme.colors.bg.tetiary}
                        highlightColor={theme.colors.bg.alt1}
                    />
                    <>
                        <Skeleton
                            height={20}
                            baseColor={theme.colors.bg.tetiary}
                            highlightColor={theme.colors.bg.alt1}
                        />
                        <Skeleton
                            height={20}
                            baseColor={theme.colors.bg.tetiary}
                            highlightColor={theme.colors.bg.alt1}
                        />
                        <Skeleton
                            height={20}
                            width={'80%'}
                            baseColor={theme.colors.bg.tetiary}
                            highlightColor={theme.colors.bg.alt1}
                        />
                        <Skeleton
                            height={20}
                            width={'40%'}
                            baseColor={theme.colors.bg.tetiary}
                            highlightColor={theme.colors.bg.alt1}
                        />
                    </>
                </div>
                : captureDetails?.data &&
                <div className="bg-gradient-container w-[35%] p-3 rounded-lg flex flex-col gap-2">
                    <div 
                        className="relative rounded-sm overflow-hidden h-[200px] w-full"
                    >
                        {
                            captureDetails.data.imageUrl ?
                            <Image
                                src={captureDetails.data.imageUrl} 
                                alt="test-bg"
                                fill
                                width={0}
                                height={0}
                                sizes="large"
                                style={{ objectFit: "cover" }}
                                onClick={()=>setZoom(prev => !prev)}
                                quality={100}
                                className="lg:hover:scale-[1.4] scale-[1.2] duration-200 cursor-pointer hover:lg:opacity-70"
                            />
                            :
                            <div className="w-full h-full flex justify-center items-center">
                                <Image 
                                    alt="logo"
                                    width={100}
                                    height={100}
                                    className="opacity-25"
                                    src={require('@/assets/logo.png')}
                                />
                            </div>
                        }
                    </div>
                    <div className="flex flex-col gap-2 overflow-y-hidden">
                        <div className="w-full py-2 px-3 gap-2 rounded-md bg-gradient-container flex flex-col">
                            <div className="flex gap-1 items-center">
                                <FaVideo size={11} color={theme.colors.text.secondary}/>
                                <Text>
                                    Stream name •
                                    <Text textColor={theme.colors.text.primary}>
                                        &nbsp;{streamName}
                                    </Text>
                                </Text>
                            </div>
                            <div className="flex gap-1 items-center">
                                <FaLocationArrow size={11} color={theme.colors.text.secondary}/>
                                <Text>
                                    Last seen •
                                    <Text textColor={theme.colors.text.primary}>
                                        &nbsp;{time && getRelativeTime(time).charAt(0).toUpperCase() + getRelativeTime(time).slice(1)}
                                    </Text>
                                </Text>
                            </div>
                            <div className="flex gap-1 items-center">
                                <IoPin size={11} color={theme.colors.text.secondary}/>
                                <Text>
                                    Location •
                                    <Text textColor={theme.colors.text.primary}>
                                        &nbsp;{lastSeen}
                                    </Text>
                                </Text>
                            </div>
                            <div className="flex gap-1 items-center">
                                <MdOutlineShareLocation size={11} color={theme.colors.text.secondary}/>
                                <Text>
                                    Coordinates •
                                    <Text textColor={theme.colors.text.primary}>
                                        &nbsp;{coordinates && `${coordinates[0]}, ${coordinates[1]}`}
                                    </Text>
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
export default CamDetails