'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useState } from "react"
import { FaCaretDown } from "react-icons/fa6"
import TableHead from "./tableHead"
import TableBody from "./tableBody"
import { trackingLogsType } from "./trackingLogs.types"

const Table = ({
    title,
    expand,
    setExpand,
    data
} : {
    title : string
    expand: boolean
    setExpand: Dispatch<SetStateAction<boolean>>
    data : trackingLogsType[]
}) => {
    
    return (
        <div className={`flex flex-col gap-1 w-full`}>
            <div 
                className={`w-full justify-between items-center flex pr-2 hover:bg-bg-secondary px-4 py-[6px] cursor-pointer duration-200 rounded-md `}
                onClick={()=>setExpand(prev => !prev)}
            >
                <Text
                    textColor={theme.colors.text.primary}
                >
                    {title}
                </Text>
                <FaCaretDown
                    color={theme.colors.text.secondary}
                />
            </div>
            <div className={`w-full h-[1px] bg-bg-secondary duration-200 ${expand ? "opacity-0" : "opacity-100"}`}></div>
            <div className={`min-w-full ${expand ? 'max-h-[700px] overflow-x-auto' : 'max-h-0 overflow-x-hidden'} flex gap-2 duration-200`}>
                <div className="w-full">
                    <table className="w-full min-w-[1000px]">
                        <TableHead />
                        <TableBody data={data}/>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Table