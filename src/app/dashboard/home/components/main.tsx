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
import { canvasTypes, checkedFaceType } from "@/utils/@types"
import checkFace from "@/utils/model/checkface"
import { getAllFaces } from "@/utils/model/getallFaces"
import { getSingleFace } from "@/utils/model/getSingleFace"

const Main = () => {
    const {
        selectedImage,
        setSelectedImage,
    } = useContext(imageUploadContext)

    const [displayMatches, setDisplayMatches] = useState(false)
    const [displayFaces, setDisplayFaces] = useState(false)
    const [fileExtension, setFileExtension] = useState<string>()
    const [distinctFaces, setDistinctFaces] = useState<canvasTypes[]>()
    const [matchedFaces, setMatchedFaces] = useState<checkedFaceType[]>()
    const imageRef = useRef<HTMLImageElement>(null);

    let imageSplit = []
    let filename = undefined
    let fileEx : any = undefined

    const handleAnalyze = async () => {
        setDistinctFaces(undefined)
        setDisplayFaces(true)
        if(selectedImage && imageRef.current !== null){
            const faces = await segmentFaces(selectedImage.url, imageRef)
            if(faces) setDistinctFaces(faces)
        } else {
            console.log("no imageRef")
        }
    }

    const handleFalconize = async () => {
        setMatchedFaces(undefined)
        setDisplayMatches(true);
        const allFaces = await getAllFaces()
        if (distinctFaces) {
            const checkEachFace = async (): Promise<(checkedFaceType | null)[]> => {
                const results = await Promise.all(
                    distinctFaces.map(async (item) => {
                        const checkedFace = await checkFace(item.dataUrl);
                        if (checkedFace) {
                            if(allFaces){
                                const getFace = allFaces.filter((item : any, index : number) => item.ExternalImageId === checkedFace.result.matchedPerson)
                                if(getFace){
                                    const singleFace = await getSingleFace(getFace[0].FaceId)
                                    return {
                                        originalImage: item.dataUrl,
                                        matchedImage : singleFace,
                                        matchedPerson: checkedFace.result.matchedPerson,
                                        similarity: checkedFace.result.similarity,
                                    };
                                }
                                console.log({getFace})
                            }
                            return {
                                originalImage: item.dataUrl,
                                matchedPerson: checkedFace.result.matchedPerson,
                                similarity: checkedFace.result.similarity,
                            };
                        } else {
                            console.log("No matched faces");
                            return null;
                        }
                    })
                );
                return results;
            };
    
            const faces = await checkEachFace();
            if (faces && faces.length > 0) {
                const validFaces = faces.filter(face => face !== null) as checkedFaceType[];
                setMatchedFaces(validFaces);
            }
        } else {
            console.log("No segmented faces available");
        }
    };

    useEffect(()=> {
        if(selectedImage){
            imageSplit = selectedImage.name.split('.')
            filename = imageSplit[0]
            fileEx = imageSplit[imageSplit.length - 1] 
            setFileExtension(fileEx)
            console.log({exten : isVideoFile(fileEx)})
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
                        />
                    }
                    {
                        displayFaces &&
                        <DistinctFaces 
                            faces={distinctFaces}
                        />
                    }
                    <History />
                </Flex>
            </Flex>
        </div>
    )
}
export default Main