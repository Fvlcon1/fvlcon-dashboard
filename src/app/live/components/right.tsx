'use client'

import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import Button from "@components/button/button"
import AnalysisResults from "./analysis results/analysisResults"
import Skeleton from "react-loading-skeleton"
import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import useWebSocket from "@/utils/useWebsocket"
import { getUserDetailsFromTrackingData } from "../utils/getUserDetailsFromTrackingData"
import { IPersonTrackingType, IPersonTrackingWithImageType, IPlateTrackingType, ITrackingDataType } from "@/app/tracking/components/types"
import Divider from "@components/divider/divider"
import NoData from "@components/NoData/noData"
import DvlaRecord from "@components/records/dvlaRecord/dvlaRecord"
import { liveComponentsContext } from "./context"
import { simulatedData } from "./simulated-data/simulated-data"
import { FaUndoAlt } from "react-icons/fa"
import Selectable, { SelectableOption } from "@components/dropdown/selectable"

export type FilterType = "Person" | "Plate" | "All"

// Utility to determine if a message should be processed based on filter type
const shouldLoadMessage = (message: any, currentType: FilterType) => {
    return (
        (message.type === "plate" && currentType === "Plate") ||
        (message.type === "person" && currentType === "Person") ||
        (!message.type && currentType === "Person") ||
        currentType === "All"
    );
};

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

    // Ref to track simulation timeouts for cleanup
    const timeoutsRef = useRef<number[]>([]);

    // Handles incoming websocket or simulated messages
    const onMessageUpdate = useCallback(async (message: any) => {
        const currentType = typeRef.current;
        const shouldLoad = shouldLoadMessage(message, currentType);

        if (shouldLoad) setIsMessageUpdated(true);

        if (process.env.NODE_ENV === "development") {
            console.debug(`Processing message - Type: ${currentType}, Message type: ${message.type}`);
            console.debug({ shouldLoad });
        }

        try {
            const getDetails = await getUserDetailsFromTrackingData(message);
            console.log({getDetails})
            if (getDetails) {
                setDetections(prev => [...prev, getDetails]);
            }
        } catch (error) {
            console.log({error})
        } finally {
            setIsMessageUpdated(false);
        }
    }, []);

    const { messages } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, onMessageUpdate);

    // Simulate incoming plate messages with cleanup
    const runSimulation = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = simulatedData.map((data, index) =>
            window.setTimeout(() => {
                onMessageUpdate(data);
            }, index * 5000)
        );
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
        return () => {
            timeoutsRef.current.forEach(clearTimeout);
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