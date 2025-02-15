import { getRelativeTime } from "@/utils/getDate"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaLocationArrow, FaVideo } from "react-icons/fa6"
import { IoPin } from "react-icons/io5"
import { MdOutlineShareLocation } from "react-icons/md"
import { ICamDetilasPersonDataType } from "./types"

const CamDetailsPerson = ({
    personData
} : {
    personData? : ICamDetilasPersonDataType
}) => {
    return (
        <div className="flex flex-col gap-0 rounded-lg overflow-auto border-solid border-[1px] border-bg-secondary py-2 px-3 bg-gradient-container-md">
            <table className="w-full">
                <tbody>
                    <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                        <td className="py-1"><Text>Stream Name:</Text></td>
                        <td>
                            <Text textColor={theme.colors.text.primary}>
                                {personData?.streamName}
                            </Text>
                        </td>
                    </tr>
                    <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                        <td className="py-1"><Text>Last seen:</Text></td>
                        <td>
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;{personData?.time && getRelativeTime(personData?.time).charAt(0).toUpperCase() + getRelativeTime(personData.time).slice(1)}
                            </Text>
                        </td>
                    </tr>
                    <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                        <td className="py-1"><Text>Location:</Text></td>
                        <td>
                            <Text textColor={theme.colors.text.primary}>
                                {personData?.lastSeen}
                            </Text>
                        </td>
                    </tr>
                    <tr>
                        <td className="py-1"><Text>Coordinates:</Text></td>
                        <td>
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;{personData?.coordinates && `${personData.coordinates[0]}, ${personData.coordinates[1]}`}
                            </Text>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <div className="w-full py-2 px-3 gap-2 rounded-md bg-gradient-container flex flex-col">
                <div className="flex gap-1 items-center">
                    <FaVideo size={11} color={theme.colors.text.secondary}/>
                    <Text>
                        Stream name •
                        <Text textColor={theme.colors.text.primary}>
                            &nbsp;{personData?.streamName}
                        </Text>
                    </Text>
                </div>
                <div className="flex gap-1 items-center">
                    <FaLocationArrow size={11} color={theme.colors.text.secondary}/>
                    <Text>
                        Last seen •
                        <Text textColor={theme.colors.text.primary}>
                            &nbsp;{personData?.time && getRelativeTime(personData?.time).charAt(0).toUpperCase() + getRelativeTime(personData.time).slice(1)}
                        </Text>
                    </Text>
                </div>
                <div className="flex gap-1 items-center">
                    <IoPin size={11} color={theme.colors.text.secondary}/>
                    <Text>
                        Location •
                        <Text textColor={theme.colors.text.primary}>
                            &nbsp;{personData?.lastSeen}
                        </Text>
                    </Text>
                </div>
                <div className="flex gap-1 items-center">
                    <MdOutlineShareLocation size={11} color={theme.colors.text.secondary}/>
                    <Text>
                        Coordinates •
                        <Text textColor={theme.colors.text.primary}>
                            &nbsp;{personData?.coordinates && `${personData.coordinates[0]}, ${personData.coordinates[1]}`}
                        </Text>
                    </Text>
                </div>
            </div> */}
        </div>
    )
}
export default CamDetailsPerson