import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold } from "@styles/style.types"
import { AnimatePresence } from "framer-motion"
import { Dispatch, SetStateAction } from "react"
import ImageCard from "./imageCard"

const Angles = ({
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
                            title="All Angels"
                        >
                            <Flex
                                direction="column"
                                padding="15px"
                            >
                                <Flex
                                    margin="0 0 0 10px"
                                >
                                    <AppTypography
                                        bold={TypographyBold.md}
                                    >
                                        5 Angles
                                    </AppTypography>
                                </Flex>
                                <Flex
                                    flexWrap
                                    gap={30}
                                    justify="space-around"
                                >
                                    {
                                        // [1,2,3,4,5].map((item, index) => (
                                        //     <ImageCard
                                        //         key={index}
                                        //         title="Front"
                                        //     />
                                        // ))
                                    }
                                </Flex>
                            </Flex>
                        </Window>
                    </Overlay>
            }
        </AnimatePresence>
    )
}
export default Angles