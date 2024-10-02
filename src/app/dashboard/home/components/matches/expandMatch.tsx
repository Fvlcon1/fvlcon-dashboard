import { Dispatch, SetStateAction } from "react"
import { checkedFaceType, occurance } from "@/utils/@types"
import OverlayWindow from "@components/window/overlayWindow"
import ExpandMatchComponent from "./expandMatchComponent"

const ExpandMatch = ({
    display, 
    setDisplay,
    match,
    setOccurance,
    currentOccurance
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
    match : checkedFaceType
    setOccurance: Dispatch<SetStateAction<occurance | undefined>>
    currentOccurance?: occurance
}) => {
    return (
        <OverlayWindow
            display={display}
            setDisplay={setDisplay}
            title="All Matches"
        >
            <ExpandMatchComponent 
                match={match}
                currentOccurance={currentOccurance}
                setOccurance={setOccurance}
            />
        </OverlayWindow>
    )
}
export default ExpandMatch