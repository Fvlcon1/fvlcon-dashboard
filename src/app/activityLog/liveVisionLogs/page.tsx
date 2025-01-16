'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Controls from "./components/controls"
import Table from "./components/table"
import { useEffect, useState } from "react"
import { SessionProvider } from "next-auth/react"
import useLiveVisionData from "./utils/useLiveVisionData"
import LoadingSkeleton from "../components/loadingSkeleton"
import useGroupsLogsByDate from "./utils/useGroupsLogsByDate"
import useGetExpansions from "./utils/useGetExpansions"

const LiveVisionLogs = () => {
    const {getLiveVisionHistory, newPersonTrackingData} = useLiveVisionData()
    const {today, yesterday, earlier} = useGroupsLogsByDate(newPersonTrackingData.data)
    // const { expandToday, setExpandToday, expandYesterday, setExpandYesterday, expandEarlier, setExpandEarlier } = useGetExpansions()

    const [expandToday, setExpandToday] = useState(today.length ? true : !yesterday.length && !earlier.length ? true : false )
    const [expandYesterday, setExpandYesterday] = useState(!expandToday && yesterday.length ? true : false)
    const [expandEarlier, setExpandEarlier] = useState(!expandToday && !expandYesterday ? true : false)

    useEffect(()=>{
        getLiveVisionHistory()
    },[])

    return (
        <SessionProvider>
            <div className="flex flex-col gap-4">
                <div className="w-full gap-2 flex justify-between items-center">
                    <Text
                        textColor={theme.colors.text.secondary}
                    >
                        Live vision logs
                    </Text>
                    <Controls />
                </div>
                {
                    newPersonTrackingData.status === 'loading' ?
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
        </SessionProvider>
    )
}
export default LiveVisionLogs