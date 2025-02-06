import { FvlconizationLogsTypes } from "@/app/activityLog/fvlconizationLogs/components/fvlconizationLogs.types"
import { sortLogsByDate } from "@/app/activityLog/utils/sortLogsByDate"
import { protectedAPI } from "@/utils/api/serverApi"

const privateApi = new protectedAPI()

export const getFvlconizationLogs = async () => {
    const logs = await privateApi.get("/fvlconizationLogs/getAllFvlconizationLogs")
    const data = logs?.data
    const filteredLogs = sortLogsByDate(data)
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
            identifiedPeopleDetails : item.media,
            uploadedImageUrl : item.uploadedImageUrl
        }
    })
    return cleanedLogs
}