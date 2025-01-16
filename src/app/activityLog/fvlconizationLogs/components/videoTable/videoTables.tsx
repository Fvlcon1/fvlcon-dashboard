import { useContext, useEffect, useState } from "react"
import Table from "./table"
import { fvlocnizationLogsContext } from "../../context/fvlconizationLogsContext"
import useFvlconizationLogs from "../../utils/useFvlconizationLogs"
import useGroupVideoLogsByDate from "../../utils/useGroupVideoLogsByDate"

const VideoTables = () => {
    const {fvlconizationVideoLogs} = useContext(fvlocnizationLogsContext)
    const {today, yesterday, earlier} = useGroupVideoLogsByDate(fvlconizationVideoLogs.data)

    const [expandToday, setExpandToday] = useState(today.length ? true : !yesterday.length && !earlier.length ? true : false )
    const [expandYesterday, setExpandYesterday] = useState(!expandToday && yesterday.length ? true : false)
    const [expandEarlier, setExpandEarlier] = useState(!expandToday && !expandYesterday ? true : false)
    
    return (
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
    )
}
export default VideoTables