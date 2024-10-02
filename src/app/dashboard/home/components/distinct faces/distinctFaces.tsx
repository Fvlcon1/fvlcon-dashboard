import React, { Dispatch, SetStateAction } from "react"
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
import { Fragment, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion';
import Angles from "./angles"
import Controls from "./controls"
import AllFaces from "./allFaces"
import { canvasTypes, checkedFaceType, FetchState, occurance } from '../../../../../utils/@types';
import { Spin } from "antd"
import Loading from "../loading"
import TryAgain from "../tryAgain"
import checkEachFace, { runRecognitionOnSingleFace } from "@/utils/model/checkEachFace"
import SingleRecognition from "./singleRecognition"

const DistinctFaces = ({
    faces,
    onTryAgain,
    onClear,
    onClose,
    setOccurance,
    currentOccurance
} : { 
    faces : FetchState<canvasTypes[]>
    onTryAgain : () => void
    onClear? : ()=>void
    onClose? : ()=>void
    setOccurance: Dispatch<SetStateAction<occurance | undefined>>
    currentOccurance?: occurance
}) => {
    const [displayFaces, setDisplayFaces] = useState(false)
    const [displayAngles, setDisplayAngles] = useState(false)
    const [displaySingularAnalysis, setDisplaySingularAnalysis] = useState(false)
    const [selectedFace, setSelectedFace] = useState<canvasTypes>()
    const [matchedFace, setMatchedFace] = useState<FetchState<checkedFaceType>>({
        isEmpty : false,
        isLoading : false
    })

    const handleFvlconize = async (face : canvasTypes) => {
        setSelectedFace(face)
        setDisplaySingularAnalysis(true)
        setMatchedFace(prev => ({
            ...prev,
            isLoading : true,
        }))
        const faces = await runRecognitionOnSingleFace(face);
        if (faces) {
            setMatchedFace({data : faces});
        } else {
            setMatchedFace({isEmpty : true})
        }
    }
    return (
        <>
            <SingleRecognition 
                displaySingularAnalysis={displaySingularAnalysis}
                setDisplaySingularAnalysis={setDisplaySingularAnalysis}
                face={matchedFace}
                onTryAgain={selectedFace ? ()=>handleFvlconize(selectedFace) : ()=>{}}
                currentOccurance={currentOccurance}
                setOccurance={setOccurance}
            />
            <motion.div
                className="w-full relative min-h-[200px] flex flex-col flex-1 gap-1"
                initial={{
                    y : -20,
                    opacity : 0
                }}
                animate={{
                    y : 0,
                    opacity : 1
                }}
            >
                <div className="w-full absolute z-[-1] top-0 bg-gradient-container h-[220px] rounded-lg">
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
                                faces.isLoading ?
                                <Loading 
                                    title="Segmenting faces"
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
                                    title="No faces detected"
                                    onTryAgain={onTryAgain}
                                />
                                :
                                faces.data && 
                                <>
                                    {
                                        [...faces.data].map((item, index : number) => (
                                            <ImageCard 
                                                key={index}
                                                imageURL={item.dataUrl}
                                                title={`Face ${index + 1}`}
                                                rightButtonTitle="View angles"
                                                rightButtonClick={()=>setDisplayAngles(true)}
                                                MiddleButtonTitle="Fvlconize ➜"
                                                MiddleButtonClick={()=>handleFvlconize(item)}
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
                <AllFaces 
                    display={displayFaces}
                    setDisplay={setDisplayFaces}
                    faces={faces.data}
                />
            }
            <Angles
                display={displayAngles}
                setDisplay={setDisplayAngles}
            />
        </>
    )
}
export default DistinctFaces