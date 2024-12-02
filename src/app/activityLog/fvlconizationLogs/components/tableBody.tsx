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

const TableBody = () => {
    const [zoom, setZoom] = useState(false)
    return (
        <>
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={require('@/assets/dev/image1.png')} 
            />
            <tbody>
                {
                    [1,2,3,4].map((item, index) => (
                        <Fragment key={index}>
                            <tr>
                                <td className="pl-2">
                                    <div className="flex w-fit px-3 py-1 border-[1px] border-solid border-bg-quantinary rounded-full bg-bg-secondary">
                                        <Text>
                                            image
                                        </Text>
                                    </div>
                                </td>
                                <td className="py-4">
                                    <div className="rounded-full w-[60px] h-[60px] p-2 border-[5px] border-solid border-bg-tetiary overflow-hidden relative">
                                        <Image 
                                            alt="img"
                                            fill
                                            className="hover:scale-[1.3] duration-300 object-cover cursor-pointer"
                                            src={require('@/assets/dev/image1.png')}
                                            onClick={()=>setZoom(prev => !prev)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <Text
                                        textColor={theme.colors.text.primary}
                                    >
                                        John Dramani Mahama
                                    </Text>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-0">
                                        <Text
                                            textColor={theme.colors.text.primary}
                                        >
                                            28th July, 2024
                                        </Text>
                                        <Text>
                                            2 Days ago | 12 PM
                                        </Text>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <Text>
                                            53s
                                        </Text>
                                        <Progress
                                            type="circle" 
                                            percent={90}
                                            size={50}
                                            strokeColor={theme.colors.main.primary}
                                            trailColor={`${theme.colors.main.primary}${hexOpacity(20)}`}
                                            strokeWidth={8}
                                            format={(percent) => (
                                                <Text textColor={theme.colors.text.primary}>
                                                    {percent}%
                                                </Text>
                                            )}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <FaRegCircleDot
                                            color="#0e9c33"
                                            size={10}
                                        />
                                        <Text textColor={theme.colors.text.primary}>
                                            Successful
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