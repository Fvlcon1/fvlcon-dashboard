'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import MatchContainer from "./matchContainer"
import { useState } from "react"
import { IPersonTrackingType } from "./types"
import getDate, { getRelativeTime, getTime } from "@/utils/getDate"
import { capitalizeString } from "@/utils/capitalizeString"

const TableBody = ({
    trackingData
} : {
    trackingData : IPersonTrackingType[]
}) => {
    const [onHover, setOnHover] = useState<boolean>(false)
    const [onPress, setOnPress] = useState<boolean>(false)

    return (
        <tbody>
            {
                trackingData.map((item, index) => (
                    <tr
                        key={index}
                        className={`${index % 2 === 1 ? 'bg-gradient-container-md' : ''} hover:scale-[0.98] cursor-pointer duration-200`}
                        onMouseOver={()=>setOnHover(true)}
                        onMouseLeave={()=>setOnHover(false)}
                        onMouseDown={()=>setOnPress(true)}
                        onMouseUp={()=>setOnPress(false)}
                    >
                        <td className="py-4 pl-4">
                            <MatchContainer />
                        </td>
                        <td className="py-4">
                            <div className="flex flex-col gap-0">
                                {
                                    item.name ?
                                    <Text
                                        textColor={theme.colors.text.primary}
                                    >
                                        {capitalizeString(item.name)}
                                    </Text>
                                    :
                                    <Text>
                                        unknown
                                    </Text>
                                }
                                <Text>
                                    {item.alias}
                                </Text>
                            </div>
                        </td>
                        <td className="py-4">
                            <div className="flex flex-col gap-0">
                                <Text
                                    textColor={theme.colors.text.primary}
                                >
                                    {getDate(item.timeSeen)}
                                </Text>
                                <Text>
                                    {getRelativeTime(item.timeSeen)} | {getTime(item.timeSeen)}
                                </Text>
                            </div>
                        </td>
                        <td className="py-4">
                            <Text>
                                {item.lastSeen}
                            </Text>
                        </td>
                    </tr>
                ))
            }
        </tbody>
    )
}
export default TableBody