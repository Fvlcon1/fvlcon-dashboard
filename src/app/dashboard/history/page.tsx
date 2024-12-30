'use client'

import Table from "./components/table"
import useGroupsLogsByDate from "./utils/useGroupsLogsByDate"
import { useState } from "react"
import LoadingSkeleton from "@/app/activityLog/fvlconizationLogs/components/loadingSkeleton"

const History = () => {
    const [expandToday, setExpandToday] = useState(true)
    const [expandYesterday, setExpandYesterday] = useState(true)
    const [expandEarlier, setExpandEarlier] = useState(true)

    const {today, yesterday, earlier, fvlconizationLogs} = useGroupsLogsByDate()

    return (
        <div className="flex flex-col gap-1">
            {
                fvlconizationLogs.status === 'loading' ?
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
export default History