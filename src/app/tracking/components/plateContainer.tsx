import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { FaLocationArrow, FaLocationCrosshairs } from "react-icons/fa6"
import { IPersonTrackingType, IPlateTrackingType } from "./types"
import { getRelativeTime } from "@/utils/getDate"
import Pressable from "@components/button/pressable"
import { capitalizeString } from "@/utils/capitalizeString"
import { useContext, useState } from "react"
import { trackingContext } from "../context/trackingContext"
import { protectedAPI } from "@/utils/api/api"
import { message } from "antd"
import { showError } from "../utils/uiHelpers"
import { parseCoordinates } from "@/utils/parseCoordinate"
import ClickableTab from "@components/clickable/clickabletab"
import Link from "next/link"

const privateApi = new protectedAPI()

/**
 * PlateContainer displays information about a tracked vehicle plate.
 * Handles click to show capture details and set map waypoints.
 */
const PlateContainer = ({
    id,
    plateNumber,
    timestamp,
    coordinates,
    locationName,
    imageUrl,
    userId,
    type,
    S3Key
}: IPlateTrackingType) => {
    const {setCaptureDetails, setCenter, setWayPoints} = useContext(trackingContext)
    const [hover, setHover] = useState(false)

    /**
     * Handles click to set capture details and update map state.
     */
    const handleSetCaptureDetails = async () => {
        try {
            setCaptureDetails({ status: 'loading' });
            const captureDetailsData: IPlateTrackingType = {
                id,
                plateNumber,
                coordinates,
                timestamp,
                locationName,
                imageUrl,
                type,
                userId,
                S3Key
            };
            setCaptureDetails({ data: captureDetailsData, status: undefined });
            setWayPoints([
                {
                    ...captureDetailsData,
                    radius: 10
                }
            ]);
            setCenter(coordinates);
        } catch (error: any) {
            showError("Failed to set capture details");
        }
    }

    // UI rendering
    return (
        <Pressable 
            onClick={handleSetCaptureDetails}
            scaleFactor={0.98}
        >
            <div 
                className="w-full px-3 hover:scale-[0.99] duration-200 flex flex-col gap-1 rounded-md"
                onMouseOver={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
            >
                <div className="flex gap-2 items-center ml-[-1px]">
                    <div className="rounded-md px-2 py-[2px] bg-bg-tetiary border-[1px] border-solid border-[#222222]">
                        <div className="mt-[-2px]">
                            <Text>
                                {capitalizeString(type)}
                            </Text>
                        </div>
                    </div>
                    <Text>
                        {getRelativeTime(new Date(timestamp)).charAt(0).toUpperCase() + getRelativeTime(new Date(timestamp)).slice(1)}
                    </Text>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                            <Text>
                                Plate Number:
                            </Text>
                            <Text
                                textColor={theme.colors.text.primary}
                                size={TypographySize.HM}
                            >
                                {plateNumber}
                            </Text>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="flex gap-1 items-center">
                                <FaLocationArrow 
                                    color={theme.colors.text.secondary}
                                    size={13}
                                />
                                <Text>
                                    Location:
                                </Text>
                            </div>
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {locationName}
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
                {/* <div
                    onClick={(e)=>{
                        e.stopPropagation()
                    }}
                    className="w-fit"
                >
                    <Text
                        textColor={theme.colors.main.primary}
                        className="hover:!underline hover:!opacity-[.5] duration-200"
                    >
                        See Dvla Details...
                    </Text>
                </div> */}
            </div>
        </Pressable>
    )
}
export default PlateContainer