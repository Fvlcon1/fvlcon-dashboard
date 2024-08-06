import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { FaImage } from "react-icons/fa6"

const HistoryItem = () => {
    return (
        <div className="w-full flex items-center rounded-lg px-4 py-2 justify-between cursor-pointer hover:scale-[0.97] hover:opacity-[0.7] duration-200">
            <Flex
                width="100px"
                justify="center"
            >
                <FaImage
                    color={theme.colors.text.secondary}
                />
            </Flex>
            <Flex
                width="100px"
                justify="center"
            >
                <div className="w-[50px] h-[50px] bg-bg-quantinary rounded-full">

                </div>
            </Flex>
            <Flex
                width="100px"
                justify="center"
            >
                <Flex
                    direction="column"
                    width="it-content"
                    gap={1}
                >
                    <AppTypography
                        textColor={theme.colors.text.primary}
                    >
                        Michael Chris
                    </AppTypography>
                    <AppTypography
                        size={TypographySize.xs}
                    >
                        Shanghai, China
                    </AppTypography>
                </Flex>
            </Flex>
            <Flex
                justify="center"
                width="100px"
            >
                <Flex
                    direction="column"
                    gap={1}
                    width="it-content"
                >
                    <AppTypography
                        textColor={theme.colors.text.primary}
                    >
                        28th July, 2024
                    </AppTypography>
                    <AppTypography
                        size={TypographySize.xs}
                    >
                        2 Days ago | 12PM
                    </AppTypography>
                </Flex>
            </Flex>
            <Flex
                width="100px"
                justify="center"
            >
                <AppTypography
                    textColor={theme.colors.text.primary}
                >
                    53s
                </AppTypography>
                <AppTypography
                    textColor={theme.colors.text.primary}
                >
                    53s
                </AppTypography>
            </Flex>
            <Flex
                width="100px"
                justify="center"
            >
                <AppTypography
                    textColor={theme.colors.text.primary}
                >
                    O
                </AppTypography>
                <AppTypography
                    textColor={theme.colors.text.primary}
                >
                    Successfull
                </AppTypography>
            </Flex>
            <Flex
                width="100px"
                justify="center"
            >
                <AppTypography>
                    Actions
                </AppTypography>
            </Flex>
        </div>
    )
}
export default HistoryItem