import { hexOpacity } from "@/utils/hexOpacity"
import ZoomImage from "@components/zoomImage/zoomImage"
import Text from "@styles/components/text"
import { theme } from "@styles/theme"
import { Progress } from "antd"
import Image from "next/image"
import { Fragment, useState } from "react"
import { FaCircle, FaPrint, FaRegCircleDot, FaVideo } from "react-icons/fa6"
import { MdCloudDownload } from "react-icons/md"
import { FvlconizationVideoLogsType } from "../fvlconizationLogs.types"
import { getRelativeTime, getTime } from "@/utils/getDate"
import { TypographySize } from "@styles/style.types"
import NoData from "@components/NoData/noData"
import { formatTime } from "@/utils/formatTime"

const TableBody = ({
    data
} : {
    data : FvlconizationVideoLogsType[]
}) => {
    const [zoom, setZoom] = useState(false)
    const [zoomImage, setZoomImage] = useState('')
    const getValidPeople = () => {
        
    }
    console.log({data})
    return (
        <>
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={zoomImage} 
            />
            <tbody>
                {
                    data.length < 1?
                    <tr><td colSpan={100}><NoData /></td></tr>
                    :
                    data.map((item, index) => (
                        <Fragment key={index}>
                            <tr className="hover:bg-bg-secondary duration-200">
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
                                            src={item.thumbnailUrl}
                                        />
                                        <div 
                                            className="w-[60px] h-[60px] top-[-4px] left-[-4px] absolute bg-[#0000004e] flex justify-center cursor-pointer items-center rounded-full"
                                            onClick={()=>{
                                                setZoomImage(item.thumbnailUrl)
                                                setZoom(prev => !prev)
                                            }}
                                        >
                                            <FaVideo 
                                                color={theme.colors.text.primary}
                                                size={15}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        {
                                            !item.identifiedPeople?.length ?
                                            <Text>
                                                None
                                            </Text>
                                            :
                                            item.identifiedPeople?.map((person, index) => (
                                                index < 3 ? (
                                                    <Text
                                                        textColor={theme.colors.text.primary}
                                                        key={index}
                                                    >
                                                        {person}
                                                    </Text>
                                                )
                                                :
                                                index < 4 && '...'
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
                                            {formatTime(item.timeElapsed)}
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
                                        <FaPrint
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