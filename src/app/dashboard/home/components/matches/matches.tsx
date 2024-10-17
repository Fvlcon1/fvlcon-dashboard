import React, { Dispatch, SetStateAction, useEffect } from "react"
import Flex from "@styles/components/flex"
import MatchCard from "./MatchCard"
import { useState } from "react"
import { motion } from 'framer-motion';
import Controls from "./controls"
import AllMatches from "./allMatches"
import { checkedFaceType, FetchState, fvlconizedFaceType } from "@/utils/@types"
import Loading from "../loading"
import TryAgain from "../tryAgain"
import { occurance } from '../../../../../utils/@types';

const Matches = ({
    faces,
    onTryAgain,
    onClear,
    onClose,
    currentOccurance,
    setOccurance
} : { 
    faces : FetchState<checkedFaceType[]>
    onTryAgain : () => void
    onClear? : () => void
    onClose? : ()=>void
    currentOccurance?: occurance
    setOccurance: Dispatch<SetStateAction<occurance | undefined>>
}) => {
    const [displayFaces, setDisplayFaces] = useState(false)
    const [sortedFaces, setSortedFaces] = useState<checkedFaceType[]>([])
    const sortMatches = () => {
        const matches : checkedFaceType[] = []
        const unmatched : checkedFaceType[] = []
        faces.data?.map((face, index) => {
            if(face.matchedPerson)
                return matches.push(face)
            unmatched.push(face)
        })
        setSortedFaces([...matches, ...unmatched])
        console.log([...matches, ...unmatched])
    }

    useEffect(()=>{
        sortMatches()
    },[faces])
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
                                faces.isLoading ?
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
                                        // faces.isLoading &&
                                        // <div className="flex bg-bg-primary rounded-md min-w-[200px] h-[150px] justify-center items-center">
                                        //     <Spin size="small"/>
                                        // </div>
                                    }
                                    {
                                        sortedFaces.map((item, index : number) => (
                                            <MatchCard
                                                originalImage={item.originalImage}
                                                matchedImage={item.matchedImage}
                                                similarity={item.similarity}
                                                key={index}
                                                title={`Match ${index + 1}`}
                                                description={item.matchedPerson}
                                                details={item.details}
                                                occurances={item.occurances}
                                                currentOccurance={currentOccurance}
                                                setOccurance={setOccurance}
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
                    currentOccurance={currentOccurance}
                    setOccurance={setOccurance}
                />
            }
        </>
    )
}
export default Matches