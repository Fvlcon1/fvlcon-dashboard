'use client'

import { useEffect, useState } from "react"
import Table from "./table"
import axios from "axios"

const Tables = () => {
    const [expandToday, setExpandToday] = useState(true)
    const [expandYesterday, setExpandYesterday] = useState(false)
    const [expandEarlier, setExpandEarlier] = useState(false)

    const getLogs = async () => {
        const res = await axios.get("/api/logs/trackingLogs")
    }

    useEffect(()=>{
        getLogs()
    },[])

    return (
        <>
            <Table
                title="Today"
                expand={expandToday}
                setExpand={setExpandToday}
            />
            <Table 
                title="Yesterday"
                expand={expandYesterday}
                setExpand={setExpandYesterday}
            />
            <Table 
                title="Earlier"
                expand={expandEarlier}
                setExpand={setExpandEarlier}
            />
        </>
    )
}
export default Tables