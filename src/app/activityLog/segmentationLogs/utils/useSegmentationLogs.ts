import { useContext } from "react"
import { SegmentationLogsContext } from "../context/segmentationLogsContext"
import { SegmentationLogsTypes } from "../components/segmentationLogs.types"
import { protectedAPI } from "@/utils/api/api"

const privateApi = new protectedAPI()

const useSegmentationLogs = () => {
    const {segmentationLogs, setSegmentationLogs} = useContext(SegmentationLogsContext)
    const getSegmentationLogs = async (
        params? : {
            startDate? : Date,
            endDate? : Date,
            status? : string,
            type? : string
        }
    ) => {
        setSegmentationLogs({status : 'loading'})
        const logs = await privateApi.get("/segmentationLogs/getAllSegmentationLogs", {
            startDate : params?.startDate,
            endDate : params?.endDate,
            status : params?.status,
            type : params?.type
        })
        const data = logs?.data
        if(data.length < 1){
            setSegmentationLogs({data : []})
        }
        const cleanedLogs : SegmentationLogsTypes[] = data.map((item : any) => {
            return {
                type : item.type,
                date : item.date,
                status : item.status,
                timeElapsed : item.timeElapsed,
                media : item.media,
                uploadedImageUrl : item.uploadedImageUrl
            }
        })
        console.log({cleanedLogs})
        setSegmentationLogs({data : cleanedLogs})
    }
    return {
        getSegmentationLogs
    }
}

export default useSegmentationLogs