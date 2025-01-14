import { useContext, useEffect, useState } from "react"
import Table from "./table"
import { fvlocnizationLogsContext } from "../../context/fvlconizationLogsContext"
import useGroupsLogsByDate from "../../utils/useGroupsLogsByDate"
import useFvlconizationLogs from "../../utils/useFvlconizationLogs"

const ImageTables = () => {
    const {fvlconizationLogs, setFvlconizationLogs, typeValue} = useContext(fvlocnizationLogsContext)
    const {today, yesterday, earlier} = useGroupsLogsByDate(fvlconizationLogs.data)

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
export default ImageTables