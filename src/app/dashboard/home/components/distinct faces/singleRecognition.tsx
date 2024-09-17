import { Dispatch, SetStateAction } from "react"
import Flex from "@styles/components/flex"
import { checkedFaceType, FetchState } from "@/utils/@types"
import Loading from "../loading"
import TryAgain from "../tryAgain"
import MatchCard from "../matches/MatchCard"
import OverlayWindow from "@components/window/overlayWindow"
import ExpandMatchComponent from "../matches/expandMatchComponent"

const SingleRecognition = ({
    displaySingularAnalysis,
    setDisplaySingularAnalysis,
    face,
    onTryAgain
} : {
    setDisplaySingularAnalysis: Dispatch<SetStateAction<boolean>>
    displaySingularAnalysis : boolean
    face : FetchState<checkedFaceType>
    onTryAgain : ()=> void
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
                        />
                    }
                </Flex>
            </OverlayWindow>
        </>
    )
}

export default SingleRecognition