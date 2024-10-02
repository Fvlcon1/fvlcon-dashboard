import React from "react"
import { Dispatch, SetStateAction } from "react"
import Flex from "@styles/components/flex"
import { checkedFaceType, FetchState, occurance } from "@/utils/@types"
import Loading from "../loading"
import TryAgain from "../tryAgain"
import MatchCard from "../matches/MatchCard"
import OverlayWindow from "@components/window/overlayWindow"
import ExpandMatchComponent from "../matches/expandMatchComponent"

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
    return (
        <>
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
                        face.data &&
                        <ExpandMatchComponent 
                            match={face.data}
                            currentOccurance={currentOccurance}
                            setOccurance={setOccurance}
                        />
                    }
                </Flex>
            </OverlayWindow>
        </>
    )
}

export default SingleRecognition