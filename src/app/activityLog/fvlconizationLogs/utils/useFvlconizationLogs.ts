import { useContext } from "react"
import { fvlocnizationLogsContext } from "../context/fvlconizationLogsContext"
import { FvlconizationLogsTypes, FvlconizationVideoLogsType } from "../components/fvlconizationLogs.types"
import { protectedAPI } from "@/utils/api/api"
import { sortLogsByDate } from "../../utils/sortLogsByDate"
import axios from "axios"

const privateApi = new protectedAPI()

const useFvlconizationLogs = () => {
    const {fvlconizationLogs, setFvlconizationLogs, setFvlconizationVideoLogs} = useContext(fvlocnizationLogsContext)
    const getFvlconizationLogs = async (
        params? : {
            startDate? : Date,
            endDate? : Date,
            status? : string,
            type? : string,
            page? : number,
            pageSize? : number
        }
    ) => {
        setFvlconizationLogs({status : 'loading'})
        const logs = await privateApi.get("/fvlconizationLogs/getAllFvlconizationLogs", {
            startDate : params?.startDate,
            endDate : params?.endDate,
            status : params?.status,
            type : params?.type,
            page : params?.page,
            pageSize : params?.pageSize
        })
        const data = logs?.data
        const filteredLogs = sortLogsByDate(data)
        if(filteredLogs.length < 1){
            setFvlconizationLogs({data : []})
        }
        const cleanedLogs : FvlconizationLogsTypes[] = filteredLogs.map((item : any) => {
            const accuracy = item.media[0].accuracy
            const identifiedPeople = item.media.map((itemMedia : any) => {
                const details = itemMedia.matchedPersonDetails
                return `${details?.personDetails.forenames ?? ''} ${details?.personDetails.surname ?? ''}`
            })
            return {
                type : item.type,
                date : item.date,
                status : item.status,
                accuracy,
                timeElapsed : item.timeElapsed,
                identifiedPeople,
                uploadedImageUrl : item.uploadedImageUrl
            }
        })
        console.log({cleanedLogs})
        setFvlconizationLogs({data : cleanedLogs})
    }

    const getFvlconizationVideoLogs = async (
        params? : {
            startDate? : Date,
            endDate? : Date,
            status? : string,
            type? : string
            page? : number,
            pageSize? : number
        }
    ) => {
        setFvlconizationVideoLogs({status : 'loading'})
        const logs = await axios.get("/api/logs/fvlconizationVideoLogs", {params : {
            startDate : params?.startDate,
            endDate : params?.endDate,
            status : params?.status,
            type : params?.type,
            page : params?.page,
            pageSize : params?.pageSize
        }})
        const data = logs?.data.data
        const filteredLogs = sortLogsByDate(data)
        if(filteredLogs.length < 1){
            setFvlconizationVideoLogs({data : []})
        }
        const cleanedLogs : FvlconizationVideoLogsType[] = filteredLogs.map((item : any) => {
            const {date, status, timeElapsed, thumbnailUrl, occurance, identifiedPeople} = item
            console.log({identifiedPeople})
            const transformedIdentifiedPeople = identifiedPeople.map((people : any) => {
                return `${people?.personDetails.forenames ?? ''} ${people?.personDetails.surname ?? ''}`
            })
            return {
                type : 'video',
                date,
                status,
                timeElapsed,
                thumbnailUrl,
                occurance,
                identifiedPeople : transformedIdentifiedPeople
            }
        })
        console.log({cleanedLogs})
        setFvlconizationVideoLogs({data : cleanedLogs})
    }
    return {
        getFvlconizationLogs, getFvlconizationVideoLogs
    }
}

export default useFvlconizationLogs