import { protectedAPI } from "@/utils/api/serverApi"

const privateApi = new protectedAPI()

export const getVideoLog = async (id:string) => {
    console.log("hello")
    const log = await privateApi.get(`/videologs/video-log/${id}`)
    console.log({log})
    const data = log?.data
    return data
}