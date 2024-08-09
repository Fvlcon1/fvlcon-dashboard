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
import ImageContainer from "./imageContainer"

const MatchCard = ({
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
            className="p-3 py-3 min-w-[400px] w-[400px] flex flex-col gap-1 rounded-2xl bg-gradient-container-black"
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
                onMouseOver={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
                className="relative"
            >
                <Flex
                    justify="space-between"
                >
                    <ImageContainer />
                    <ImageContainer 
                        MiddleButtonTitle="Analyze ➜"
                    />
                </Flex>
                <div className="w-[60px] h-[60px] bg-[#00000063] p-[6px] backdrop-filter backdrop-blur-lg rounded-full absolute top-[30%] left-[42%] ">
                    <div className="w-full h-full bg-bg-primary rounded-full flex justify-center items-center ">
                        <AppTypography
                            textColor={theme.colors.text.primary}
                            bold={TypographyBold.md}
                        >
                            80%
                        </AppTypography>
                    </div>
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
export default MatchCard