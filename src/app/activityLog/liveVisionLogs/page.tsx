'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Controls from "./components/controls"
import Table from "./components/table"
import { useEffect, useState } from "react"
import { SessionProvider } from "next-auth/react"
import useLiveVisionData from "./utils/useLiveVisionData"
import LoadingSkeleton from "../fvlconizationLogs/components/loadingSkeleton"
import groupLogsByDate from "./utils/groupsLogsByDate"

const LiveVisionLogs = () => {
    const [expandToday, setExpandToday] = useState(true)
    const [expandYesterday, setExpandYesterday] = useState(false)
    const [expandEarlier, setExpandEarlier] = useState(false)

    const {getLiveVisionHistory, newPersonTrackingData} = useLiveVisionData()
    const {today, yesterday, earlier} = groupLogsByDate(newPersonTrackingData.data)

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
                            expand={expandToday}
                            setExpand={setExpandToday}
                            data={yesterday}
                        />
                        <Table 
                            title="Ealier"
                            expand={expandToday}
                            setExpand={setExpandToday}
                            data={earlier}
                        />
                    </>
                }
            </div>
        </SessionProvider>
    )
}
export default LiveVisionLogs