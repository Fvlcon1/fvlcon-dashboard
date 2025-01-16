import { hexOpacity } from "@/utils/hexOpacity"
import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Progress } from "antd"
import Image from "next/image"
import { Fragment, useState } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { FaCircle, FaRegCircleDot } from "react-icons/fa6"
import { MdCloudDownload } from "react-icons/md"
import MatchContainer from "./matchContainer"
import { trackingLogsType } from "./trackingLogs.types"
import getDate, { getRelativeTime, getTime } from "@/utils/getDate"
import NoData from "@components/NoData/noData"

const TableBody = ({
    data
} : {
    data : trackingLogsType[]
}) => {
    return (
        <>     
            <tbody>
                {
                    data.length < 1?
                    <tr><td colSpan={100}><NoData /></td></tr>
                    :
                    data.map((item, index) => (
                        <Fragment key={index}>
                            <tr>
                                <td className="py-4 pl-4">
                                    <MatchContainer 
                                        capturedImageUrl={item.imageUrl}
                                    />
                                </td>
                                <td>
                                    {
                                        item.identifiedPerson?.length > 1 ?
                                        <Text
                                            textColor={theme.colors.text.primary}
                                            key={index}
                                        >
                                            {item.identifiedPerson}
                                        </Text>
                                        :
                                        <Text key={index}>
                                            Unknown
                                        </Text>
                                    }
                                </td>
                                <td>
                                    <div className="flex flex-col gap-0">
                                        <Text
                                            textColor={theme.colors.text.primary}
                                        >
                                            {getDate(item.date)}
                                        </Text>
                                        <Text>
                                            {getRelativeTime(item.date)} | {getTime(item.date)}
                                        </Text>
                                    </div>
                                </td>
                                <td>
                                    {
                                        item.locations.map((location, index) => (
                                            index < 4 ?
                                            <Text key={index}>
                                                {`${location.name}${(index !==  3 && index !== item.locations.length - 1) ? ' → ' : ''}`}
                                            </Text>
                                            : index < 5 &&
                                            <Text>
                                                ...
                                            </Text>
                                        ))
                                    }
                                </td>
                                <td>
                                    <div className="flex gap-4 items-center">
                                        <MdCloudDownload
                                            color={theme.colors.text.secondary}
                                            className="cursor-pointer hover:scale-125 duration-200"
                                        />
                                        <FaExternalLinkAlt
                                            color={theme.colors.text.secondary}
                                            size={11}
                                            className="cursor-pointer hover:scale-125 duration-200"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={100}>
                                    <div className="w-full h-[1px] bg-bg-secondary"></div>
                                </td>
                            </tr>
                        </Fragment>
                    ))
                }
            </tbody>
        </>
    )
}
export default TableBody