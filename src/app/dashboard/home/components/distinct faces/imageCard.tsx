'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import { MdDelete } from "react-icons/md"
import { imageUploadContext } from "@/context/imageUpload"
import { hexOpacity } from "@/utils/hexOpacity"
import { TypographyBold, TypographySize } from "@styles/style.types"
import ClickableTab from "@components/clickable/clickabletab"
import Angels from "./angles"

const ImageCard = ({
    title,
    rightButtonTitle,
    rightButtonClick,
    MiddleButtonTitle,
    MiddleButtonClick,
    description,
    imageURL
} : {
    imageURL? : string
    title? : string,
    rightButtonTitle? : string,
    rightButtonClick? : ()=> void,
    MiddleButtonTitle? : string,
    MiddleButtonClick? : ()=> void
    description? : string
}) => {
    const [hover, setHover] = useState(false)
    return (
        <div 
            className="p-3 py-3 min-w-[200px] w-[200px] flex flex-col gap-1 rounded-2xl bg-gradient-container-black"
        >
            <Flex
                justify="space-between"
                align="center"
            >
                {
                    title &&
                    <div className="py-[2px] px-3 bg-bg-secondary rounded-lg">
                        <div className="mt-[-1px]">
                            <AppTypography
                                textColor={theme.colors.text.primary}
                            >
                                {title && `• ${title}`}
                            </AppTypography>
                        </div>
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
            </Flex>
            <div 
                className="w-full rounded-lg bg-bg-tetiary p-2 cursor-pointer"
                onMouseOver={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
            >
                <div className="w-[full] relative h-[150px] rounded-md bg-bg-primary flex justify-center items-center overflow-hidden">
                    <Image 
                        src={imageURL ?? require('@/assets/dev/image1.png')}
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
                            onClick={MiddleButtonClick}
                        >
                            {
                                hover &&
                                <ClickableTab className={`hover:!bg-[#00000040]`}>
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
    )
}
export default ImageCard