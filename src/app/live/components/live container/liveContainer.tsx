import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Tooltip } from "antd"
import { CgLivePhoto } from "react-icons/cg"
import { MdFullscreen } from "react-icons/md"
import { RiMenu2Fill } from "react-icons/ri"
import Controls from "./controls"

const LiveContainer = () => {
    return (
        <div 
            className="bg-bg-secondary relative rounded-lg flex-1 h-[250px] overflow-hidden "
        >
            <Controls />  
        </div>
    )
}
export default LiveContainer