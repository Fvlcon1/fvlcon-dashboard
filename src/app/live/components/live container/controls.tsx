import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Tooltip } from "antd"
import { CgLivePhoto } from "react-icons/cg"
import { MdFullscreen } from "react-icons/md"
import { RiMenu2Fill } from "react-icons/ri"

const Controls = () => {
    return (
        <div className="w-full abosolute top-0 bg-bg-quantinary h-[30px] flex gap-1 items-center px-2">
            <Flex
                justify="space-between"
                align="center"
            >
                <Flex
                    width="fit-content"
                    align="center"
                    gap={2}
                >
                    <ClickableTab
                        className="!p-2"
                    >
                        <AppTypography
                            size={TypographySize.HM}
                        >
                            <RiMenu2Fill />
                        </AppTypography>
                    </ClickableTab>
                    <AppTypography>
                        Accra city camera
                    </AppTypography>
                </Flex>
                <Flex
                    width="fit-content"
                    align="center"
                >
                    <div className="animate-pulse">
                        <Flex
                            width="fit-content"
                            align="center"
                            gap={4}
                        >
                                <AppTypography>
                                    <CgLivePhoto color={'red'}/>
                                </AppTypography>
                            <AppTypography>
                                Live
                            </AppTypography>
                        </Flex>
                    </div>
                    <AppTypography
                        textColor={theme.colors.text.tetiary}
                    >
                        |
                    </AppTypography>
                    <ClickableTab
                        className="!p-2"
                    >
                        <AppTypography
                            size={TypographySize.HM}
                        >
                            <Tooltip
                                title='Fullscreen'
                                placement="right"
                            >
                                <MdFullscreen />
                            </Tooltip>
                        </AppTypography>
                    </ClickableTab>
                </Flex>
            </Flex>
        </div> 
    )
}
export default Controls