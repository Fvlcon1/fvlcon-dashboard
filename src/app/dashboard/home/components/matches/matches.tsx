import getDate from "@/utils/getDate"
import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { MdCancel, MdFullscreen } from "react-icons/md"
import MatchCard from "./MatchCard"
import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion';
import Controls from "./controls"
import AllMatches from "./allMatches"
import { canvasTypes, checkedFaceType, FetchState } from "@/utils/@types"
import { Spin } from "antd"
import Loading from "../loading"
import TryAgain from "../tryAgain"

const Matches = ({
    faces,
    onTryAgain,
    onClear,
    onClose
} : { 
    faces : FetchState<checkedFaceType[]>
    onTryAgain : () => void
    onClear? : () => void
    onClose? : ()=>void
}) => {
    const [displayFaces, setDisplayFaces] = useState(false)
    const [displayAngels, setDisplayAngels] = useState(false)
    return (
        <>
            <motion.div  
                className="w-full relative flex flex-col flex-1 gap-1 min-h-[220px]"
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
                <div className="w-full rounded-lg px-3 py-2 flex flex-col gap-2">
                    <Controls 
                        setDisplayWindow={setDisplayFaces}
                        onClear={onClear}
                        tryAgain={onTryAgain}
                        onClose={onClose}
                    />
                    <div className="w-full overflow-x-auto">
                        <Flex
                            gap={20}
                        >
                            {
                                faces.isLoading && !faces.data ?
                                <Loading 
                                    title="Fvlconizing..."
                                />
                                :
                                faces.error ?
                                <TryAgain
                                    title="🚫 Error"
                                    description={faces.error}
                                    onTryAgain={onTryAgain}
                                />
                                :
                                faces.isEmpty ?
                                <TryAgain 
                                    title="No Match found"
                                    onTryAgain={onTryAgain}
                                />
                                :
                                faces.data && 
                                <>
                                    {
                                        faces.isLoading &&
                                        <div className="flex bg-bg-primary rounded-md min-w-[200px] h-[150px] justify-center items-center">
                                            <Spin size="small"/>
                                        </div>
                                    }
                                    {
                                        [...faces.data].reverse().map((item, index : number) => (
                                            <MatchCard
                                                originalImage={item.originalImage}
                                                matchedImage={item.matchedImage}
                                                similarity={item.similarity}
                                                key={index}
                                                title={`Match ${index + 1}`}
                                                description={item.matchedPerson}
                                                showExpand
                                            />
                                        ))
                                    }
                                </>
                            }
                        </Flex>
                    </div>
                </div>
            </motion.div>
            {
                faces.data &&
                <AllMatches 
                    display={displayFaces}
                    setDisplay={setDisplayFaces}
                    faces={faces.data}
                />
            }
        </>
    )
}
export default Matches