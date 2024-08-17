import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { Dispatch, SetStateAction } from "react"
import { FaSortAlphaDown } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import { HiVideoCamera } from "react-icons/hi"

const Head = ({
    showSearch,
    setShowSearch
} : {
    showSearch : boolean,
    setShowSearch : Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <Flex
            padding="0 0 0 8px"
            align="center"
            justify="space-between"
        >
            <Flex
                align="center"
                width='fit-content'
            >
                <HiVideoCamera
                    color={theme.colors.text.primary}
                />
                <AppTypography
                    textColor={theme.colors.text.primary}
                >
                    Cam links
                </AppTypography>
            </Flex>
            <Flex
                width="fit-content"
                gap={0}
            >
                <ClickableTab
                    className="hover:!bg-bg-primary"
                    onClick={()=>setShowSearch(!showSearch)}
                >
                    <FiSearch
                        color={theme.colors.text.secondary}
                    />
                </ClickableTab>
                <ClickableTab
                    className="hover:!bg-bg-primary"
                >
                    <FaSortAlphaDown
                        color={theme.colors.text.secondary}
                    />
                </ClickableTab>
            </Flex>
        </Flex>
    )
}
export default Head