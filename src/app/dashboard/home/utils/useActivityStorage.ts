import { protectedAPI } from "@/utils/api/api"

const privateApi = new protectedAPI()

const useActivityStorage = () => {
    const storeFvlcoinzationResults = async (data : {
        uploadedImageS3key : string
        media : {
            segmentedImageS3key? : string,
            matchedFaceId : string
            accuracy : number,
        }[]
        timeElapsed : number,
        status : string,
        type : string
    }) => {
        const {media, timeElapsed, status, type, uploadedImageS3key} = data
        const response = await privateApi.post("/fvlconizationLogs/addFvlconizationLogs", {
            uploadedImageS3key,
            media,
            date : new Date(),
            timeElapsed,
            status,
            type
        })
        console.log({storedFvlconization : response})
    }
    return {storeFvlcoinzationResults}
}

export default useActivityStorage