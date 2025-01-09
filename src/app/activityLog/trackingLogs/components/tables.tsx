'use client'

import { useContext, useEffect, useState } from "react"
import Table from "./table"
import axios from "axios"
import { trackingLogsContext } from "../context/trackingLogsContext"
import useGroupsLogsByDate from '../utils/useGroupsLogsByDate'
import useTrackingLogs from "../utils/useTrackingLogs"
import LoadingSkeleton from "../../components/loadingSkeleton"

const Tables = () => {
    const {trackingLogs, setTrackingLogs} = useContext(trackingLogsContext)
    const {today, yesterday, earlier} = useGroupsLogsByDate(trackingLogs.data)
    const {getTrackingLogs} = useTrackingLogs()
    
    const [expandToday, setExpandToday] = useState(today.length ? true : !yesterday.length && !earlier.length ? true : false )
    const [expandYesterday, setExpandYesterday] = useState(!expandToday && yesterday.length ? true : false)
    const [expandEarlier, setExpandEarlier] = useState(!expandToday && !expandYesterday ? true : false)

    useEffect(()=>{
        getTrackingLogs()
    },[])

    useEffect(()=> {
        console.log({trackingLogs})
    },[trackingLogs])

    return (
        <>
            {
                trackingLogs.status === 'loading' ?
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
        </>
    )
}
export default Tables