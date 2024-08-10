import getDate from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useState } from "react"
import { MdFullscreen } from "react-icons/md"
import AllLogs from "./allLogs"
import Slidein from "@styles/components/slidein"

const Logs = () => {
    const [showFullLogs, setShowFullLogs] = useState(false)
    return (
        <Flex
            flex={1}
            maxWidth="50%"
        >
            <Slidein className="!w-full">
                <div  className="w-full relative flex h-[150px] flex-col flex-1 gap-1">
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
                                <ClickableTab
                                    onClick={()=>setShowFullLogs(true)}
                                >
                                    <AppTypography
                                        textColor={theme.colors.text.primary}
                                        size={TypographySize.HL}
                                    >
                                        <MdFullscreen />
                                    </AppTypography>
                                </ClickableTab>
                            </Flex>
                        </Flex>
                        <Flex
                            padding="5px 5px"
                        >
                            <AppTypography
                                ellipsis
                                maxLines={5}
                            >
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                            </AppTypography>
                        </Flex>
                    </div>
                    <AllLogs 
                        display={showFullLogs}
                        setDisplay={setShowFullLogs}
                    />
                </div>
            </Slidein>
        </Flex>
    )
}
export default Logs