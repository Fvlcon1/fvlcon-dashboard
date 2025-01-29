'use client'

import React, { useEffect, useState } from "react"
import { Dispatch, SetStateAction } from "react"
import Flex from "@styles/components/flex"
import { checkedFaceType, FetchState, occurance } from "@/utils/@types"
import Loading from "../loading"
import TryAgain from "../tryAgain"
import MatchCard from "../matches/MatchCard"
import OverlayWindow from "@components/window/overlayWindow"
import ExpandMatchComponent from "../matches/expandMatchComponent"
import NiaRecord from "@components/records/NIA record/niaRecord"

const SingleRecognition = ({
    displaySingularAnalysis,
    setDisplaySingularAnalysis,
    face,
    onTryAgain,
    setOccurance,
    currentOccurance
} : {
    setDisplaySingularAnalysis: Dispatch<SetStateAction<boolean>>
    displaySingularAnalysis : boolean
    face : FetchState<checkedFaceType>
    onTryAgain : ()=> void
    setOccurance: Dispatch<SetStateAction<occurance | undefined>>
    currentOccurance?: occurance
}) => {
    const [expand, setExpand] = useState(false)

    useEffect(()=>{
        if(face.data?.details){
            setExpand(true)
        } else {
            setExpand(false)
        }
    },[face])
    return (
        <>
            {/* <NiaRecord
                visible={expand}
                setVisible={setExpand}
                data={face.data?.details}
            /> */}
            {
                !face.data?.details &&
                <OverlayWindow
                    display={displaySingularAnalysis}
                    setDisplay={setDisplaySingularAnalysis}
                    title="Fvlconize"
                >
                    <Flex
                        gap={20}
                    >
                        {
                            face.isLoading ?
                            <Loading
                                title="Fvlconizing..."
                            />
                            :
                            face.error ?
                            <TryAgain
                                title="🚫 Error"
                                description={face.error}
                                onTryAgain={onTryAgain}
                            />
                            :
                            face.isEmpty ?
                            <TryAgain 
                                title="No Match found"
                                onTryAgain={onTryAgain}
                            />
                            :
                            <></>
                        }
                    </Flex>
                </OverlayWindow>
            }
        </>
    )
}

export default SingleRecognition