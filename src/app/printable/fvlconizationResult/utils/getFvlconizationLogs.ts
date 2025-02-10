import { protectedAPI } from "@/utils/api/serverApi"

const privateApi = new protectedAPI()

export const getFvlconizationLog = async (id:string) => {
    const log = await privateApi.get(`/fvlconizationLogs/getFvlconizationLog/${id}`)
    const data = log?.data
    return data
}