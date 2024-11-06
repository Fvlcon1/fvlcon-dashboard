'use client'

import Button from "@components/button/button"
import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useContext } from "react"
import { FaCaretDown } from "react-icons/fa6"
import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import { trackingContext } from "../context/trackingContext"
import { ConfigProvider, DatePicker } from "antd"

const Controls = () => {
    const {showCameras, setShowCameras} = useContext(trackingContext)

    return (
        <ConfigProvider
            theme={{
                components : {
                    DatePicker : {
                        activeBg : theme.colors.bg.tetiary,
                        hoverBg : theme.colors.bg.quantinary,
                        cellActiveWithRangeBg : theme.colors.bg.tetiary,
                        hoverBorderColor : theme.colors.bg.alt1,
                        cellHoverBg : theme.colors.bg.quantinary
                    }
                },
                token : {
                    colorBgContainer : theme.colors.bg.tetiary,
                    colorBorder : theme.colors.bg.quantinary,
                    colorText : theme.colors.text.secondary,
                    colorTextPlaceholder : theme.colors.text.secondary,
                    colorIcon : theme.colors.text.primary,
                    controlOutline : theme.colors.bg.quantinary,
                    colorPrimary : theme.colors.text.tetiary,
                    colorBgElevated : theme.colors.bg.tetiary,
                    colorSplit : theme.colors.bg.quantinary
                }
            }}
        >
            <div className="w-full flex justify-between">
                <div className="flex gap-2">
                    <div 
                        className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center"
                        onClick={()=>setShowCameras(prev => !prev)}
                    >
                        {
                            showCameras ?
                            <IoIosEye
                                color={theme.colors.text.secondary}
                            />
                            :
                            <IoIosEyeOff
                                color={theme.colors.text.secondary}
                            />
                        }
                        <Text>
                            Show Cameras
                        </Text>
                    </div>
                    <Searchbar
                        className="bg-bg-secondary rounded-lg"
                        inputStyle="bg-bg-secondary rounded-lg"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <DatePicker 
                            showTime
                            allowClear
                        />
                        <Text>
                            To
                        </Text>
                        <DatePicker 
                            showTime
                            allowClear
                        />
                    </div>
                    <Button
                        text="Start Tracking"
                    />
                </div>
            </div>
        </ConfigProvider>
    )
}
export default Controls