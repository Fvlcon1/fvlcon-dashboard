'use client'

import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { IoMdArrowDropdown } from "react-icons/io"
import Profile from "./profile container/profile"
import Button from "@components/button/button"
import AnalysisResults from "./analysis results/analysisResults"
import Skeleton from "react-loading-skeleton"
import { useEffect, useState } from "react"
import useWebSocket from "@/utils/useWebsocket"
import { getUserDetailsFromTrackingData } from "../utils/getUserDetailsFromTrackingData"
import { IPersonTrackingType, IPersonTrackingWithImageType } from "@/app/tracking/components/types"

const Right = () => {
    const [analysisResults, setAnalysisResults] = useState(true)
    const { messages } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, message => onMessageUpdate(message));
    const [isMessageUpdated, setIsMessageUpdated] = useState(false)
    const [detections, setDetections] = useState<IPersonTrackingWithImageType[]>([])

    const onMessageUpdate = async (message : any) => {
        console.log("updated")
        setIsMessageUpdated(true)
        const getDetails = await getUserDetailsFromTrackingData(message)
        if(getDetails){
            setDetections(prev => [...prev, getDetails])
        }
        setIsMessageUpdated(false)
    }

    useEffect(()=>{
        console.log({detections})
    },[detections])

    return (
        <div className="fixed top-0 right-[60px] w-[210px] h-[100vh] py-4 px-6 gap-3">
            <Flex
                direction="column"
                height="100%"
                gap={20}
            >
                <Flex
                    justify="flex-end"
                >
                    <Button
                        text="Clear"
                    />
                </Flex>
                <div className="flex flex-col w-full h-full rounded-lg gap-1 bg-gradient-container items-center px-2 p-1 overflow-y-auto">
                    {
                        isMessageUpdated &&
                        <div className="w-full">
                            <Skeleton
                                height={100}
                                baseColor={theme.colors.bg.tetiary}
                                highlightColor={theme.colors.bg.alt1}
                            />
                        </div>
                    }
                    {
                        analysisResults ?
                        [...detections].reverse().map((item, index : number) => (
                            <AnalysisResults 
                                key={index}
                                detections={item}
                            />
                        ))
                        :
                        [1,2,3,4,5,6].map((item, index : number) => (
                            <div key={index} className="flex flex-col w-full gap-1">
                                <Skeleton
                                    height={100}
                                    baseColor={theme.colors.bg.tetiary}
                                    highlightColor={theme.colors.bg.alt1}
                                />
                                <Skeleton
                                    baseColor={theme.colors.bg.tetiary}
                                    highlightColor={theme.colors.bg.alt1}
                                />
                                <Skeleton
                                    width={'50%'}
                                    baseColor={theme.colors.bg.tetiary}
                                    highlightColor={theme.colors.bg.alt1}
                                />
                            </div>
                        ))
                    }
                </div>
            </Flex>
        </div>
    )
}
export default Right