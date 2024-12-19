import { protectedAPI } from "@/utils/api/api"
import { HomeContext } from "../context/homeContext"
import { useContext, useEffect, useRef } from "react"

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
        const { media, status, type, uploadedImageS3key } = data
        console.log({ restime: timerRef.current })

        const response = await privateApi.post("/fvlconizationLogs/addFvlconizationLogs", {
            uploadedImageS3key,
            media,
            date: new Date(),
            timeElapsed: timerRef.current, // Use the latest timer value from the ref
            status,
            type,
        })
        console.log({ storedFvlconization: response })
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
        const { media, status, type, uploadedImageS3key } = data

        const response = await privateApi.post("/segmentationLogs/addSegmentationLogs", {
            uploadedImageS3key,
            media,
            date: new Date(),
            timeElapsed: timerRef.current, // Use the latest timer value from the ref
            status,
            type,
        })
        console.log({ storedSegmentation: response })
    }

    return { storeFvlcoinzationResults, storeSegmentationResults }
}

export default useActivityStorage
