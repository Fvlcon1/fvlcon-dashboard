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
import { canvasTypes, checkedFaceType, FetchState } from "@/utils/@types"
import checkEachFace from "@/utils/model/checkEachFace"
import generateVideoThumbnail from "@/utils/generateVideoThumbnail"
import { toast } from "react-toastify"
import { getSingleFace } from "@/utils/model/getSingleFace"
import { getImageURLFromBoundingBox } from "@/utils/getImageURLFromBoundingBox"
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
                    data : statelessDistinctFaces.data ? 
                    [...statelessDistinctFaces.data, ...faces] : faces
                }
                setDistinctFaces(prev => ({
                    data : prev.data ? [...prev.data, ...faces] : faces
                }))   
            }   
        } else {
            setDistinctFaces(prev => ({isEmpty : true}))
        }
    }

    const handleAnalyze = async (timestamp? : number) => {
        setDisplayFaces(true)
        setDistinctFaces(prev => ({
            ...prev,
            isLoading : true,
        }))
        if(selectedImage && fileEx && imageRef.current !== null){
            if(isImageFile(fileEx)){
                const faces = await segmentFaces(selectedImage.url)
                faces && setFaces(faces)
            } else if(isVideoFile(fileEx)){
                const thumbnail = await generateVideoThumbnail(selectedImage.url, timestamp ?? videoTimestamp)
                thumbnail ? setImageSrc(thumbnail) : console.log("unable to generate thumbnail")
                const faces = await segmentFaces(thumbnail)
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
        setMatchedFaces(prev => ({
            ...prev,
            isLoading : true
        }));
        setDisplayMatches(true);
        if(isVideoFile(fileEx) && selectedImage && selectedImage.fullFile){
            const matchedFaces =  await awsSegmentation(selectedImage!.fullFile)
            const faces = getMatchedFaces(matchedFaces.results)
            if (faces.length > 0) {
                const checkedFaces = await Promise.all(faces.map(async (face: any) => {
                    const faceMatches = await Promise.all(face.FaceMatches.map(async (faceMatch: any) => {
                        const details = await getSingleFace(faceMatch.Face.FaceId);
                        const match = {
                            matchedPerson: faceMatch.Face.ExternalImageId,
                            similarity: faceMatch.Similarity,
                            originalImage: await getImageURLFromBoundingBox(faceMatch.Face.BoundingBox, await generateVideoThumbnail(selectedImage.url, face.Timestamp)),
                            matchedImage: details.imageUrl,
                            faceid: faceMatch.Face.FaceId
                        }
                        return match
                    }));
                    return faceMatches;  // Return the face matches to flatten them into the larger array
                }));
                const flatternedCheckedFaces = checkedFaces.flat()
                setMatchedFaces({
                    data : flatternedCheckedFaces
                })
            }
        } else {
            manualFalconize()
        }
    };

    const getMatchedFaces = (matchedFaces : any) => {
        const matchedIndices : number[] = []
        const faces = matchedFaces.map((item : any, index : number) => {
            if(item.FaceMatches.length > 0){
                return item
            }
        })
        const filteredUndefined =  faces.filter((item : any) => item !== undefined)
        const filterAlreadyExistingIndex = filteredUndefined.filter((item : any) => {
            if(matchedIndices.includes(item.Person.index) === false){
                matchedIndices.push(item.Person.index)
                return true
            }
        })
        return filterAlreadyExistingIndex
    }

    const manualFalconize = async () => {
        await handleAnalyze()
        setDisplayMatches(true);
        if(statelessDistinctFaces.data){
            const faces = await checkEachFace(statelessDistinctFaces);
            if (faces && faces.length > 0) {
                const validFaces = faces.filter(face => face !== undefined) as checkedFaceType[];
                setMatchedFaces(prev => ({
                    data : prev.data ? [...prev.data, ...validFaces] : validFaces,
                }));
            } else {
                toast.error("No match found!")
                !matchedFaces.data && setMatchedFaces({isEmpty : true})
            }
        } else {
            setMatchedFaces({error : 'No Image Selected'})
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

    useEffect(() => {
        const startSegmentation = setInterval(() => {
            if(!isVideoPlaying)
                return clearInterval(startSegmentation)
            getVideoSegments()
        }, 1000);
        return () => clearInterval(startSegmentation);
      }, [isVideoPlaying]);

    const handleVideoState = (state : boolean) => {
        if(state)
            !displayFaces && setDisplayFaces(true)
        setIsVideoPlaying(state)
        handleVideoPlay(videoRef.current, videoTimestamp, state)
    }

    const getVideoSegments = async () => {
        const segments = await videoSegmentation(videoRef.current, videoTimestamp, statelessDistinctFaces.data)
        setFaces(segments ?? [], 'video')
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