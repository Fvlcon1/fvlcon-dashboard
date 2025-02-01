'use client'

import History from "@/app/dashboard/home/components/history/history"
import ImageContainer from "@components/imageContainer/imageContainer"
import { imageUploadContext } from "@/context/imageUpload"
import Button from "@components/button/button"
import Flex from "@styles/components/flex"
import { useContext, useEffect, useRef, useState } from "react"
import { RiOrganizationChart } from "react-icons/ri"
import DistinctFaces from "./distinct faces/distinctFaces"
import Logs from "./logs/logs"
import Matches from "./matches/matches"
import Metadata from "./metadata"
import { isImageFile, isVideoFile } from "@/utils/getFileType"
import VideoContainer from "@components/video container/videoContainer"
import useTimer from "@/utils/useTimer"
import { HomeContext } from "../context/homeContext"
import { useAnalysis } from "../utils/analysis/useAnalysis"

let fileEx : any = undefined

const Main = () => {
    const {
        selectedImage,
        setSelectedImage,
    } = useContext(imageUploadContext)

    const {
        setVideoSrc,
        setImageSrc,
        setDistinctFaces,
        setMatchedFaces,
        setDisplayFaces,
        setDisplayMatches,
        setFileExtension,
        fvlconizing,
        occurance,
        setVideoTimestamp,
        setSeekVideoTimestamp,
        imageSrc,
        videoSrc,
        fileExtension,
        displayMatches,
        displayFaces,
        logs,
        setLogs,
        setOccurance,
        distinctFaces,
        matchedFaces,
        setTimer
    } = useContext(HomeContext)

    const imageRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { seconds, start : startTimer, stop : stopTimer, reset : resetTimer, setSeconds} = useTimer();

    const {
        handleAnalyze,
        handleFalconize
    } = useAnalysis(imageRef)

    let imageSplit = []
    let filename = undefined

    const changeImageRef = async () => {
        if(selectedImage && fileEx){
            if(isVideoFile(fileEx)){
                setVideoSrc(selectedImage.url)
            }
            if(isImageFile(fileEx))
                setImageSrc(selectedImage.url)
        }
    }

    const clearDistinctFaces = () => {
        setDistinctFaces({
            isEmpty : false,
            isLoading : false,
        })
    }
    
    const clearMatchedFaces = () => {
        setMatchedFaces({
            isEmpty : false,
            isLoading : false,
        })
    }
    
    const closeDistinctFaces = () => {
        setDisplayFaces(false)
    }

    const closeMatchedFaces = () => {
        setDisplayMatches(false)
    }
    useEffect(()=> {
        if(selectedImage){
            imageSplit = selectedImage.name.split('.')
            filename = imageSplit[0]
            fileEx = imageSplit[imageSplit.length - 1] 
            changeImageRef()
            setFileExtension(fileEx)
        }
    },[selectedImage])
      
    useEffect(()=>{
        if(fvlconizing){
            startTimer()
        } else {
            stopTimer()
        }
    },[fvlconizing])

    useEffect(()=>{
        setTimer(seconds)
    },[seconds])

    useEffect(()=>{
        if(occurance?.content[0]){
            setVideoTimestamp(occurance?.content[0].Timestamp / 1000)
            setSeekVideoTimestamp(occurance?.content[0].Timestamp / 1000)
        }
    },[occurance])

    return (
        <div  className="w-full items-center flex flex-col flex-1 h-[100vh] pb-4 gap-1">
            <img ref={imageRef} className="hidden" src={imageSrc}/>
            <div className="w-full flex justify-center items-center relative">
                <video ref={videoRef} height={320} width={560} src={videoSrc} hidden muted/>
            </div>
            <Flex
                direction="column"
                gap={3}
                maxWidth="1080px"
            >
                <div className="w-full relative bg-gradient-container h-fit rounded-2xl p-4">
                    {
                        selectedImage && fileExtension && isVideoFile(fileExtension) ?
                        <VideoContainer 
                            video={selectedImage}
                        />
                        : selectedImage && fileExtension && isImageFile(fileExtension) ?
                        <Flex
                            gap={15}
                        >
                                <ImageContainer 
                                    image={selectedImage}
                                />
                        </Flex>
                        :
                        <ImageContainer />
                    }
                </div>
                <Flex
                    padding="0 18px"
                    direction="column"
                    gap={12}
                >
                    <Flex 
                        width="fit-content"
                    >
                        <Button 
                            text="Segment"
                            icon={<RiOrganizationChart className="mt-[-1px]"/>}
                            onClick={()=>handleAnalyze(true)}
                        />
                        <Button 
                            text="Fvlconize ➜"
                            onClick={handleFalconize}
                            disabled={fvlconizing}
                        />
                    </Flex>
                    <Flex>
                        {
                            (displayMatches || displayFaces) &&
                            <Logs 
                                logs={logs}
                                setLogs={setLogs}
                                time={{
                                    seconds
                                }}
                                fvlconizing={fvlconizing}
                            />
                        }
                        {
                            selectedImage &&
                            <Metadata />
                        }
                    </Flex>
                    {
                        displayFaces &&
                        <DistinctFaces 
                            faces={distinctFaces}
                            onTryAgain={handleAnalyze}
                            onClear={clearDistinctFaces}
                            onClose={closeDistinctFaces}
                            currentOccurance={occurance}
                            setOccurance={setOccurance}
                        />
                    }
                    {
                        displayMatches &&
                        <Matches 
                            faces={matchedFaces}
                            onTryAgain={handleFalconize}
                            onClear={clearMatchedFaces}
                            onClose={closeMatchedFaces}
                            currentOccurance={occurance}
                            setOccurance={setOccurance}
                        />
                    }
                    <History />
                </Flex>
            </Flex>
        </div>
    )
}
export default Main