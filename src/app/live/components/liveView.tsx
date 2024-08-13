import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Tooltip } from "antd"
import { CgLivePhoto } from "react-icons/cg"
import { MdFullscreen } from "react-icons/md"
import { RiMenu2Fill } from "react-icons/ri"
import LiveContainer from "./live container/liveContainer"

const LiveView = () => {
    return (
        <div className="grid grid-cols-3 gap-2 w-full">
            {
                [1,2,3,4,5,6,7,8,9].map((item, index : number) => (
                    <LiveContainer 
                        key={index}
                    />
                ))
            }
        </div>
    )
}
export default LiveView