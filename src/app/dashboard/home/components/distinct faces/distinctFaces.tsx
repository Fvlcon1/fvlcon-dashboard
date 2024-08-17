import getDate from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { MdCancel, MdFullscreen } from "react-icons/md"
import ImageCard from "./imageCard"
import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion';
import Angels from "./angels"
import Controls from "./controls"
import AllFaces from "./allFaces"
import { canvasTypes } from '../../../../../utils/@types';
import { Spin } from "antd"

const DistinctFaces = ({
    faces
} : { 
    faces? : canvasTypes[]
}) => {
    const [displayFaces, setDisplayFaces] = useState(false)
    const [displayAngels, setDisplayAngels] = useState(false)
    return (
        <>
            <motion.div
                className="w-full relative flex flex-col flex-1 gap-1"
                initial={{
                    y : -20,
                    opacity : 0
                }}
                animate={{
                    y : 0,
                    opacity : 1
                }}
            >
                <div className="w-full absolute z-[-1] top-0 bg-gradient-container h-[200px] rounded-lg">
                </div>
                <div className="w-full rounded-lg px-3 py-2">
                    <Controls 
                        setDisplayWindow={setDisplayFaces}
                    />
                    <div className="w-full overflow-x-auto">
                        <Flex
                            gap={20}
                        >
                            {
                                faces ?
                                faces.map((item, index : number) => (
                                    <ImageCard 
                                        key={index}
                                        imageURL={item.dataUrl}
                                        title={`Face ${index + 1}`}
                                        rightButtonTitle="View angels"
                                        rightButtonClick={()=>setDisplayAngels(true)}
                                        MiddleButtonTitle="Analyze ➜"
                                    />
                                ))
                                :
                                <motion.div 
                                    className='w-full min-h-[100px] animate-pulse flex justify-center items-center'
                                    initial = {{
                                        y : 20,
                                        opacity : 0,
                                    }}
                                    animate = {{
                                        y : 0,
                                        opacity : 1
                                    }}
                                    transition={{
                                        duration : 1
                                    }}
                                >
                                    <Flex
                                        width="fit-content"
                                        direction="column"
                                        align="center"
                                    >
                                        <Spin size="small"></Spin>
                                        <AppTypography>
                                            Segmenting Faces
                                        </AppTypography>
                                    </Flex>
                                </motion.div>
                            }
                        </Flex>
                    </div>
                </div>
            </motion.div>
            <AllFaces 
                display={displayFaces}
                setDisplay={setDisplayFaces}
            />
            <Angels
                display={displayAngels}
                setDisplay={setDisplayAngels}
            />
        </>
    )
}
export default DistinctFaces