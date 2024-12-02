'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Controls from "./components/controls"
import Table from "./components/table"
import { useState } from "react"

const SegmentationLogs = () => {
    const [expandToday, setExpandToday] = useState(true)
    const [expandYesterday, setExpandYesterday] = useState(false)
    const [expandEarlier, setExpandEarlier] = useState(false)

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
                title="Ealier"
                expand={expandEarlier}
                setExpand={setExpandEarlier}
            />
        </div>
    )
}
export default SegmentationLogs