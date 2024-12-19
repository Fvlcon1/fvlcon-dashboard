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
import { IPersonTrackingWithImageType } from "@/app/tracking/components/types"
import { getRelativeTime, getTime } from "@/utils/getDate"
import { TypographySize } from "@styles/style.types"
import NoData from "@components/NoData/noData"

const TableBody = ({
    liveVisionData
} : {
    liveVisionData : IPersonTrackingWithImageType[]
}) => {
    // const {name, type, timeSeen, imageUrl, similarity, originalImageUrl} = liveVisionData
    const [zoom, setZoom] = useState(false)
    const [capturedImageZoom, setCapturedImageZoom] = useState(false)
    return (
        <>
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={require('@/assets/dev/image1.png')} 
            />
            <ZoomImage
                setShow={setCapturedImageZoom}
                show={capturedImageZoom}
                imageURL={require('@/assets/dev/image1.png')} 
            />
            <tbody>
                {
                    liveVisionData.length < 1?
                    <tr><td colSpan={100}><NoData /></td></tr>
                    :
                    liveVisionData.map((item, index) => (
                        <Fragment key={index}>
                            <tr>
                                <td className="py-4 pl-4">
                                    <MatchContainer 
                                        originalImageUrl={item.originalImageUrl}
                                        capturedImageUrl={item.imageUrl}
                                        originalImageZoom={zoom}
                                        setOriginalImageZoom={setZoom}
                                        capturedImageZoom={capturedImageZoom}
                                        setCapturedImageZoom={setCapturedImageZoom}
                                    />
                                </td>
                                <td>
                                    <Text
                                        textColor={theme.colors.text.primary}
                                    >
                                        {item.name}
                                    </Text>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-0">
                                        <Text
                                            textColor={theme.colors.text.primary}
                                        >
                                            {new Date(item.timeSeen).toDateString()}
                                        </Text>
                                        <Text>
                                            {getRelativeTime(new Date(item.timeSeen))} | {getTime(new Date(item.timeSeen))}
                                        </Text>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <Progress
                                            type="circle" 
                                            percent={90}
                                            size={60}
                                            strokeColor={theme.colors.main.primary}
                                            trailColor={`${theme.colors.main.primary}${hexOpacity(20)}`}
                                            strokeWidth={8}
                                            format={(percent) => (
                                                <Text 
                                                    textColor={theme.colors.text.primary}
                                                    size={TypographySize.xs}
                                                >
                                                    {item.similarity}%
                                                </Text>
                                            )}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <Text
                                        textColor={theme.colors.text.primary}
                                    >
                                        {item.lastSeen}
                                    </Text>
                                </td>
                                {/* <td>
                                    <div className="flex items-center gap-2">
                                        <FaRegCircleDot
                                            color="#0e9c33"
                                            size={10}
                                        />
                                        <Text textColor={theme.colors.text.primary}>
                                            Successful
                                        </Text>
                                    </div>
                                </td> */}
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