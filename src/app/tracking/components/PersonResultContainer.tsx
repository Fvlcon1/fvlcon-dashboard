import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { FaLocationArrow, FaLocationCrosshairs } from "react-icons/fa6"
import { IPersonTrackingType } from "./types"
import { getRelativeTime } from "@/utils/getDate"
import Pressable from "@components/button/pressable"
import { capitalizeString } from "@/utils/capitalizeString"
import { useContext } from "react"
import { trackingContext } from "../context/trackingContext"
import { protectedAPI } from "@/utils/api/api"

export interface PersonResultContainerType extends IPersonTrackingType {
    status : 'loading' | null
}
const privateApi = new protectedAPI()

const PersonResultContainer = ({
    name,
    type,
    alias,
    lastSeen,
    coordinates,
    timeSeen,
    streamName,
    S3Key
} : PersonResultContainerType) => {
    const {setCaptureDetails} = useContext(trackingContext)

    const handleSetCaptureDetails = async () => {
        if(S3Key){
            const {data : imageUrl} = await privateApi.get(`/tracking/generatePresignedUrl/${S3Key}`)
            console.log({imageUrl})
            setCaptureDetails({
                name,
                type,
                alias,
                lastSeen,
                coordinates,
                timeSeen,
                streamName,
                S3Key,
                imageUrl
            })
        }
    }

    return (
        <Pressable onClick={handleSetCaptureDetails}>
            <div className="w-full px-3 hover:scale-[0.95] duration-200 flex flex-col gap-1 rounded-md">
                <div className="flex gap-2 items-center ml-[-1px]">
                    <div className="rounded-md px-2 py-1 bg-bg-tetiary">
                        <div className="mt-[-2px]">
                            <Text>
                                {capitalizeString(type)}
                            </Text>
                        </div>
                    </div>
                    <Text>
                        {getRelativeTime(timeSeen)}
                    </Text>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <Text
                                size={TypographySize.HM}
                                textColor={theme.colors.text.primary}
                            >
                                {capitalizeString(name)}
                            </Text>
                            <Text>
                                {alias && '•'} {alias}
                            </Text>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex gap-1 items-center">
                                <FaLocationArrow 
                                    color={theme.colors.text.secondary}
                                    size={13}
                                />
                                <Text>
                                    Last seen
                                </Text>
                            </div>
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                • &nbsp;{lastSeen}
                            </Text>
                        </div>
                        <div className="flex gap-1 items-center">
                            <FaLocationCrosshairs 
                                color={theme.colors.text.secondary}
                                size={13}
                            />
                            <Text>
                                {`${coordinates[0]}, ${coordinates[1]}`}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </Pressable>
    )
}
export default PersonResultContainer