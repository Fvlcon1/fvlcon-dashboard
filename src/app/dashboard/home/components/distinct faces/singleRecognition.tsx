import { Dispatch, SetStateAction } from "react"
import SingularRecognitionWindow from "../singular recognition/singularRecognitionWindow"
import Flex from "@styles/components/flex"
import { checkedFaceType, FetchState } from "@/utils/@types"
import Loading from "../loading"
import TryAgain from "../tryAgain"
import MatchCard from "../matches/MatchCard"

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
            <SingularRecognitionWindow
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
                        <Flex
                            justify="center"
                            padding="20px"
                        >
                            <MatchCard
                                originalImage={face.data.originalImage}
                                matchedImage={face.data.matchedImage}
                                similarity={face.data.similarity}
                                title={`Match`}
                                rightButtonTitle="➜"
                                description="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                            />
                        </Flex>
                    }
                </Flex>
            </SingularRecognitionWindow>
        </>
    )
}

export default SingleRecognition