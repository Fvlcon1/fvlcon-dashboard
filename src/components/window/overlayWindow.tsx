import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import { AnimatePresence } from "framer-motion"
import { Dispatch, ReactNode, SetStateAction } from "react"

const OverlayWindow = ({
    display, 
    setDisplay,
    children,
    title
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
    children? : ReactNode
    title? : string
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
                        title={title}
                    >
                        {children}
                    </Window>
                </Overlay>
            }
        </AnimatePresence>
    )
}
export default OverlayWindow