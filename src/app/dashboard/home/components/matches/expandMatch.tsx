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
        <AnimatePresence>
            {
                display &&
                    <Overlay
                        onClick={()=>setDisplay(false)}
                    >
                        <Window
                            open={display}
                            setOpen={setDisplay}
                            title="All Matches"
                        >
                            <div className="flex justify-center items-center h-[80%]">
                                <div className="flex gap-2 h-full w-full p-4 justify-between">
                                    <div className="flex">
                                        <MatchCard
                                            originalImage={match.originalImage}
                                            matchedImage={match.matchedImage}
                                            similarity={match.similarity}
                                            description={match.matchedPerson}
                                            showExpand={false}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 gap-1 p-4 rounded-md bg-gradient-container-black-50 w-full">
                                        <div className="flex items-center gap-2">
                                            <TbListDetails 
                                                color={theme.colors.text.primary}
                                            />
                                            <AppTypography
                                                textColor={theme.colors.text.primary}
                                            >
                                                Details Here
                                            </AppTypography>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <AppTypography>
                                                Name : {match.matchedPerson}
                                            </AppTypography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Window>
                    </Overlay>
            }
        </AnimatePresence>
    )
}
export default ExpandMatch