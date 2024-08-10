'use client'

import History from "@/app/components/history/history"
import ImageContainer from "@/app/components/imageContainer/imageContainer"
import { imageUploadContext } from "@/context/imageUpload"
import Button from "@components/button/button"
import Flex from "@styles/components/flex"
import { useContext, useState } from "react"
import { RiOrganizationChart } from "react-icons/ri"
import DistinctFaces from "./distinct faces/distinctFaces"
import Logs from "./logs/logs"
import Matches from "./matches/matches"
import Metadata from "./metadata"

const Main = () => {
    const {
        selectedImage,
        setSelectedImage
    } = useContext(imageUploadContext)
    const [displayMatches, setDisplayMatches] = useState(false)
    const [displayFaces, setDisplayFaces] = useState(false)
    return (
        <div  className="w-full items-center flex flex-col flex-1 h-[100vh] pb-4 gap-1">
            <Flex
                direction="column"
                gap={4}
                maxWidth="1080px"
            >
                <div className="w-full bg-gradient-container h-[500px] rounded-2xl p-4">
                    <Flex
                        gap={15}
                    >
                        <ImageContainer 
                            image={selectedImage}
                        />
                        <ImageContainer />
                    </Flex>
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
                            onClick={()=>setDisplayFaces(true)}
                        />
                        <Button 
                            text="Fvlconize ➜"
                            onClick={()=>setDisplayMatches(true)}
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
                        <Matches />
                    }
                    {
                        displayFaces &&
                        <DistinctFaces />
                    }
                    <History />
                </Flex>
            </Flex>
        </div>
    )
}
export default Main