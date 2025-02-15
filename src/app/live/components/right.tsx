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
import { useContext, useEffect, useState } from "react"
import useWebSocket from "@/utils/useWebsocket"
import { getUserDetailsFromTrackingData } from "../utils/getUserDetailsFromTrackingData"
import { IPersonTrackingType, IPersonTrackingWithImageType, IPlateTrackingType } from "@/app/tracking/components/types"
import Divider from "@components/divider/divider"
import NoData from "@components/NoData/noData"
import DvlaRecord from "@components/records/dvlaRecord/dvlaRecord"
import { liveComponentsContext } from "./context"
import { simulatedPlates } from "./simulatedPlates"

const Right = () => {
    const [analysisResults, setAnalysisResults] = useState(true)
    const { messages } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, message => onMessageUpdate(message));
    const [isMessageUpdated, setIsMessageUpdated] = useState(false)
    const [detections, setDetections] = useState<(IPersonTrackingWithImageType | IPlateTrackingType)[]>([])

    const onMessageUpdate = async (message : any) => {
        setIsMessageUpdated(true)
        const getDetails = await getUserDetailsFromTrackingData(message)
        console.log({getDetails})
        if(getDetails){
            setDetections(prev => [...prev, getDetails])
        }
        setIsMessageUpdated(false)
    }

    const runSimulation = () => {
        simulatedPlates.forEach((plate, index) => {
            setTimeout(() => {
                onMessageUpdate(plate);
            }, index * 5000);
        });
    };    

    useEffect(()=>{
        runSimulation()
    },[])

    return (
        <>
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
                            onClick={()=>setDetections([])}
                        />
                    </Flex>
                    <div className={`flex flex-col w-full h-full rounded-lg gap-1 ${detections.length ? 'bg-gradient-container-md border-bg-secondary' : 'bg-bg-secondary border-bg-quantinary'} border-solid border-[1px] items-center px-2 p-1 overflow-y-auto`}>
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
                            detections.length ?
                            [...detections].reverse().map((item, index : number) => (
                                <>
                                    <AnalysisResults 
                                        key={index}
                                        detections={item.type === "person" ? item as IPersonTrackingType : undefined}
                                        plateDetections={item.type === "plate" ? item as IPlateTrackingType: undefined}
                                    />
                                    {index !== (detections.length - 1) && <Divider />}
                                </>
                            ))
                            : !isMessageUpdated &&
                            <NoData />
                        }
                    </div>
                </Flex>
            </div>
        </>
    )
}
export default Right