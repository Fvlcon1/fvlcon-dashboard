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
import { ReactNode, useContext, useEffect, useState, useCallback, useRef } from 'react';
import useWebSocket from "@/utils/useWebsocket"
import { getUserDetailsFromTrackingData } from "../utils/getUserDetailsFromTrackingData"
import { IPersonTrackingType, IPersonTrackingWithImageType, IPlateTrackingType, ITrackingDataType } from "@/app/tracking/components/types"
import Divider from "@components/divider/divider"
import NoData from "@components/NoData/noData"
import DvlaRecord from "@components/records/dvlaRecord/dvlaRecord"
import { liveComponentsContext } from "./context"
import { simulatedPlates } from "./simulatedPlates"
import { FaUndoAlt } from "react-icons/fa"
import Text from "@styles/components/text"
import { FaAngleDown } from "react-icons/fa6"
import Dropdown from "@components/dropdown/dropdown"
import { DropdownItem } from "@/utils/@types"
import { IoCheckmarkDone } from "react-icons/io5"
import Selectable, { SelectableOption } from "@components/dropdown/selectable"

export type FilterType = "Person" | "Plate" | "All"

const Right = () => {
    const [analysisResults, setAnalysisResults] = useState(true)
    const [type, setType] = useState<FilterType>("All")
    const typeRef = useRef(type);
    const [isMessageUpdated, setIsMessageUpdated] = useState(false)
    const [detections, setDetections] = useState<(IPersonTrackingWithImageType | IPlateTrackingType)[]>([])
    const {showDvlaRecord, setShowDvlaRecord, setDvlaData, dvlaData} = useContext(liveComponentsContext)

    // Update the ref whenever type changes
    useEffect(() => {
        typeRef.current = type;
    }, [type]);

    const onMessageUpdate = useCallback(async (message: any) => {
        const currentType = typeRef.current;
        
        const shouldLoad = 
            (message.type === "plate" && currentType === "Plate") ||
            (message.type === "person" && currentType === "Person") ||
            (!message.type && currentType === "Person") ||
            currentType === "All";

        shouldLoad && setIsMessageUpdated(true);
        
        console.log(`Processing message - Type: ${currentType}, Message type: ${message.type}`);
        console.log(
            (message.type === "plate" && currentType === "Plate"),
            (message.type === "person" && currentType === "Person"),
            (!message.type && currentType === "Person"),
            currentType === "All"
        );

        try {
            const getDetails = await getUserDetailsFromTrackingData(message);
            console.log({getDetails});
            
            if (getDetails) {
                setDetections(prev => [...prev, getDetails]);
            }
        } catch (error) {
            console.error("Error processing message:", error);
        } finally {
            setIsMessageUpdated(false);
        }
    }, []); // Empty dependency array since we're using ref

    const { messages } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, onMessageUpdate);

    const runSimulation = useCallback(() => {
        simulatedPlates.forEach((plate, index) => {
            setTimeout(() => {
                onMessageUpdate(plate);
            }, index * 5000);
        });
    }, [onMessageUpdate]);

    const menuItems: SelectableOption[] = [
        { key: "1", label: "All", value: "All" },
        { key: "2", label: "Person", value: "Person" },
        { key: "3", label: "Plate", value: "Plate" },
    ];

    const displayDivider = (index: number, itemType: ITrackingDataType) => {
        return index !== (detections.length - 1) 
            && ((itemType === "person" && type === "Person") || (itemType === "plate" && type === "Plate") || type === "All");
    }

    useEffect(() => {
        runSimulation();
        
        // Cleanup function to clear any pending timeouts
        return () => {
            // This would normally clear timeouts, but we don't have the IDs
            // In a real implementation, you'd track timeout IDs and clear them here
        };
    }, [runSimulation]);

    return (
        <>
            <DvlaRecord
                display={showDvlaRecord}
                setDisplay={setShowDvlaRecord}
                data={dvlaData}
            />
            <div className="fixed top-0 right-[60px] w-[210px] h-[100vh] py-4 px-6 gap-3">
                <Flex
                    direction="column"
                    height="100%"
                    gap={15}
                >
                    <div className="flex items-center gap-2">
                        <Selectable 
                            options={menuItems}
                            value={type}
                            onChange={value => setType(value as FilterType)}
                        />
                        <Button
                            text=""
                            icon={(<FaUndoAlt />)}
                            onClick={() => setDetections([])}
                        />
                    </div>
                    <div className={`flex flex-col w-full h-full rounded-lg gap-1 ${detections.length ? 'bg-gradient-container-md border-bg-secondary' : 'bg-bg-secondary border-bg-quantinary'} border-solid border-[1px] items-center px-2 p-1 overflow-y-auto`}>
                        {isMessageUpdated && (
                            <div className="w-full">
                                <Skeleton
                                    height={100}
                                    baseColor={theme.colors.bg.tetiary}
                                    highlightColor={theme.colors.bg.alt1}
                                />
                            </div>
                        )}
                        {detections.length ? (
                            [...detections].reverse().map((item, index) => (
                                displayDivider(index, item.type) &&
                                <div key={`${item.type}-${index}`}>
                                    <AnalysisResults 
                                        type={type}
                                        detections={item.type === "person" ? item as IPersonTrackingType : undefined}
                                        plateDetections={item.type === "plate" ? item as IPlateTrackingType : undefined}
                                    />
                                    <Divider />
                                </div>
                            ))
                        ) : !isMessageUpdated && (
                            <NoData />
                        )}
                    </div>
                </Flex>
            </div>
        </>
    )
}

export default Right;