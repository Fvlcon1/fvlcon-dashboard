import { RefObject, useContext, useEffect } from "react"
import { HomeContext } from "../context/homeContext"
import { imageUploadContext } from "@/context/imageUpload"
import { isImageFile, isVideoFile } from "@/utils/getFileType"
import segmentFaces, { awsSegmentation } from "@/utils/segmentFaces"
import generateVideoThumbnail from "@/utils/generateVideoThumbnail"
import { message } from "antd"
import { canvasTypes, checkedFaceType, FetchState, fvlconizedFaceType } from "@/utils/@types"
import checkEachFace from "@/utils/model/checkEachFace"
import { groupSingleFaceByIndex } from "./groupSingleFaceByIndex"
import { getSingleFace } from "@/utils/model/getSingleFace"
import { getImageURLFromBoundingBox } from "@/utils/getImageURLFromBoundingBox"
import useActivityStorage from "./useActivityStorage"
import { protectedAPI, unprotectedAPI } from "@/utils/api/api"
import axios from "axios"
import { nanoid } from 'nanoid';
import useTimer from "@/utils/useTimer"


let statelessDistinctFaces : FetchState<canvasTypes[]> = {
    isEmpty : false,
    isLoading : false,
}

let facesGroupedByIndex : {
    index : number,
    content : fvlconizedFaceType[],
}[] = []

const privateApi = new protectedAPI()
const publicApi = new unprotectedAPI()

export const useAnalysis = (imageRef: RefObject<HTMLImageElement>) => {
    const {
        setFvlconizing,
        setDisplayFaces,
        setDistinctFaces,
        fileExtension,
        distinctFaces,
        setLogs,
        videoTimestamp,
        setImageSrc,
        setDisplayMatches,
        setMatchedFaces,
        matchedFaces,
        setOccurance,
        fvlconizing
    } = useContext(HomeContext)
    
    const {
        selectedImage,
        setSelectedImage,
    } = useContext(imageUploadContext)

    const {storeFvlcoinzationResults} = useActivityStorage()
    const { seconds, start : startTimer, stop : stopTimer} = useTimer();

    useEffect(()=>{
        if(fvlconizing){
            startTimer()
        } else {
            stopTimer()
        }
    },[fvlconizing])

    // Handles the segmentation of images and specific video timestamps
    const handleAnalyze = async (onlyAnalyze? : boolean) => {
        if(onlyAnalyze)
            setFvlconizing(true)
        setDisplayFaces(true)
        setDistinctFaces(prev => ({
            ...prev,
            isLoading : true,
        }))
        if(selectedImage && fileExtension && imageRef.current !== null){
            if(isImageFile(fileExtension)){
                const faces = await segmentFaces(selectedImage.url, setLogs)
                faces && setFaces(faces)
            } else if(isVideoFile(fileExtension)){
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
                type !== 'video' && message.error("No face detected!")
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

    const ImageFvlconization = async () => {
        interface faceDetailsType {
            uploadImageS3key?: string;
            matchedFaceId: string;
            accuracy: number;
            status : "successful" | "failed"
        }
        setFvlconizing(true)
        await handleAnalyze()
        setDisplayMatches(true);
        if(statelessDistinctFaces.data){
            setLogs(prev => [...prev, {log : {content : "Fvlconizing..."}, date : new Date()}])
            const faces = await checkEachFace(statelessDistinctFaces);
            setLogs(prev => [...prev, {log : {content : "Fvlconized successfully"}, date : new Date()}])
            if (faces && faces.length > 0) {
                const filteredFaces = faces.filter((face) => face !== undefined)
                
                    const faceDetails : faceDetailsType[] = await Promise.all(filteredFaces.map(async (face) => {
                        try {
                            const uniqueFileName = `${nanoid()}-${new Date().toISOString()}`;
                            const uploadUrl = await privateApi.get("/fvlconizationLogs/getUploadPresignedUrl", {filename : uniqueFileName})
                            if(uploadUrl?.data){
                                console.log({url : uploadUrl.data})
                                const uploadImage = await axios.put(uploadUrl.data, face?.originalImage)
                                console.log({uploadImage})
                                return {
                                    segmentedImageS3key : uniqueFileName,
                                    matchedFaceId : face?.details?.FaceId ?? '',
                                    accuracy : face?.similarity ?? 0,
                                    status : "successful"
                                }
                            } else {
                                console.error("Unable to get upload url")
                                message.warning("Unable to add logs")
                                return {
                                    segmentedImageS3key : "",
                                    matchedFaceId : face?.details?.FaceId ?? '',
                                    accuracy : face?.similarity ?? 0,
                                    status : "successful"
                                }
                            }
                        } catch (error) {
                            console.log({error})
                            message.error("Unable to add logs")
                            return {
                                matchedFaceId : face?.details?.FaceId ?? '',
                                accuracy : face?.similarity ?? 0,
                                status : "failed"
                            }
                        }
                    }))
                    if(faceDetails){
                        const validFaces = faces.filter(face => face !== undefined) as checkedFaceType[];
                        try {
                            const uploadImageFilename = `${nanoid()}-${new Date().toISOString()}`;
                            const uploadUrl = await privateApi.get("/fvlconizationLogs/getUploadPresignedUrl", {filename : uploadImageFilename})
                            if(uploadUrl?.data){
                                console.log({url : uploadUrl.data})
                                const uploadImage = await axios.put(uploadUrl.data, selectedImage?.fullFile)
                                console.log({uploadImage})
                                if(uploadImage.status !== 200){
                                    console.log("Unable to upload 'Upload image'")
                                    message.error("Error storing logs")
                                }
                                setMatchedFaces({data : validFaces})
                                storeFvlcoinzationResults({
                                    uploadedImageS3key : uploadImageFilename,
                                    media : faceDetails,
                                    timeElapsed : seconds,
                                    status : "successful",
                                    type : "image"
                                })
                            }
                        } catch (error) {
                            console.log(error)
                            message.error("Error storing logs")
                        }
                    }
            } else {
                message.error("No match found!")
                !matchedFaces.data && setMatchedFaces({isEmpty : true})
            }
            setFvlconizing(false)
        } else {
            setMatchedFaces({error : 'No Image Segmented'})
            setFvlconizing(false)
        }
    }

    const groupFacesByIndex = (faces : fvlconizedFaceType[]) => {
        faces.map((item) => groupSingleFaceByIndex(item, facesGroupedByIndex))
    }

    const getResultsContainingFaceMatches = (results : fvlconizedFaceType[]) => {
        for(let item of results){
            if(item.FaceMatches.length > 0)
                return item
        }
    }

    const handleFalconize = async () => {
        setMatchedFaces(prev => ({
            ...prev,
            isLoading : true
        }));
        setDisplayMatches(true);
        try {
            if(fileExtension ? isVideoFile(fileExtension) : false && selectedImage && selectedImage?.fullFile){
                setFvlconizing(true)
                const matchedFaces =  await awsSegmentation(selectedImage!.fullFile, setLogs) //Both segmentation and fvlconizing using aws
                if(!matchedFaces){
                    setFvlconizing(false)
                    return setMatchedFaces({error : "Error fvlconizing video"})
                }
                groupFacesByIndex(matchedFaces.results)  //Categorized faces by index
                if(facesGroupedByIndex){
                    const checkedFaces = await Promise.all(facesGroupedByIndex.map(async (face) => {
                        const resultsContainingFacesMatches = getResultsContainingFaceMatches(face.content) // gets a single item in the category which has a face match
                        const faceMatch = resultsContainingFacesMatches?.FaceMatches[0]
                        let details : any = undefined
                        if(faceMatch)
                            details = await getSingleFace(faceMatch.Face.FaceId);
                        const boundingBox = (resultsContainingFacesMatches ?? face.content[0]).Person.Face.BoundingBox
                        const match : checkedFaceType = {
                            matchedPerson: faceMatch?.Face.ExternalImageId,
                            similarity: faceMatch?.Similarity,
                            originalImage: selectedImage ? await getImageURLFromBoundingBox(boundingBox, await generateVideoThumbnail(selectedImage.url, (resultsContainingFacesMatches ?? face.content[0]).Timestamp / 1000)) : '',
                            matchedImage: details?.imageUrl,
                            faceid: faceMatch?.Face.FaceId,
                            occurances : face,
                            details
                        }
                        return match
                    }))
                    setMatchedFaces({ data : checkedFaces })
                    setOccurance(checkedFaces[0].occurances)
                }
                setFvlconizing(false)
            } else {
                ImageFvlconization()
            }
        } catch (error : any) {
            console.log({error})
            message.error(error.message)
            setFvlconizing(false)
        }
    };

    return {handleAnalyze, handleFalconize}
}
