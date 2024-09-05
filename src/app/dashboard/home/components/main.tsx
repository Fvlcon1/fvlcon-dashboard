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
import segmentFaces, { handleVideoPlay, isModelsLoaded, loadModels, videoSegmentation } from "@/utils/segmentFaces"
import { canvasTypes, checkedFaceType, FetchState } from "@/utils/@types"
import checkEachFace from "@/utils/model/checkEachFace"
import generateVideoThumbnail from "@/utils/generateVideoThumbnail"
let fileEx : any = undefined

const Main = () => {
    const {
        selectedImage,
        setSelectedImage,
    } = useContext(imageUploadContext)

    const [displayMatches, setDisplayMatches] = useState(false)
    const [displayFaces, setDisplayFaces] = useState(false)
    const [fileExtension, setFileExtension] = useState<string>()
    const [imageSrc, setImageSrc] = useState<string>()
    const [videoSrc, setVideoSrc] = useState<string>()
    const [videoTimestamp, setVideoTimestamp] = useState<number>(0)
    const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false)
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

    let imageSplit = []
    let filename = undefined

    const setFaces = (faces : { dataUrl: string, label: string }[] | undefined) => {
        if(faces){
            if(faces.length === 0){
                setDistinctFaces({isEmpty : true})
            } else {
                statelessDistinctFaces = {data : faces}
                setDistinctFaces({data : faces})   
            }   
        } else {
            setDistinctFaces({isEmpty : true})
        }
    }

    const handleAnalyze = async () => {
        setDistinctFaces({isLoading : true})
        setDisplayFaces(true)
        if(selectedImage && fileEx && imageRef.current !== null){
            console.log(selectedImage)
            console.log({fileExtension})
            if(isImageFile(fileEx)){
                const faces = await segmentFaces(selectedImage.url, imageRef)
                faces && setFaces(faces)
            } else if(isVideoFile(fileEx)){
                const thumbnail = await generateVideoThumbnail(selectedImage.url, videoTimestamp)
                thumbnail ? setImageSrc(thumbnail) : console.log("unable to generate thumbnail")
                const faces = await segmentFaces(thumbnail, imageRef)
                faces && setFaces(faces)
            } else {
                console.log("invalid file format")
                setDistinctFaces({error : "Invalid file format"})
            }
        } else {
            setDistinctFaces({error : "No image selected"})
            console.log("No Image Selected")
        }
    }

    const handleFalconize = async () => {
        setMatchedFaces({isLoading : true})
        await handleAnalyze()
        setDisplayMatches(true);
        if(statelessDistinctFaces.data){
            const faces = await checkEachFace(statelessDistinctFaces);
            if (faces && faces.length > 0) {
                const validFaces = faces.filter(face => face !== undefined) as checkedFaceType[];
                setMatchedFaces({data : validFaces});
            } else {
                setMatchedFaces({isEmpty : true})
            }
        } else {
            setMatchedFaces({error : 'No Image Selected'})
        }
    };

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
        console.log(selectedImage)
        if(selectedImage){
            imageSplit = selectedImage.name.split('.')
            filename = imageSplit[0]
            fileEx = imageSplit[imageSplit.length - 1] 
            changeImageRef()
            setFileExtension(fileEx)
        }
    },[selectedImage])

    useEffect(() => {
        const startSegmentation = setInterval(() => {
            if(!isVideoPlaying)
                return clearInterval(startSegmentation)
            getVideoSegments()
        }, 500);
        return () => clearInterval(startSegmentation);
      }, [isVideoPlaying]);

    const handleVideoState = (state : boolean) => {
        setIsVideoPlaying(state)
        handleVideoPlay(videoRef.current, videoTimestamp, state)
    }

    const getVideoSegments = async () => {
        const segments = await videoSegmentation(videoRef.current, videoTimestamp, distinctFaces.data)
        const combinedFaces = (distinctFaces.data && segments)
            ? [...distinctFaces.data, ...segments] 
            : distinctFaces.data ? distinctFaces.data
            : segments ?? []
        setFaces(combinedFaces)
    }
      

    return (
        <div  className="w-full items-center flex flex-col flex-1 h-[100vh] pb-4 gap-1">
            <img ref={imageRef} className="hidden" src={imageSrc}/>
            <div className="w-full flex justify-center items-center relative">
                <video ref={videoRef} height={320} width={560} src={videoSrc} hidden muted/>
            </div>
            <Flex
                direction="column"
                gap={4}
                maxWidth="1080px"
            >
                <div className="w-full bg-gradient-container h-[500px] rounded-2xl p-4">
                    {
                        selectedImage && fileExtension && isVideoFile(fileExtension) ?
                        <VideoContainer 
                            video={selectedImage}
                            setVideoTimestamp={setVideoTimestamp}
                            onPlay={()=>handleVideoState(true)}
                            onPause={()=>handleVideoState(false)}
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
                    margin="-120px 0 0 0"
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
                        />
                    </Flex>
                    <Flex>
                        {/* {
                            displayMatches &&
                            <Logs />
                        } */}
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
                        />
                    }
                    {
                        displayMatches &&
                        <Matches 
                            faces={matchedFaces}
                            onTryAgain={handleFalconize}
                            onClear={clearMatchedFaces}
                            onClose={closeMatchedFaces}
                        />
                    }
                    <History />
                </Flex>
            </Flex>
        </div>
    )
}
export default Main