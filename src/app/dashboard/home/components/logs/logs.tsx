import getDate from "@/utils/getDate"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { MdFullscreen } from "react-icons/md"

const Logs = () => {
    return (
        <div  className="w-full relative flex min-h-[200px] flex-col flex-1 gap-1">
            <div className="w-full absolute z-0 top-0 bg-gradient-container h-[200px] rounded-lg p-2">
                <Flex
                    justify="space-between"
                >
                    <div className="py-1 px-3 bg-bg-primary rounded-lg">
                        <AppTypography
                            textColor={theme.colors.text.primary}
                        >
                            Logs
                        </AppTypography>
                    </div>
                    <Flex
                        width="fit-content"
                        align="center"
                        gap={15}
                    >
                        <AppTypography>
                            {getDate(new Date())}
                        </AppTypography>
                        <AppTypography>
                            |
                        </AppTypography>
                        <AppTypography
                            textColor={theme.colors.text.primary}
                            size={TypographySize.HL}
                        >
                            <MdFullscreen />
                        </AppTypography>
                    </Flex>
                </Flex>
            </div>
        </div>
    )
}
export default Logs