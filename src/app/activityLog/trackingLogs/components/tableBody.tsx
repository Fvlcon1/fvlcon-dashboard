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

const TableBody = () => {
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
                    [1,2,3,4].map((item, index) => (
                        <Fragment key={index}>
                            <tr>
                                <td className="py-4">
                                    <MatchContainer 
                                        originalImageUrl={require('@/assets/dev/image1.png')}
                                        capturedImageUrl={require('@/assets/dev/image1.png')}
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