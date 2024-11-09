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
import { message } from "antd"

const privateApi = new protectedAPI()

const PersonResultContainer = ({
    name,
    type,
    alias,
    lastSeen,
    coordinates,
    timeSeen,
    streamName,
    S3Key,
    faceId,
    userId
} : IPersonTrackingType) => {
    const {setCaptureDetails, setCenter, setWayPoints} = useContext(trackingContext)

    const handleSetCaptureDetails = async () => {
        setCaptureDetails({status : 'loading'})
        let imageUrl : string | undefined
        if(S3Key){
            try {
                const response = await privateApi.get(`/tracking/generatePresignedUrl/${S3Key}`)
                imageUrl = response?.data
            } catch (error) {
                console.log({error})
                message.error("Error getting image url")
            }
        }
        const captureDetailsData : IPersonTrackingType= {
            name,
            type,
            alias,
            lastSeen,
            coordinates,
            timeSeen,
            streamName,
            S3Key,
            imageUrl,
            faceId,
            userId
        }
        setCaptureDetails({
            data : captureDetailsData,
            status : undefined
        })
        setWayPoints([
            {
                ...captureDetailsData,
                radius: 10
            }
        ])
        setCenter(coordinates)
    }

    return (
        <Pressable onClick={handleSetCaptureDetails}>
            <div className="w-full px-3 hover:scale-[0.95] duration-200 flex flex-col gap-1 rounded-md">
                <div className="flex gap-2 items-center ml-[-1px]">
                    <div className="rounded-md px-2 py-[2px] bg-bg-tetiary border-[1px] border-solid border-[#222222]">
                        <div className="mt-[-2px]">
                            <Text>
                                {capitalizeString(type)}
                            </Text>
                        </div>
                    </div>
                    <Text>
                        {getRelativeTime(timeSeen).charAt(0).toUpperCase() + getRelativeTime(timeSeen).slice(1)}
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
                                    Location
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
                            <Text
                                whiteSpace="nowrap"
                                ellipsis
                                maxLines={1}
                            >
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