import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Tooltip } from "antd"
import { CgLivePhoto } from "react-icons/cg"
import { FaCamera, FaMap, FaRegCircleStop } from "react-icons/fa6"
import { MdDelete, MdFullscreen } from "react-icons/md"
import { RiMenu2Fill } from "react-icons/ri"
import Map from "./map"
import { RefObject, useState } from "react"
import snapshotComponent from "@components/snapshotComponent/snapshotComponent"
import { IoVideocam } from "react-icons/io5"
import Text from "@styles/components/text"
import { formatTime } from "@/utils/formatTime"

const Controls = ({
    id,
    captureScreenshot,
    handleRecord,
    isRecording,
    timer
} : {
    id : string
    captureScreenshot : ()=>void
    handleRecord : ()=>void
    isRecording : boolean
    timer? : number
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
                    <div className="">
                        <Flex
                            width="fit-content"
                            align="center"
                            gap={4}
                        >
                                <AppTypography>
                                    <CgLivePhoto color={'green'}/>
                                </AppTypography>
                            <AppTypography>
                                Live
                            </AppTypography>
                        </Flex>
                    </div>
                    {
                        isRecording ?
                        <div className="flex gap-1 items-center">
                            <ClickableTab
                                className="!p-[6px] animate-pulse"
                                onClick={handleRecord}
                            >
                                <Tooltip title="Stop">
                                    <FaRegCircleStop 
                                        color={'#bf3434'}
                                        size={14}
                                    />
                                </Tooltip>
                            </ClickableTab>
                            <Text>
                                {formatTime(timer ?? 0)}
                            </Text>
                        </div>
                        :
                        <ClickableTab
                            className="!p-[6px]"
                            onClick={handleRecord}
                        >
                            <Tooltip title="Record">
                                <IoVideocam 
                                    color={theme.colors.text.secondary}
                                    size={16}
                                />
                            </Tooltip>
                        </ClickableTab>
                    }
                    <Text
                        textColor={theme.colors.text.tetiary}
                    >
                        |
                    </Text>
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
                            onClick={captureScreenshot}
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
                                size={15}
                            />
                        </ClickableTab>
                    </div>
                </Flex>
            </div>
        </div> 
    )
}
export default Controls