import { useContext } from "react"
import { fvlocnizationLogsContext } from "../context/fvlconizationLogsContext"
import { FvlconizationLogsTypes } from "../components/fvlconizationLogs.types"
import { protectedAPI } from "@/utils/api/api"

const privateApi = new protectedAPI()

const useFvlconizationLogs = () => {
    const {fvlconizationLogs, setFvlconizationLogs} = useContext(fvlocnizationLogsContext)
    const getFvlconizationLogs = async (
        params? : {
            startDate? : Date,
            endDate? : Date,
            status? : string,
            type? : string
        }
    ) => {
        setFvlconizationLogs({status : 'loading'})
        const logs = await privateApi.get("/fvlconizationLogs/getAllFvlconizationLogs", {
            startDate : params?.startDate,
            endDate : params?.endDate,
            status : params?.status,
            type : params?.type
        })
        const data = logs?.data
        if(data.length < 1){
            setFvlconizationLogs({data : []})
        }
        const cleanedLogs : FvlconizationLogsTypes[] = data.map((item : any) => {
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
    return {
        getFvlconizationLogs
    }
}

export default useFvlconizationLogs