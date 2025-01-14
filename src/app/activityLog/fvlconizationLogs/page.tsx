'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Controls from "./components/controls"
import Table from "./components/imageTable/table"
import { useContext, useEffect, useState } from "react"
import { protectedAPI } from "@/utils/api/api"
import { fvlocnizationLogsContext } from "./context/fvlconizationLogsContext"
import ImageTables from "./components/imageTable/imageTables"
import VideoTables from "./components/videoTable/videoTables"
import LoadingSkeleton from "../components/loadingSkeleton"

const privateApi = new protectedAPI()

const FvlconizationLogs = () => {
    const {fvlconizationLogs, typeValue, fvlconizationVideoLogs} = useContext(fvlocnizationLogsContext)

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
                fvlconizationLogs.status === 'loading' ||  fvlconizationVideoLogs.status === 'loading' ?
                <LoadingSkeleton />
                :
                typeValue === 'image'?
                <ImageTables />
                :
                <VideoTables />
            }
        </div>
    )
}
export default FvlconizationLogs