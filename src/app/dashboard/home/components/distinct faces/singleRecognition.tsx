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
                <OverlayWindow
                    display={displaySingularAnalysis}
                    setDisplay={setDisplaySingularAnalysis}
                    title="Fvlconize"
                >
                    <div className="flex gap-[20px] p-4">
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
                            face.data && 
                                <MatchCard
                                    croppedImage={face.data.croppedImage}
                                    boundedImage={face.data.boundedImage}
                                    matchedImage={face.data.matchedImage}
                                    similarity={face.data.similarity}
                                    title={`Match 1`}
                                    faceId={face.data.details?.FaceId}
                                    description={`${face.data.details?.personDetails.surname ?? ''} ${face.data.details?.personDetails.forenames ?? ''}`}
                                    details={face.data.details}
                                    occurances={face.data.occurances}
                                    currentOccurance={currentOccurance}
                                    setOccurance={setOccurance}
                                    showExpand
                                />
                        }
                    </div>
                </OverlayWindow>
            }
        </>
    )
}

export default SingleRecognition