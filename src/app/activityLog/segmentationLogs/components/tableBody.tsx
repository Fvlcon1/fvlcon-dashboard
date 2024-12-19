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
import { SegmentationLogsTypes } from "./segmentationLogs.types"
import { getRelativeTime, getTime } from "@/utils/getDate"

const TableBody = ({
    data
} : {
    data : SegmentationLogsTypes[]
}) => {
    console.log({data})
    const [zoom, setZoom] = useState(false)
    const [zoomImage, setZoomImage] = useState('')
    return (
        <>
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={zoomImage} 
            />
            <tbody>
                {
                    data.map((item, index) => (
                        <Fragment key={index}>
                            <tr>
                                <td className="pl-2">
                                    <div className="flex w-fit px-3 py-1 border-[1px] border-solid border-bg-quantinary rounded-full bg-bg-secondary">
                                        <Text>
                                            {item.type}
                                        </Text>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="rounded-full w-[60px] h-[60px] p-2 border-[5px] border-solid border-bg-tetiary overflow-hidden relative">
                                        <Image 
                                            alt="img"
                                            fill
                                            className="hover:scale-[1.3] duration-300 object-cover cursor-pointer"
                                            src={item.uploadedImageUrl}
                                            onClick={()=>{
                                                setZoomImage(item.uploadedImageUrl)
                                                setZoom(prev => !prev)
                                            }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex gap-1">
                                        {
                                            item.media.map((mediaItem, index) => (
                                                <div 
                                                    className="rounded-full w-[60px] h-[60px] p-2 border-[5px] border-solid border-bg-tetiary overflow-hidden relative"
                                                    key={index}
                                                >
                                                    <Image 
                                                        alt="img"
                                                        fill
                                                        className="hover:scale-[1.3] duration-300 object-cover cursor-pointer"
                                                        src={mediaItem.segmentedImageUrl}
                                                        onClick={()=>{
                                                            setZoomImage(mediaItem.segmentedImageUrl)
                                                            setZoom(prev => !prev)
                                                        }}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-0">
                                        <Text
                                            textColor={theme.colors.text.primary}
                                        >
                                            {new Date(item.date).toDateString()}
                                        </Text>
                                        <Text>
                                            {getRelativeTime(new Date(item.date))} | {getTime(new Date(item.date))}
                                        </Text>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <Text>
                                            {item.timeElapsed}
                                        </Text>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <FaRegCircleDot
                                            color="#0e9c33"
                                            size={10}
                                        />
                                        <Text textColor={theme.colors.text.primary}>
                                            {item.status}
                                        </Text>
                                    </div>
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