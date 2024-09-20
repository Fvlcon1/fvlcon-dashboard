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
import ImageContainer from "./imageContainer"
import NoMatchFound from "./noMatchFound"
import { FaExpand } from "react-icons/fa6"
import ExpandMatch from './expandMatch';
import { TbListDetails } from "react-icons/tb"

const MatchCard = ({
    title,
    originalImage,
    matchedImage,
    similarity,
    rightButtonClick,
    MiddleButtonTitle,
    MiddleButtonClick,
    showExpand,
    description,
    imageURL
} : {
    imageURL? : string
    originalImage : string
    matchedImage? : string
    similarity? : number
    title? : string,
    rightButtonClick? : ()=> void,
    MiddleButtonTitle? : string,
    MiddleButtonClick? : ()=> void
    description? : string,
    showExpand? : boolean
}) => {
    const [hover, setHover] = useState(false)
    const [expand, setExpand] = useState(false)
    return (
        <>
            <ExpandMatch 
                match={{
                    matchedImage,
                    originalImage,
                    similarity,
                    matchedPerson : description
                }}
                display={expand}
                setDisplay={setExpand}
            />
            <div 
                className="p-3 py-3 min-w-[400px] w-[400px] h-fit flex flex-col gap-1 rounded-2xl bg-gradient-container-black"
                onClick={showExpand ? ()=>setExpand(true) : ()=>{}}
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
                        showExpand !== false &&
                        <ClickableTab
                            onClick={()=>setExpand(true)}
                        >
                            <div className="hover:opacity-100 opacity-70 gap-1 flex items-center hover:scale-[0.98] duration-200 cursor-pointer">
                                <TbListDetails 
                                    color={theme.colors.text.primary}
                                    size={14}
                                />
                                <AppTypography
                                    textColor={theme.colors.text.primary}
                                >
                                    More Details...
                                </AppTypography>
                            </div>
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
                        <ImageContainer 
                            imageURL={originalImage}
                        />
                        {
                            matchedImage ?
                            <ImageContainer
                                imageURL={matchedImage}
                            />
                            :
                            <NoMatchFound />
                        }
                    </Flex>
                    <div className="w-[60px] h-[60px] bg-[#00000063] p-[6px] backdrop-filter backdrop-blur-lg rounded-full absolute top-[30%] left-[42%] ">
                        <div className="w-full h-full bg-bg-primary rounded-full flex justify-center items-center ">
                            {
                                similarity ?
                                <AppTypography
                                    textColor={theme.colors.text.primary}
                                    bold={TypographyBold.md}
                                >
                                    {parseFloat(similarity?.toFixed(1))}%
                                </AppTypography>
                                :
                                <AppTypography>
                                    N/A
                                </AppTypography>
                            }
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
        </>
    )
}
export default MatchCard