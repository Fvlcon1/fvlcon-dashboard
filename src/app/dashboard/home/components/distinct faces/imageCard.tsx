'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { MdDelete, MdFullscreen } from "react-icons/md"
import { imageUploadContext } from "@/context/imageUpload"
import { hexOpacity } from "@/utils/hexOpacity"
import { TypographyBold, TypographySize } from "@styles/style.types"
import ClickableTab from "@components/clickable/clickabletab"
import Angels from "./angles"
import { FaImage } from "react-icons/fa6"
import { LuSwitchCamera } from "react-icons/lu"
import { RiFullscreenFill } from "react-icons/ri"
import ZoomImage from "@components/zoomImage/zoomImage"

const ImageCard = ({
    title,
    rightButtonTitle,
    rightButtonClick,
    MiddleButtonTitle,
    MiddleButtonClick,
    description,
    croppedImage,
    boundedImage
} : {
    croppedImage : string
    boundedImage : string
    title? : string,
    rightButtonTitle? : string,
    rightButtonClick? : ()=> void,
    MiddleButtonTitle? : string,
    MiddleButtonClick? : ()=> void
    description? : string
}) => {
    const [hover, setHover] = useState(false)
    const [showBoundedImage, setShowBoundedImage] = useState(false)
    const [showZoomImage, setShowZoomImage] = useState(false)
    const [componentHover, setComponentHover] = useState(false)
    return (
        <>
            <ZoomImage 
                show={showZoomImage}
                setShow={setShowZoomImage}
                imageURL={showBoundedImage ? boundedImage : croppedImage}
            />
            {/* <ZoomImage 
                show={!showBoundedImage && showZoomImage}
                setShow={setShowZoomImage}
                imageURL={croppedImage}
            /> */}
            {/* <div className={`${showZoomImage ? 'bloack' : 'hidden'} shadow-2xl fixed z-[100] top-0 right-0 w-[70px] h-[70px] rounded-md bg-bg-tetiary overflow-hidden`}>
                <div className="relative w-full h-full">
                    <Image 
                        src={showBoundedImage ? croppedImage : boundedImage}
                        alt="Uploaded Image"
                        width={0}
                        height={0}
                        style={{
                            width : '100%',
                            height : 'auto',
                            objectFit: "cover"
                        }}
                        quality={100}
                        className={`${hover && 'scale-[1.3] !z-0'} duration-300`}
                    />
                    <div className="absolute flex w-full h-full top-0 left-0 items-center justify-center">
                        <ClickableTab
                            onClick={()=>setShowBoundedImage(prev => !prev)}
                            className="!bg-[#0000006f] hover:!bg-bg-tetiary"
                        >
                            <LuSwitchCamera 
                                color={theme.colors.text.primary}
                                size={30}
                            />
                        </ClickableTab>
                    </div>
                </div>
            </div> */}
            <div 
                className="p-2 py-1 min-w-[200px] w-[200px] flex flex-col gap-1 rounded-lg bg-gradient-container-black"
                onMouseOver={()=>setComponentHover(true)}
                onMouseLeave={()=>setComponentHover(false)}
            >
                <Flex
                    justify="space-between"
                    align="center"
                >
                    {
                        title &&
                        <div className="mt-[-1px]">
                            <AppTypography>
                                {title && `• ${title}`}
                            </AppTypography>
                        </div>
                    }
                    {
                        rightButtonTitle &&
                        <ClickableTab
                            onClick={rightButtonClick}
                        >
                            <AppTypography
                                size={TypographySize.xs}
                                bold={TypographyBold.md}
                            >
                                {rightButtonTitle}
                            </AppTypography>
                        </ClickableTab>
                    }
                    <div className={`${componentHover ? 'opacity-100' : 'opacity-0'} flex items-center duration-300`}>
                        <ClickableTab
                            onClick={()=>setShowZoomImage(true)}
                        >
                            <RiFullscreenFill 
                                color={theme.colors.text.secondary}
                                size={14}
                            />
                        </ClickableTab>
                        <ClickableTab
                            onClick={()=>setShowBoundedImage(prev => !prev)}
                        >
                            <LuSwitchCamera 
                                color={theme.colors.text.secondary}
                                size={15}
                            />
                        </ClickableTab>
                    </div>
                </Flex>
                <div 
                    className="w-full rounded-lg bg-bg-tetiary p-2 cursor-pointer"
                    onMouseOver={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                >
                    <div className="w-[full] relative h-[150px] rounded-md bg-bg-primary flex justify-center items-center overflow-hidden">
                        <Image 
                            src={showBoundedImage ? boundedImage : croppedImage}
                            alt="Uploaded Image"
                            width={0}
                            height={0}
                            style={{
                                width : '100%',
                                height : 'auto'
                            }}
                            quality={100}
                            className={`${hover && 'scale-[1.3] !z-0'} duration-300`}
                        />
                        {
                            MiddleButtonTitle &&
                            <div 
                                className={`absolute rounded-md flex justify-center items-center w-full h-full backdrop-filter  ${hover && 'backdrop-blur-sm'} top-0 duration-300`}
                                style={{
                                    backgroundColor : hover ? `${theme.colors.bg.primary}${hexOpacity(50)}` : ''
                                }}
                                onClick={()=>setShowZoomImage(true)}
                            >
                                {
                                    hover &&
                                    <ClickableTab 
                                        className={`hover:!bg-[#00000040]`}
                                        onClick={MiddleButtonClick}
                                    >
                                        <AppTypography
                                            textColor={theme.colors.text.primary}
                                        >
                                            {MiddleButtonTitle}
                                        </AppTypography>
                                    </ClickableTab>
                                }
                            </div>
                        }
                    </div>
                </div>
                <AppTypography
                    ellipsis
                    maxLines={2}
                >
                    {description}
                </AppTypography>
            </div>
        </>
    )
}
export default ImageCard