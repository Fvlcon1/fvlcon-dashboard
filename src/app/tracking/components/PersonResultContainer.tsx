import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { FaLocationArrow, FaLocationCrosshairs } from "react-icons/fa6"
import { IPersonTrackingType } from "./types"
import { getRelativeTime } from "@/utils/getDate"

const PersonResultContainer = ({
    name,
    type,
    alias,
    lastSeen,
    coordinates,
    timeSeen
} : IPersonTrackingType) => {
    return (
        <div className="w-full px-3 hover:scale-[0.95] duration-200 flex flex-col gap-1 rounded-md">
            <div className="flex gap-2 items-center">
                <div className="rounded-md px-2 py-1 bg-bg-tetiary">
                    <div className="mt-[-2px]">
                        <Text>
                            {type}
                        </Text>
                    </div>
                </div>
                <Text>
                    {getRelativeTime(timeSeen)}
                </Text>
            </div>
            <div className="flex gap-2 items-center">
                <Text
                    size={TypographySize.HM}
                    textColor={theme.colors.text.primary}
                >
                    {name}
                </Text>
                <Text>
                    • {alias}
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
    )
}
export default PersonResultContainer