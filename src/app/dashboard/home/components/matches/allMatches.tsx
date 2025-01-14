import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold } from "@styles/style.types"
import { AnimatePresence } from "framer-motion"
import { Dispatch, SetStateAction } from "react"
import MatchCard from "./MatchCard"
import { checkedFaceType, occurance } from "@/utils/@types"

const AllMatches = ({
    display, 
    setDisplay,
    faces,
    setOccurance,
    currentOccurance
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
    faces : checkedFaceType[]
    setOccurance: Dispatch<SetStateAction<occurance | undefined>>
    currentOccurance?: occurance
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
                            <Flex
                                direction="column"
                                padding="15px"
                            >
                                <Flex
                                    margin="0 0 0 25px"
                                >
                                    <AppTypography
                                        bold={TypographyBold.md}
                                    >
                                        Results: 5
                                    </AppTypography>
                                </Flex>
                                <Flex
                                    flexWrap
                                    gap={30}
                                    justify="space-around"
                                >
                                    {
                                        faces.map((item, index : number) => (
                                            <MatchCard
                                                boundedImage={item.boundedImage}
                                                matchedImage={item.matchedImage}
                                                croppedImage={item.croppedImage}
                                                similarity={item.similarity}
                                                key={index}
                                                title={`Match ${index + 1}`}
                                                description={item.matchedPerson}
                                                currentOccurance={currentOccurance}
                                                setOccurance={setOccurance}
                                            />
                                        ))
                                    }
                                </Flex>
                            </Flex>
                        </Window>
                    </Overlay>
            }
        </AnimatePresence>
    )
}
export default AllMatches