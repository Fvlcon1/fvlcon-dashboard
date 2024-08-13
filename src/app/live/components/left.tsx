import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { IoMdArrowDropdown } from "react-icons/io"

const Left = () => {
    return (
        <div className="fixed top-0 left-[70px] w-[300px] h-[100vh] py-4 px-6 gap-3">
            <div className="flex flex-col w-full h-full bg-gradient-container rounded-2xl p-3 gap-3 overflow-y-auto">
                <div className="w-full relative bg-bg-tetiary rounded-xl h-[250px] overflow-hidden border-bg-quantinary">
                    <div className="w-full abosolute top-0 bg-bg-primary h-[40px] flex items-center pr-2 px-4">
                        <Flex
                            justify="space-between"
                            margin="2px 0 0 0"
                            align="center"
                        >
                            <AppTypography
                                textColor={theme.colors.text.primary}
                            >
                                Personal Profile
                            </AppTypography>
                            <ClickableTab>
                                <IoMdArrowDropdown 
                                    color={theme.colors.text.primary}
                                />
                            </ClickableTab>
                        </Flex>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Left