import OverlayWindow from "@components/window/overlayWindow"
import { Dispatch, ReactNode, SetStateAction } from "react";

const SingularRecognitionWindow = ({ 
    display, 
    setDisplay,
    title,
    children
 }: {
    display: boolean;
    setDisplay: Dispatch<SetStateAction<boolean>>;
    title? : string
    children? : ReactNode
}) => {
    return (
        <>
            <OverlayWindow
                display={display}
                setDisplay={setDisplay}
                title={title}
            >
                {children}
            </OverlayWindow>
        </>
    )
}

export default SingularRecognitionWindow