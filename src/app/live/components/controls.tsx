import ClickableTab from "@components/clickable/clickabletab"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { IoMdArrowDropdown } from "react-icons/io"
import { MdViewQuilt } from "react-icons/md"

const Controls = () => {
    return (
        <Flex
            width="fit-content"
        >
            <ClickableTab>
                <Flex
                    width="fit-content"
                    align='center'
                >
                    <MdViewQuilt
                        color={theme.colors.text.primary}
                        size={20}
                    />
                    <IoMdArrowDropdown
                        color={theme.colors.text.secondary}
                    />
                </Flex>
            </ClickableTab>
        </Flex>
    )
}
export default Controls