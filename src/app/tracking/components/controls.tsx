'use client'

import Button from "@components/button/button"
import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useContext, useEffect, useState } from "react"
import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import { trackingContext } from "../context/trackingContext"
import { ConfigProvider, DatePicker, message } from "antd"
import { hexOpacity } from "@/utils/hexOpacity"
import useTrackingData from "../utils/useTrackingData"

const Controls = () => {
    const {showCameras, setShowCameras, setWayPoints, captureDetails} = useContext(trackingContext)
    const [startDate, setStartDate] = useState<string | string[]>()
    const [endDate, setEndDate] = useState<string | string[]>()
    const [searchValue, setSearchValue] = useState<string>('')
    const { getTrackingData } = useTrackingData()

    /**
     * Convert start and end dates to right format and calls tracking function when user clicks on start tracking
     * @returns 
     */
    const handleStartTracking = async () => {
        if(!startDate){
            console.error("Please input start date")
            return message.warning("Please input start date")
        }
        const processedStartDate : Date = new Date(startDate as string)
        const processedEndDate : Date = endDate ? new Date(endDate as string) : new Date()
        await getTrackingData(processedStartDate, processedEndDate)
    }


    return (
        <ConfigProvider
            theme={{
                components : {
                    DatePicker : {
                        activeBg : 'transparent',
                        colorBgContainer : 'transparent',
                        fontSize : 12,
                        controlHeight : 36,
                        activeBorderColor : `${theme.colors.main.primary}${hexOpacity(40)}`,
                        hoverBg : 'transparent',
                        cellActiveWithRangeBg : theme.colors.bg.tetiary,
                        hoverBorderColor : `${theme.colors.main.primary}${hexOpacity(40)}`,
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
                            Show all Cameras
                        </Text>
                    </div>
                    <Searchbar
                        className="bg-bg-secondary rounded-lg"
                        inputStyle="bg-bg-secondary rounded-lg"
                        setSearchValue={setSearchValue}
                        searchValue={searchValue}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                        <DatePicker 
                            showTime
                            allowClear
                            placeholder="Start date"
                            onChange={(date, dateToString)=>setStartDate(dateToString)}
                        />
                        <Text>
                            To
                        </Text>
                        <DatePicker 
                            showTime
                            allowClear
                            placeholder="End date"
                            onChange={(date, dateToString)=>setEndDate(dateToString)}
                        />
                    </div>
                    <Button
                        text="Start Tracking"
                        onClick={handleStartTracking}
                    />
                </div>
            </div>
        </ConfigProvider>
    )
}
export default Controls