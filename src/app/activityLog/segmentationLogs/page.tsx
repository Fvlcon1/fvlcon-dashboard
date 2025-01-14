'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Controls from "./components/controls"
import Table from "./components/table"
import { useContext, useEffect, useState } from "react"
import { protectedAPI } from "@/utils/api/api"
import { SegmentationLogsTypes } from "./components/segmentationLogs.types"
import useGroupsLogsByDate from "./utils/useGroupsLogsByDate"
import { SegmentationLogsContext } from "./context/segmentationLogsContext"
import useSegmentationLogs from "./utils/useSegmentationLogs"
import LoadingSkeleton from "../components/loadingSkeleton"
import { message } from "antd"

const privateApi = new protectedAPI()

const SegmentationLogs = () => {
    const {segmentationLogs, setSegmentationLogs} = useContext(SegmentationLogsContext)
    const {today, yesterday, earlier} = useGroupsLogsByDate(segmentationLogs.data)
    const {getSegmentationLogs} = useSegmentationLogs()

    const [expandToday, setExpandToday] = useState(today.length > 0 ? true : yesterday.length === 0 && earlier.length === 0 ? true : false )
    const [expandYesterday, setExpandYesterday] = useState(!expandToday && yesterday.length ? true : false)
    const [expandEarlier, setExpandEarlier] = useState(!expandToday && !expandYesterday ? true : false)

    useEffect(()=>{
        try {
            getSegmentationLogs()
        } catch (error) {
            message.error("Error fetching data")
            console.log({error})
        }
    },[])

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full gap-2 flex justify-between items-center">
                <Text
                    textColor={theme.colors.text.secondary}
                >
                    Segmentation logs
                </Text>
                <Controls />
            </div>
            {
                segmentationLogs.status === 'loading' ?
                <LoadingSkeleton />
                :
                <>
                    <Table 
                        title="Today"
                        expand={expandToday}
                        setExpand={setExpandToday}
                        data={today}
                    />
                    <Table 
                        title="Yesterday"
                        expand={expandYesterday}
                        setExpand={setExpandYesterday}
                        data={yesterday}
                    />
                    <Table 
                        title="Earlier"
                        expand={expandEarlier}
                        setExpand={setExpandEarlier}
                        data={earlier}
                    />
                </>
            }
        </div>
    )
}
export default SegmentationLogs