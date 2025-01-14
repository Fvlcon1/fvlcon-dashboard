import { useContext } from "react"
import { trackingLogsContext } from "../context/trackingLogsContext"
import { trackingLogsType } from "../components/trackingLogs.types"
import { protectedAPI } from "@/utils/api/api"
import { sortLogsByDate } from "../../utils/sortLogsByDate"
import axios from "axios"

const privateApi = new protectedAPI()

const useTrackingLogs = () => {
    const {trackingLogs, setTrackingLogs} = useContext(trackingLogsContext)
    const getTrackingLogs = async (
        params? : {
            startDate? : Date,
            endDate? : Date,
            page? : number,
            pageSize? : number
        }
    ) => {
        setTrackingLogs({status : 'loading'})
        const logs = await axios.get("/api/logs/trackingLogs", { params : {
            startDate : params?.startDate,
            endDate : params?.endDate,
            page : params?.page,
            pageSize : params?.pageSize
        }})
        const data = logs?.data.data
        const filteredLogs = sortLogsByDate(data)
        console.log({filteredLogs})
        if(filteredLogs.length < 1){
            setTrackingLogs({data : []})
        }
        const cleanedLogs : trackingLogsType[] = filteredLogs.map((item : any) => {
            const {details, imageUrl, locations, date} = item 
            const identifiedPerson = `${details?.forenames ?? ''} ${details?.surname ?? ''}`
            return {
                imageUrl,
                identifiedPerson,
                locations,
                date : new Date(date)
            }
        })
        setTrackingLogs({data : cleanedLogs})
    }
    return {
        getTrackingLogs
    }
}

export default useTrackingLogs