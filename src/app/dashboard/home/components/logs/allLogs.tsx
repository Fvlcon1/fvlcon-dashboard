import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold } from "@styles/style.types"
import { AnimatePresence } from "framer-motion"
import { Dispatch, SetStateAction } from "react"

const AllLogs = ({
    display, 
    setDisplay
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
}) => {
    return (
        <AnimatePresence>
            {
                display &&
                    <Overlay
                        onClick={()=>setDisplay(false)}
                    >
                        <Window
                            open={display}
                            setOpen={setDisplay}
                            title="Logs"
                        >
                            <Flex
                                padding="20px"
                            >
                                <AppTypography>
                                    lorem ipsum
                                </AppTypography>
                            </Flex>
                        </Window>
                    </Overlay>
            }
        </AnimatePresence>
    )
}
export default AllLogs