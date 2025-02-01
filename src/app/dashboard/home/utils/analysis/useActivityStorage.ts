import { protectedAPI } from "@/utils/api/api"
import { HomeContext } from "../../context/homeContext"
import { useContext, useEffect, useRef } from "react"
import { occurance } from "@/utils/@types"
import axios from "axios"
import { message } from "antd"
import { v4 as uuidv4 } from 'uuid';
import { uploadToS3 } from "@/utils/uploadToS3"
import generateVideoThumbnail from "@/utils/generateVideoThumbnail"
import { base64ToBlob } from "@/utils/base63ToBlob"

const privateApi = new protectedAPI()

const useActivityStorage = () => {
    const { timer } = useContext(HomeContext)
    const timerRef = useRef(timer)

    // Keep the ref updated with the latest timer value
    useEffect(() => {
        timerRef.current = timer
    }, [timer])

    const storeFvlcoinzationResults = async (data: {
        uploadedImageS3key: string
        media: {
            segmentedImageS3key?: string
            matchedFaceId: string
            accuracy: number
        }[]
        timeElapsed: number
        status: string
        type: string
    }) => {
        try {
            const { media, status, type, uploadedImageS3key } = data
    
            const response = await privateApi.post("/fvlconizationLogs/addFvlconizationLogs", {
                uploadedImageS3key,
                media,
                date: new Date(),
                timeElapsed: timerRef.current, // Use the latest timer value from the ref
                status,
                type,
            })
        } catch (error) {
            message.error("Unable to store logs")
            console.log({error})
        }
    }

    const storeVideoFvlconizationResults = async (data: {
        timeElapsed : number,
        status : string,
        videoFile : File,
        videoUrl : string,
        videoS3Key : string,
        occurance : occurance[]
    }) => {
        try {
            const { timeElapsed, status, videoFile, videoS3Key, occurance, videoUrl } = data

            //get presigned url
            const thumbnailS3Key = `${videoFile.name}${uuidv4()}`
            const result = await axios.get("/api/logs/fvlconizationVideoLogs/generateUploadPresignedUrlForVideoFvlconizationThumbnail", {params : { s3Key : thumbnailS3Key }})
            const presignedUrl = result.data.url

            //upload thumnail to s3
            const thumbnail = await generateVideoThumbnail(videoUrl)
            const thumbnailBlob = base64ToBlob(thumbnail, "image/png");
            const { error } = await uploadToS3(presignedUrl, thumbnailBlob)
            if(error) throw new Error(error)
    
            //store log
            const response = await axios.post("/api/logs/fvlconizationVideoLogs", {
                timeElapsed, 
                status, 
                thumbnailS3Key, 
                videoS3Key, 
                occurance
            })
        } catch (error) {
            message.error("Unable to store logs")
            console.log({error})
        }
    }

    const storeSegmentationResults = async (data: {
        uploadedImageS3key: string
        media: {
            segmentedImageS3Key?: string
            status: string
        }[]
        timeElapsed: number
        status: string
        type: string
    }) => {
        try {
            const { media, status, type, uploadedImageS3key } = data
    
            const response = await privateApi.post("/segmentationLogs/addSegmentationLogs", {
                uploadedImageS3key,
                media,
                date: new Date(),
                timeElapsed: timerRef.current, // Use the latest timer value from the ref
                status,
                type,
            })
        } catch (error) {
            message.error("Unable to store logs")
            console.log({error})
        }
    }

    return { storeFvlcoinzationResults, storeSegmentationResults, storeVideoFvlconizationResults }
}

export default useActivityStorage
