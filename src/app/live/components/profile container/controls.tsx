import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { IoMdArrowDropdown } from "react-icons/io"

const Controls = () => {
    return (
        <div className="w-full flex flex-col gap-2 bg-bg-secondary rounded-xl p-2 h-[200px]">
            <div className="w-full h-[30px] flex justify-center items-center py-1 px-2 pr-0 bg-bg-tetiary rounded-lg">
                <Flex
                    justify="space-between"
                    align="center"
                >
                    <AppTypography
                        textColor={theme.colors.text.primary}
                    >
                        Personal Profile
                    </AppTypography>
                    <ClickableTab
                        className="hover:!bg-bg-primary"
                    >
                        <AppTypography
                            textColor={theme.colors.text.primary}
                        >
                            <IoMdArrowDropdown />
                        </AppTypography>
                    </ClickableTab>
                </Flex>
            </div>
        </div>
    )
}
export default Controls