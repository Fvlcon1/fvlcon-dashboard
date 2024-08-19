'use client'

import History from "@/app/components/history/history"
import ImageContainer from "@components/imageContainer/imageContainer"
import { imageUploadContext } from "@/context/imageUpload"
import Button from "@components/button/button"
import Flex from "@styles/components/flex"
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import { RiOrganizationChart } from "react-icons/ri"
import DistinctFaces from "./distinct faces/distinctFaces"
import Logs from "./logs/logs"
import Matches from "./matches/matches"
import Metadata from "./metadata"
import { isImageFile, isVideoFile } from "@/utils/getFileType"
import VideoContainer from "@components/video container/videoContainer"
import ListFaces from "@components/listFaces";
import VideoAnalysis from "@components/VideoAnalysis";
import segmentFaces from "@/utils/segmentFaces"
import { canvasTypes, checkedFaceType, FetchState } from "@/utils/@types"
import checkFace from "@/utils/model/checkface"
import { getAllFaces } from "@/utils/model/getallFaces"
import { getSingleFace } from "@/utils/model/getSingleFace"
import checkEachFace from "@/utils/model/checkEachFace"

const Main = () => {
    const {
        selectedImage,
        setSelectedImage,
    } = useContext(imageUploadContext)

    const [displayMatches, setDisplayMatches] = useState(false)
    const [displayFaces, setDisplayFaces] = useState(false)
    const [fileExtension, setFileExtension] = useState<string>()
    const [distinctFaces, setDistinctFaces] = useState<FetchState<canvasTypes[]>>({
        isEmpty : false,
        isLoading : false,
    })
    const [matchedFaces, setMatchedFaces] = useState<FetchState<checkedFaceType[]>>({
        isEmpty : false,
        isLoading : false
    })
    const imageRef = useRef<HTMLImageElement>(null);

    let imageSplit = []
    let filename = undefined
    let fileEx : any = undefined

    const handleAnalyze = async () => {
        setDistinctFaces({isLoading : true})
        setDisplayFaces(true)
        if(selectedImage && imageRef.current !== null){
            const faces = await segmentFaces(selectedImage.url, imageRef)
            if(faces){
                if(faces.length === 0){
                    setDistinctFaces({isEmpty : true})
                } else {
                    setDistinctFaces({data : faces})   
                }
            } else {
                setDistinctFaces({isEmpty : true})
            }
        } else {
            setDistinctFaces({error : "No image selected"})
            console.log("No Image Selected")
        }
    }

    const handleFalconize = async () => {
        setMatchedFaces({isLoading : true})
        setDisplayMatches(true);
        if(distinctFaces.data){
            const faces = await checkEachFace(distinctFaces);
            if (faces && faces.length > 0) {
                const validFaces = faces.filter(face => face !== undefined) as checkedFaceType[];
                setMatchedFaces({data : validFaces});
            } else {
                setMatchedFaces({isEmpty : true})
            }
        } else {
            setMatchedFaces({error : 'No Image Selected'})
        }
    };

    useEffect(()=> {
        if(selectedImage){
            imageSplit = selectedImage.name.split('.')
            filename = imageSplit[0]
            fileEx = imageSplit[imageSplit.length - 1] 
            setFileExtension(fileEx)
        }
    },[selectedImage])

    return (
        <div  className="w-full items-center flex flex-col flex-1 h-[100vh] pb-4 gap-1">
            <img ref={imageRef} className="hidden" src={selectedImage?.url}/>
            <Flex
                direction="column"
                gap={4}
                maxWidth="1080px"
            >
                <div className="w-full bg-gradient-container h-[500px] rounded-2xl p-4">
                    {
                        selectedImage && fileExtension && isVideoFile(fileExtension) ?
                        <VideoContainer 
                            video={selectedImage}
                        />
                        :
                        <Flex
                            gap={15}
                        >
                            {
                                selectedImage && fileExtension && isImageFile(fileExtension) ?
                                <ImageContainer 
                                    image={selectedImage}
                                />
                                :
                                <ImageContainer />
                            }
                            <ImageContainer />
                        </Flex>
                    }
                </div>
                <Flex
                    padding="0 18px"
                    direction="column"
                    gap={12}
                    margin="-120px 0 0 0"
                >
                    <Flex 
                        width="fit-content"
                    >
                        <Button 
                            text="Analyze"
                            icon={<RiOrganizationChart className="mt-[-1px]"/>}
                            onClick={handleAnalyze}
                        />
                        <Button 
                            text="Fvlconize ➜"
                            onClick={handleFalconize}
                        />
                    </Flex>
                    <Flex>
                        {
                            displayMatches &&
                            <Logs />
                        }
                        {
                            selectedImage &&
                            <Metadata />
                        }
                    </Flex>
                    {
                        displayMatches &&
                        <Matches 
                            faces={matchedFaces}
                            onTryAgain={handleFalconize}
                        />
                    }
                    {
                        displayFaces &&
                        <DistinctFaces 
                            faces={distinctFaces}
                            onTryAgain={handleAnalyze}
                        />
                    }
                    <History />
                </Flex>
            </Flex>
        </div>
    )
}
export default Main