import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold, TypographySize } from "@styles/style.types"
import { AnimatePresence } from "framer-motion"
import { Dispatch, SetStateAction } from "react"
import MatchCard from "./MatchCard"
import { checkedFaceType } from "@/utils/@types"
import theme from "@styles/theme"
import { CgDetailsMore } from "react-icons/cg"
import { TbListDetails } from "react-icons/tb"
import OverlayWindow from "@components/window/overlayWindow"
import ExpandMatchComponent from "./expandMatchComponent"

const ExpandMatch = ({
    display, 
    setDisplay,
    match
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
    match : checkedFaceType
}) => {
    return (
        <OverlayWindow
            display={display}
            setDisplay={setDisplay}
            title="All Matches"
        >
            <ExpandMatchComponent 
                match={match}
            />
        </OverlayWindow>
    )
}
export default ExpandMatch