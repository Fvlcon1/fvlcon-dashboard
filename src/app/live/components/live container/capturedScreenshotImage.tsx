'use client'

import ZoomImage from "@components/zoomImage/zoomImage"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { liveComponentsContext } from "../context"
import Slidein from "@styles/components/slidein"
import { AnimatePresence, motion } from 'framer-motion';
import Image from "next/image"

const CapturedScreenshotImage = () => {
    const [showZoom, setShowZoom] = useState(false)
    const [showScreenshot, setShowScreenhot] = useState(false)
    const {screenShotUrl, setScreenShotUrl} = useContext(liveComponentsContext)
    const [screenShotHover, setScreenshotHover] = useState(false)

    useEffect(()=>{
        if(screenShotUrl){
            setShowScreenhot(true)
            setTimeout(() => {
                !screenShotHover && setShowScreenhot(false)
                !showZoom && !screenShotHover && setScreenShotUrl(undefined)
            }, 5000);
        }
    },[screenShotUrl])

    useEffect(()=>{
        if(!showZoom && screenShotUrl)
            setScreenShotUrl(undefined)
    },[showZoom])

    useEffect(()=>{
        if(!screenShotHover){
            setShowScreenhot(false)
            !showZoom && setScreenShotUrl(undefined)
        }
    },[screenShotHover])
    return (
        <>
            <ZoomImage 
                show={showZoom}
                setShow={setShowZoom}
                imageURL={screenShotUrl ?? ''}
            />
            <AnimatePresence>
                {
                    showScreenshot &&
                    <motion.div 
                        initial={{opacity : 0}}
                        animate={{opacity : 1}}
                        exit={{opacity : 0}}
                        transition={{duration : 1.5}}
                        className="fixed w-[150px] h-[150px] z-10 cursor-pointer shadow-xl overflow-hidden rounded-lg bg-bg-tetiary bottom-[15px] right-[80px]"
                        onClick={()=>setShowZoom(true)}
                        onMouseOver={()=>setScreenshotHover(true)}
                        onMouseLeave={()=>setScreenshotHover(false)}
                    >
                        <Image 
                            alt="screenshot iamge"
                            src={screenShotUrl ?? ''}
                            fill
                            className="duration-300 object-cover cursor-pointer hover:scale-[1.2]"
                        />
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}
export default CapturedScreenshotImage