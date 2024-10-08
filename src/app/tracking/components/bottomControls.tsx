import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaCaretDown } from "react-icons/fa6"

const BottomControls = () => {
    return (
        <div className="flex">
            <div className="rounded-l-lg bg-bg-tetiary hover:bg-bg-quantinary cursor-pointer gap-1 p-2 flex items-center px-4 border-r-[1px] border-r-solid border-bg-alt1">
                <Text>
                    Last 7 days
                </Text>
                <FaCaretDown
                    color={theme.colors.text.secondary}
                />
            </div>
            <div className="rounded-r-lg gap-1 cursor-pointer hover:bg-bg-quantinary bg-bg-tetiary p-2 flex items-center px-4">
                <Text>
                    March 20 - March 30
                </Text>
                <FaCaretDown 
                    color={theme.colors.text.secondary}
                />
            </div>
        </div>
    )
}
export default BottomControls