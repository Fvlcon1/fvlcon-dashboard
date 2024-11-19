import { getRelativeTime } from "@/utils/getDate"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaLocationArrow, FaVideo } from "react-icons/fa6"
import { IoPin } from "react-icons/io5"
import { MdOutlineShareLocation } from "react-icons/md"
import { ICamDetailsPlate, ICamDetilasPersonDataType } from "./types"

const CamDetailsPlate = ({
    plateData
} : {
    plateData? : ICamDetailsPlate
}) => {
    return (
        <div className="flex flex-col gap-2 overflow-y-hidden">
            <div className="w-full py-2 px-3 gap-2 rounded-md bg-gradient-container flex flex-col">
                <div className="flex gap-1 items-center">
                    <FaVideo size={11} color={theme.colors.text.secondary}/>
                    <Text>
                        Number Plate
                        <Text textColor={theme.colors.text.primary}>
                            &nbsp;{plateData?.numberPlate}
                        </Text>
                    </Text>
                </div>
                <div className="flex gap-1 items-center">
                    <FaLocationArrow size={11} color={theme.colors.text.secondary}/>
                    <Text>
                        Last seen •
                        <Text textColor={theme.colors.text.primary}>
                            &nbsp;{plateData?.time && getRelativeTime(plateData?.time).charAt(0).toUpperCase() + getRelativeTime(plateData.time).slice(1)}
                        </Text>
                    </Text>
                </div>
                <div className="flex gap-1 items-center">
                    <IoPin size={11} color={theme.colors.text.secondary}/>
                    <Text>
                        Location •
                        <Text textColor={theme.colors.text.primary}>
                            &nbsp;{plateData?.lastSeen}
                        </Text>
                    </Text>
                </div>
                <div className="flex gap-1 items-center">
                    <MdOutlineShareLocation size={11} color={theme.colors.text.secondary}/>
                    <Text>
                        Coordinates •
                        <Text textColor={theme.colors.text.primary}>
                            &nbsp;{plateData?.coordinates && `${plateData.coordinates[0]}, ${plateData.coordinates[1]}`}
                        </Text>
                    </Text>
                </div>
            </div>
        </div>
    )
}
export default CamDetailsPlate