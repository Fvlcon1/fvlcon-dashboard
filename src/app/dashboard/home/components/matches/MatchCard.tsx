'use client'

import React, { Dispatch, SetStateAction, useEffect } from "react"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import Image from "next/image"
import { useState } from "react"
import { TypographyBold, TypographySize } from "@styles/style.types"
import ClickableTab from "@components/clickable/clickabletab"
import ImageContainer from "./imageContainer"
import NoMatchFound from "./noMatchFound"
import { FaExpand } from "react-icons/fa6"
import ExpandMatch from './expandMatch';
import { TbListDetails } from "react-icons/tb"
import { fvlconizedFaceType, occurance } from '../../../../../utils/@types';
import NiaRecord from "@components/records/NIA record/niaRecord"
import ZoomImage from "@components/zoomImage/zoomImage"
import { RiFullscreenFill } from "react-icons/ri"
import { LuSwitchCamera } from "react-icons/lu"

const MatchCard = ({
    title,
    matchedImage,
    similarity,
    rightButtonClick,
    MiddleButtonTitle,
    MiddleButtonClick,
    showExpand,
    description,
    croppedImage,
    boundedImage,
    details,
    occurances,
    currentOccurance,
    setOccurance
} : {
    croppedImage : string
    boundedImage : string
    matchedImage? : string
    similarity? : number
    title? : string,
    rightButtonClick? : ()=> void,
    MiddleButtonTitle? : string,
    MiddleButtonClick? : ()=> void
    description? : string,
    showExpand? : boolean,
    details? : any
    occurances?: occurance
    currentOccurance?: occurance
    setOccurance: Dispatch<SetStateAction<occurance | undefined>>
}) => {
    const [hover, setHover] = useState(false)
    const [expand, setExpand] = useState(false)
    const [showBoundedImage, setShowBoundedImage] = useState(false)
    const [showZoomImage, setShowZoomImage] = useState(false)
    const [componentHover, setComponentHover] = useState(false)

    const getSelectedOccurenceClass = () => {
        if(occurances && currentOccurance)
            if(occurances.index === currentOccurance.index)
                return 'border-[#3780ff60] shadow-lg border-dotted border-[3px]  duration-200'
    }
    useEffect(()=>{
        console.log({occ1 : currentOccurance, occ2 : occurances})
    },[currentOccurance])
    useEffect(()=>{
        console.log({details})
    },[])
    return (
        <>
            {/* <ExpandMatch 
                match={{
                    matchedImage,
                    originalImage,
                    similarity,
                    matchedPerson : description,
                    details
                }}
                display={expand}
                setDisplay={setExpand}
                currentOccurance={currentOccurance}
                setOccurance={setOccurance}
            /> */}
            <ZoomImage
                show={showZoomImage}
                setShow={setShowZoomImage}
                imageURL={showBoundedImage ? boundedImage : croppedImage}
            />
            <NiaRecord 
                visible={expand}
                setVisible={setExpand}
                data={details}
            />
            <div 
                className={`p-2 py-1 min-w-[400px] cursor-pointer w-[400px] h-fit flex flex-col gap-1 rounded-lg bg-gradient-container-black ${getSelectedOccurenceClass() ?? ''}`}
                onClick={()=>setOccurance(occurances)}
                onMouseOver={()=>setComponentHover(true)}
                onMouseLeave={()=>setComponentHover(false)}
            >
                <Flex
                    justify="space-between"
                    align="center"
                >
                    {
                        title &&
                        <AppTypography
                            textColor={theme.colors.text.secondary}
                        >
                            {title && `• ${title}`}
                        </AppTypography>
                    }
                    <div className="flex items-center gap-1">
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
                        {
                            showExpand !== false &&
                            <div
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setExpand(true)
                                }}
                            >
                                <AppTypography
                                    textColor='royalblue'
                                    className="hover:!underline hover:!scale-80 cursor-pointer hover:!opacity-60 !opacity-80"
                                >
                                    More details..
                                </AppTypography>
                            </div>
                        }
                    </div>
                </Flex>
                <div
                    onMouseOver={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                    className={`relative`}
                >
                    <Flex
                        justify="space-between"
                    >
                        <ImageContainer 
                            imageURL={showBoundedImage ? boundedImage : croppedImage}
                            onClick={e=>e.stopPropagation()}
                        />
                        {
                            matchedImage ?
                            <ImageContainer
                                imageURL={matchedImage}
                                onClick={e=>e.stopPropagation()}
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