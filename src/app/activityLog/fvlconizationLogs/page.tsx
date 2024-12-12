'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Controls from "./components/controls"
import Table from "./components/table"
import { useContext, useEffect, useState } from "react"
import { protectedAPI } from "@/utils/api/api"
import { FvlconizationLogsTypes } from "./components/fvlconizationLogs.types"
import groupLogsByDate from "./utils/groupsLogsByDate"
import { fvlocnizationLogsContext } from "./context/fvlconizationLogsContext"
import useFvlconizationLogs from "./utils/useFvlconizationLogs"
import LoadingSkeleton from "./components/loadingSkeleton"

const privateApi = new protectedAPI()

const FvlconizationLogs = () => {
    const [expandToday, setExpandToday] = useState(true)
    const [expandYesterday, setExpandYesterday] = useState(false)
    const [expandEarlier, setExpandEarlier] = useState(false)

    const {fvlconizationLogs, setFvlconizationLogs} = useContext(fvlocnizationLogsContext)
    const {today, yesterday, earlier} = groupLogsByDate(fvlconizationLogs.data)
    const {getFvlconizationLogs} = useFvlconizationLogs()

    useEffect(()=>{
        getFvlconizationLogs()
    },[])

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full gap-2 flex justify-between items-center">
                <Text
                    textColor={theme.colors.text.secondary}
                >
                    Fvlconization logs
                </Text>
                <Controls />
            </div>
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
                        title="Ealier"
                        expand={expandEarlier}
                        setExpand={setExpandEarlier}
                        data={earlier}
                    />
                </>
            }
        </div>
    )
}
export default FvlconizationLogs