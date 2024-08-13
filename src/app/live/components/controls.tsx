import ClickableTab from "@components/clickable/clickabletab"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { FaGear } from "react-icons/fa6"
import { IoMdArrowDropdown } from "react-icons/io"
import { MdViewQuilt } from "react-icons/md"

const Controls = () => {
    return (
        <Flex
            width="fit-content"
            align="center"
            gap={0}
        >
            <ClickableTab>
                <Flex
                    width="fit-content"
                    align='center'
                >
                    <MdViewQuilt
                        color={theme.colors.text.secondary}
                        size={20}
                    />
                    <IoMdArrowDropdown
                        color={theme.colors.text.secondary}
                    />
                </Flex>
            </ClickableTab>
            <ClickableTab>
                <Flex
                    width="fit-content"
                    align='center'
                >
                    <FaGear
                        color={theme.colors.text.secondary}
                        size={17}
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