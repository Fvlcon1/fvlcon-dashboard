import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Tooltip } from "antd"
import { CgLivePhoto } from "react-icons/cg"
import { FaCamera, FaMap } from "react-icons/fa6"
import { MdDelete, MdFullscreen } from "react-icons/md"
import { RiMenu2Fill } from "react-icons/ri"
import Map from "./map"
import { RefObject, useState } from "react"
import snapshotComponent from "@components/snapshotComponent/snapshotComponent"

const Controls = ({
    id
} : {
    id : string
}) => {
    const [showMap, setShowMap] = useState(false)
    return (
        <div className="w-full abosolute z-10 top-0 bg-bg-quantinary h-[30px] rounded-t-lg flex gap-1 items-center px-2">
            <div className="flex w-full justify-between items-center">
                <Flex
                    width="fit-content"
                    align="center"
                    gap={2}
                >
                    <ClickableTab
                        className="!p-[6px]"
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
                    <div className="flex items-center">
                        <div className="relative">
                            <Map 
                                show={showMap}
                                setShow={setShowMap}
                            />
                            <ClickableTab
                                className="!p-[6px]"
                                onClick={()=>setShowMap(prev => !prev)}
                            >
                                <FaMap 
                                    color={theme.colors.text.secondary}
                                    size={13}
                                />
                            </ClickableTab>
                        </div>
                        <ClickableTab
                            className="!p-[6px]"
                            onClick={()=>snapshotComponent(id)}
                        >
                            <FaCamera 
                                color={theme.colors.text.secondary}
                                size={13}
                            />
                        </ClickableTab>
                        <ClickableTab
                            className="!p-[6px]"
                        >
                            <MdDelete 
                                color={theme.colors.text.secondary}
                                size={13}
                            />
                        </ClickableTab>
                    </div>
                </Flex>
            </div>
        </div> 
    )
}
export default Controls