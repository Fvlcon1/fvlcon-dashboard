import theme from "@styles/theme"
import { Priority } from "../../../utils/types"
import Text from "@styles/components/text"

const PriorityCard = ({
    priority
} : {
    priority : Priority
}) => {

    if(priority === "high priority")
        return (
            <div className="flex items-center justify-center rounded-md bg-[#ff5a5a6c] px-2 w-fit">
                <Text textColor={theme.colors.text.primary}>
                    High Priority
                </Text>
            </div>
        )

    if(priority === "medium priority")
        return (
            <div className="flex items-center justify-center rounded-md bg-[#f88a3b87] px-2 w-fit">
                <Text textColor={theme.colors.text.primary}>
                    Medium Priority
                </Text>
            </div>
        )

    if(priority === "low priority")
        return (
            <div className="flex items-center justify-center rounded-md bg-[#06b5d44f] px-2 w-fit">
                <Text textColor={theme.colors.text.primary}>
                    Low Priority
                </Text>
            </div>
        )
}
export default PriorityCard