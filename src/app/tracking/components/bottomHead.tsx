import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaCaretDown } from "react-icons/fa6"
import { LuHistory } from "react-icons/lu"

const BottomHead = () => {
    return (
        <div className="flex gap-1 items-center pl-2 ">
            <LuHistory
                color={theme.colors.text.secondary}
                size={13}
            />
            <Text
                textColor={theme.colors.text.secondary}
            >
                Recents
            </Text>
            {/* <div className="flex gap-1 items-center cursor-pointer hover:scale-[0.995] hover:opacity-[0.8] duration-100">
                <Text>
                    Accra City Camera
                </Text>
                <FaCaretDown
                    color={theme.colors.text.secondary}
                    size={13}
                />
            </div> */}
        </div>
    )
}
export default BottomHead