import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import { AnimatePresence } from "framer-motion"
import { Dispatch, ReactNode, SetStateAction } from "react"

const OverlayWindow = ({
    display, 
    setDisplay,
    children,
    title,
    windowStyle,
    icons
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
    children? : ReactNode
    title? : string,
    windowStyle? : string
    icons?: ReactNode[];
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
                        windowStyle={windowStyle}
                        icons={icons}
                    >
                        {children}
                    </Window>
                </Overlay>
            }
        </AnimatePresence>
    )
}
export default OverlayWindow