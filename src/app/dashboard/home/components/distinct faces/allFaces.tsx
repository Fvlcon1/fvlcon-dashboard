import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold } from "@styles/style.types"
import { AnimatePresence } from "framer-motion"
import { Dispatch, SetStateAction } from "react"
import ImageCard from "./imageCard"
import { FaceCanvasType } from "@/utils/getFaceCanvas"

const AllFaces = ({
    display, 
    setDisplay,
    faces
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
    faces : FaceCanvasType[]

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
                        title="All Recognized Faces"
                    >
                        <Flex
                            direction="column"
                            padding="15px"
                        >
                            <Flex>
                                <AppTypography
                                    bold={TypographyBold.md}
                                >
                                    Results: {faces.length}
                                </AppTypography>
                            </Flex>
                            <Flex
                                flexWrap
                                gap={30}
                            >
                                {
                                    faces.map((item, index) => (
                                        <ImageCard
                                            key={index}
                                            croppedImage={item.croppedImage}
                                            boundedImage={item.boundedImage}
                                            title={`Face ${index + 1}`}
                                            MiddleButtonTitle="Fvlconize ➜"
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
export default AllFaces