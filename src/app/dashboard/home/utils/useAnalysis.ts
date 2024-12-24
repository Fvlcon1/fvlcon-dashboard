import { RefObject, useContext, useEffect, useState } from "react"
import { HomeContext } from "../context/homeContext"
import { imageUploadContext } from "@/context/imageUpload"
import { isImageFile, isVideoFile } from "@/utils/getFileType"
import segmentFaces, { awsSegmentation } from "@/utils/segmentFaces"
import generateVideoThumbnail from "@/utils/generateVideoThumbnail"
import { message } from "antd"
import { canvasTypes, checkedFaceType, FetchState, fvlconizedFaceType, occurance } from "@/utils/@types"
import checkEachFace from "@/utils/model/checkEachFace"
import { getSingleFace } from "@/utils/model/getSingleFace"
import { getImageURLFromBoundingBox } from "@/utils/getImageURLFromBoundingBox"
import useActivityStorage from "./useActivityStorage"
import { protectedAPI, unprotectedAPI } from "@/utils/api/api"
import axios from "axios"
import { nanoid } from 'nanoid';
import useTimer from "@/utils/useTimer"
import { dataURLToBlob } from "./dataUrlToBlob"
import { convertDataUrlToJpeg } from "./convertToJpeg"


let statelessDistinctFaces : FetchState<canvasTypes[]> = {
    isEmpty : false,
    isLoading : false,
}

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
        fvlconizing,
        timer
    } = useContext(HomeContext)
    
    const {
        selectedImage,
        setSelectedImage,
    } = useContext(imageUploadContext)

    const {storeFvlcoinzationResults, storeSegmentationResults} = useActivityStorage()

    const uploadSegmentedImages = async () : Promise<{segmentedImageS3key : string, status : string}[] | undefined> => {
        const filteredData = statelessDistinctFaces.data?.filter((item) => item !== undefined )
        if(!filteredData)
            return undefined
        return await Promise.all(
            filteredData?.map(async (face, index) => {
                try {
                    const uniqueFileName = `${nanoid()}-${new Date().toISOString()}`;
                    const uploadUrl = await privateApi.get("/segmentationLogs/getUploadPresignedUrl", {filename : uniqueFileName})
                    if(uploadUrl?.data){
                        const imageJpeg = await convertDataUrlToJpeg(face.dataUrl)
                        const fileToUpload = dataURLToBlob(imageJpeg)
                        const uploadImage = await axios.put(uploadUrl.data, fileToUpload)
                        return {
                            segmentedImageS3key : uniqueFileName,
                            status : "successful"
                        }
                    } else {
                        console.error("Unable to get upload url")
                        message.warning("Unable to add logs")
                        return {
                            segmentedImageS3key : "",
                            status : "successful"
                        }
                    }
                } catch (error) {
                    console.log({error})
                    message.error("Unable to add logs")
                    return {
                        segmentedImageS3key : "",
                        status : "failed"
                    }
                }
            })
        )
    }

    const uploadSelectedImage = async (url : string) : Promise<string | undefined> => {
        try {
            const uploadImageFilename = `${nanoid()}-${new Date().toISOString()}`;
            const uploadUrl = await privateApi.get(url, {filename : uploadImageFilename})
            if(uploadUrl?.data){
                const uploadImage = await axios.put(uploadUrl.data, selectedImage?.fullFile)
                if(uploadImage.status !== 200){
                    console.log("Unable to upload 'Upload image'")
                    message.error("Error storing logs")
                    return
                }
                return uploadImageFilename
            }
        } catch (error) {
            console.log(error)
            message.error("Error storing logs")
        }
    }

    // Handles the segmentation of images and specific video timestamps
    const handleAnalyze = async (storeLogs : boolean = true) => {
        setDisplayFaces(true)
        setDistinctFaces(prev => ({
            ...prev,
            isLoading : true,
        }))
        if(selectedImage && fileExtension && imageRef.current !== null){
            if(isImageFile(fileExtension)){
                const faces = await segmentFaces(selectedImage.url, setLogs)
                faces && setFaces(faces)
                if(storeLogs){
                    const media = await uploadSegmentedImages()
                    const uploadedImageUniqueName = await uploadSelectedImage("/segmentationLogs/getUploadPresignedUrl")
                    storeSegmentationResults({
                        uploadedImageS3key : uploadedImageUniqueName ?? '',
                        media : media ?? [],
                        timeElapsed : timer,
                        status : "successful",
                        type : "image"
                    })
                }
            } else if(isVideoFile(fileExtension)){
                const thumbnail = await generateVideoThumbnail(selectedImage.url, videoTimestamp)
                thumbnail ? setImageSrc(thumbnail) : console.log("unable to generate thumbnail")
                const faces = await segmentFaces(thumbnail, setLogs)
                faces && setFaces(faces)
            } else {
                console.log("invalid file format")
                setDistinctFaces({error : "Invalid file format"})
            }
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
        await handleAnalyze(false)
        setDisplayMatches(true);
        if(statelessDistinctFaces.data){
            setLogs(prev => [...prev, {log : {content : "Fvlconizing..."}, date : new Date()}])
            const faces = await checkEachFace(statelessDistinctFaces);
            setLogs(prev => [...prev, {log : {content : "Fvlconized successfully"}, date : new Date()}])
            if (faces && faces.length > 0) {
                const validFaces = faces.filter(face => face !== undefined) as checkedFaceType[];
                setMatchedFaces({data : validFaces})
                const filteredFaces = faces.filter((face) => face !== undefined)
                
                    const faceDetails : faceDetailsType[] = await Promise.all(filteredFaces.map(async (face) => {
                        try {
                            const uniqueFileName = `${nanoid()}-${new Date().toISOString()}`;
                            const uploadUrl = await privateApi.get("/fvlconizationLogs/getUploadPresignedUrl", {filename : uniqueFileName})
                            if(uploadUrl?.data){
                                const uploadImage = await axios.put(uploadUrl.data, face?.originalImage)
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
                        try {
                            const uploadImageFilename = `${nanoid()}-${new Date().toISOString()}`;
                            const uploadUrl = await privateApi.get("/fvlconizationLogs/getUploadPresignedUrl", {filename : uploadImageFilename})
                            if(uploadUrl?.data){
                                const uploadImage = await axios.put(uploadUrl.data, selectedImage?.fullFile)
                                if(uploadImage.status !== 200){
                                    console.log("Unable to upload 'Upload image'")
                                    message.error("Error storing logs")
                                }
                                storeFvlcoinzationResults({
                                    uploadedImageS3key : uploadImageFilename,
                                    media : faceDetails,
                                    timeElapsed : timer,
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

    let facesGroupedByIndex : occurance[] = []
    const groupSingleFaceByIndex = (
        face : fvlconizedFaceType,
    ) : occurance[] => {
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
        return facesGroupedByIndex
    }

    const groupFacesByIndex = (faces : fvlconizedFaceType[]) : occurance[] => {
        facesGroupedByIndex = []
        faces.map((item) => groupSingleFaceByIndex(item))
        return facesGroupedByIndex
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
                const facesGroupedByIndex = groupFacesByIndex(matchedFaces.results)  //Categorized faces by index
                if(facesGroupedByIndex){
                    const checkedFaces = await getDetailsOfFacesFromVideoFvlconization(facesGroupedByIndex)
                    setMatchedFaces({ data : checkedFaces })
                    setOccurance(checkedFaces[0]?.occurances)
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

    const getDetailsOfFacesFromVideoFvlconization = async (facesGroupedByIndex : occurance[]) => {
        const checkedFaces = await Promise.all(facesGroupedByIndex.map(async (face) => {
            const resultsContainingFacesMatches = getResultsContainingFaceMatches(face.content)
            const faceMatch = resultsContainingFacesMatches?.FaceMatches[0]// gets a single item in the category which has a face match
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
        return checkedFaces
    }

    return {handleAnalyze, handleFalconize}
}
