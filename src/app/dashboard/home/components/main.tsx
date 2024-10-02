'use client'

import History from "@/app/components/history/history"
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
import segmentFaces, { awsSegmentation, handleVideoPlay, isModelsLoaded, loadModels, videoSegmentation } from "@/utils/segmentFaces"
import { canvasTypes, checkedFaceType, FetchState, fvlconizedFaceType, logsType, occurance } from "@/utils/@types"
import checkEachFace from "@/utils/model/checkEachFace"
import generateVideoThumbnail from "@/utils/generateVideoThumbnail"
import { toast } from "react-toastify"
import { getSingleFace } from "@/utils/model/getSingleFace"
import { getImageURLFromBoundingBox } from "@/utils/getImageURLFromBoundingBox"
import useTimer from "@/utils/useTimer"

let fileEx : any = undefined

const Main = () => {
    const {
        selectedImage,
        setSelectedImage,
    } = useContext(imageUploadContext)

    const [displayMatches, setDisplayMatches] = useState(false)
    const [displayFaces, setDisplayFaces] = useState(false)
    const [fvlconizing, setFvlconizing] = useState(false)
    const [fileExtension, setFileExtension] = useState<string>()
    const [imageSrc, setImageSrc] = useState<string>()
    const [videoSrc, setVideoSrc] = useState<string>()
    const [videoTimestamp, setVideoTimestamp] = useState<number>(0)
    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false)
    const [occurance, setOccurance] = useState<occurance>()
    const [distinctFaces, setDistinctFaces] = useState<FetchState<canvasTypes[]>>({
        isEmpty : false,
        isLoading : false,
    })
    const [matchedFaces, setMatchedFaces] = useState<FetchState<checkedFaceType[]>>({
        isEmpty : false,
        isLoading : false
    })
    const imageRef = useRef<HTMLImageElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    let statelessDistinctFaces : FetchState<canvasTypes[]> = {
        isEmpty : false,
        isLoading : false,
    }
    const [logs, setLogs] = useState<logsType[]>([])
    const { seconds, start : startTimer, stop : stopTimer, reset : resetTimer, setSeconds} = useTimer();

    let imageSplit = []
    let filename = undefined

    // Sets the segmented faces to be displayed
    const setFaces = (faces : { dataUrl: string, label: string }[] | undefined, type? : 'video' | 'image') => {
        if(faces){
            if(faces.length === 0){
                if(!distinctFaces.data){
                    if(type !== 'video'){
                        statelessDistinctFaces = {isEmpty : true}
                        setDistinctFaces(prev => ({isEmpty : true}))
                    }
                } else {
                    statelessDistinctFaces = {
                        ...statelessDistinctFaces.data,
                        isLoading : false
                    }
                    setDistinctFaces(prev => ({
                        ...prev,
                        isLoading : false
                    }))
                }
                type !== 'video' && toast.error("No face detected!")
            } else {
                statelessDistinctFaces = {
                    data : faces
                }
                setDistinctFaces(prev => ({
                    data : faces
                }))   
            }   
        } else {
            setDistinctFaces(prev => ({isEmpty : true}))
        }
    }

    // Handles the segmentation of images and specific video timestamps
    const handleAnalyze = async (onlyAnalyze? : boolean) => {
        if(onlyAnalyze)
            setFvlconizing(true)
        setDisplayFaces(true)
        setDistinctFaces(prev => ({
            ...prev,
            isLoading : true,
        }))
        if(selectedImage && fileEx && imageRef.current !== null){
            if(isImageFile(fileEx)){
                const faces = await segmentFaces(selectedImage.url, setLogs)
                faces && setFaces(faces)
            } else if(isVideoFile(fileEx)){
                const thumbnail = await generateVideoThumbnail(selectedImage.url, videoTimestamp)
                thumbnail ? setImageSrc(thumbnail) : console.log("unable to generate thumbnail")
                const faces = await segmentFaces(thumbnail, setLogs)
                faces && setFaces(faces)
            } else {
                console.log("invalid file format")
                setDistinctFaces({error : "Invalid file format"})
            }
            if(onlyAnalyze)
                setFvlconizing(false)
        } else {
            setFvlconizing(false)
            setDistinctFaces({error : "No image selected"})
            console.log("No Image Selected")
        }
    }

    let facesGroupedByIndex : {
        index : number,
        content : fvlconizedFaceType[],
    }[] = []
    
    const groupFacesByIndex = (faces : fvlconizedFaceType[]) => {
        faces.map((item) => groupSingleFaceByIndex(item))
        console.log({facesGroupedByIndex})
    }

    const groupSingleFaceByIndex = (face : fvlconizedFaceType) => {
        let isIndexed = false
        facesGroupedByIndex = facesGroupedByIndex.map((item) => {
            if(item.index === face.Person.Index){
                isIndexed = true
                return {
                    index : item.index,
                    content : [...item.content, face]
                }
            } else {
                return item
            }
        })
        if(!isIndexed){
            facesGroupedByIndex.push({
                index : face.Person.Index,
                content : [face]
            })
        }
    }

    const handleFalconize = async () => {
        setMatchedFaces(prev => ({
            ...prev,
            isLoading : true
        }));
        setDisplayMatches(true);
        try {
            if(isVideoFile(fileEx) && selectedImage && selectedImage.fullFile){
                setFvlconizing(true)
                const matchedFaces =  await awsSegmentation(selectedImage!.fullFile, setLogs) //Both segmentation and fvlconizing using aws
                groupFacesByIndex(matchedFaces.results)
                if(facesGroupedByIndex){
                    const checkedFaces = await Promise.all(facesGroupedByIndex.map(async (face) => {
                        const faceMatch = face.content[0].FaceMatches[0]
                        let details : any = undefined
                        if(faceMatch)
                            details = await getSingleFace(faceMatch.Face.FaceId);
                        const boundingBox = face.content[0].Person.Face.BoundingBox
                        console.log({boundingBox})
                        const match : checkedFaceType = {
                            matchedPerson: faceMatch?.Face.ExternalImageId,
                            similarity: faceMatch?.Similarity,
                            originalImage: await getImageURLFromBoundingBox(boundingBox, await generateVideoThumbnail(selectedImage.url, face.content[0].Timestamp / 1000)),
                            matchedImage: details?.imageUrl,
                            faceid: faceMatch?.Face.FaceId,
                            occurances : face,
                            details
                        }
                        return match
                    }))
                    const flatternedCheckedFaces = checkedFaces.flat()
                    setMatchedFaces({
                        data : flatternedCheckedFaces
                    })
                    setOccurance(flatternedCheckedFaces[0].occurances)
                }
                setFvlconizing(false)
            } else {
                ImageFvlconization()
            }
        } catch (error : any) {
            console.log({error})
            toast.error(error.message)
            setFvlconizing(false)
        }
    };

    const ImageFvlconization = async () => {
        setFvlconizing(true)
        await handleAnalyze()
        setDisplayMatches(true);
        if(statelessDistinctFaces.data){
            setLogs(prev => [...prev, {log : {content : "Fvlconizing..."}, date : new Date()}])
            const faces = await checkEachFace(statelessDistinctFaces);
            setLogs(prev => [...prev, {log : {content : "Fvlconized successfully"}, date : new Date()}])
            if (faces && faces.length > 0) {
                const validFaces = faces.filter(face => face !== undefined) as checkedFaceType[];
                setMatchedFaces(prev => ({
                    data : prev.data ? [...prev.data, ...validFaces] : validFaces,
                }));
            } else {
                toast.error("No match found!")
                !matchedFaces.data && setMatchedFaces({isEmpty : true})
            }
            setFvlconizing(false)
        } else {
            setMatchedFaces({error : 'No Image Segmented'})
            setFvlconizing(false)
        }
    }

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
        statelessDistinctFaces = {
            isEmpty : false,
            isLoading : false,
        }
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
        occurance?.content[0] && setVideoTimestamp(occurance?.content[0].Timestamp / 1000)
        console.log(occurance?.content[0].Timestamp)
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
                            logs={logs}
                            setVideoTimestamp={setVideoTimestamp}
                            videoTimestamp={videoTimestamp}
                            occurances={occurance}
                            fvlconizing={fvlconizing}
                        />
                        :
                        <Flex
                            gap={15}
                        >
                            {
                                selectedImage && fileExtension && isImageFile(fileExtension) ?
                                <ImageContainer 
                                    image={selectedImage}
                                />
                                :
                                <ImageContainer />
                            }
                        </Flex>
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
                            onClick={handleAnalyze}
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