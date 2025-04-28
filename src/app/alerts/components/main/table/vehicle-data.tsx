import { AlertData, VehicleData } from "@/app/alerts/utils/types"
import { getDateTime, getRelativeTime } from "@/utils/getDate"
import Text from "@styles/components/text"
import PriorityCard from "./priority-card"
import Actions from "./actions"
import theme from "@styles/theme"
import { formatString } from "@/app/dashboard/home/utils/formatString"
import { TypographySize } from "@styles/style.types"
import { FaCar } from "react-icons/fa6"

export const vehicleData = (item : AlertData) : VehicleData | null => item.type === "vehicle" ? ({
    left : (
        <div className="flex gap-2 items-center">
            {/* Image */}
            <div className="w-[50px] flex justify-center items-center h-[50px] rounded-lg overflow-hidden bg-bg-tetiary">
                <FaCar 
                    color={theme.colors.bg.alt1}
                    size={30}
                />
            </div>

            {/* Info */}
            <div className="flex flex-col">
                {/* Type */}
                <div className="flex items-center gap-1">
                    <div className="w-[2px] h-[10px] bg-blue-400 rounded-full" />
                    <Text
                        textColor="#60a5fa"
                        size={TypographySize.xs}
                    >
                        {formatString(item.type)}
                    </Text>
                </div>

                {/* Name */}
                <div className="flex items-center gap-1">
                    <Text>
                        Plate Number:
                    </Text>
                    <Text
                        textColor={theme.colors.text.primary}
                    >
                        {item.plateNumber}
                    </Text>
                </div>

                {/* Other info */}
                <div className="flex items-center gap-1">
                    <Text
                        textColor={theme.colors.text.primary}
                    >
                        {formatString(`${item.typeofVehicle}${item.typeofVehicle ? " | " : ""}${item.color}${item.color ? " | " : ""}${item.reason}`)}
                    </Text>
                </div>
            </div>
        </div>
    ),
    recipients : (
        <div className="flex flex-col">
            <Text>
                Recipients:
            </Text>
            <Text textColor={theme.colors.text.primary}>
                {item.recipients.join(", ")}
            </Text>
        </div>
    ),
    dateCreated : (
        <div className="flex gap-1">
            <Text>
                Added:
            </Text>
            <Text textColor={theme.colors.text.primary}>
                {getRelativeTime(new Date(item.dateCreated))}
            </Text>
        </div>
    ),
    priority : (
        <PriorityCard priority={item.priority} />
    ),
    actions : (
        <Actions />
    )
}) : null