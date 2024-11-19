'use client'

import Button from "@components/button/button"
import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useContext, useEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa6"
import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import { trackingContext } from "../context/trackingContext"
import { ConfigProvider, DatePicker, message } from "antd"
import { protectedAPI } from "@/utils/api/api"
import { IPersonTrackingType, IPlateTrackingType, IPlateTrackingWaypoints, ITrackingDataTypes, ITrackingWaypointsType } from "./types"
import { parseCoordinates } from "@/utils/parseCoordinate"
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates"
import { hexOpacity } from "@/utils/hexOpacity"

const privateAPI = new protectedAPI()

const Controls = () => {
    const {showCameras, setShowCameras, setWayPoints, captureDetails} = useContext(trackingContext)
    const [startDate, setStartDate] = useState<string | string[]>()
    const [endDate, setEndDate] = useState<string | string[]>()
    const [searchValue, setSearchValue] = useState<string>('')

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

    /**
     * Gets tracking data within a specific time range
     * @param startTime Date
     * @param endTime Date
     */
    const getTrackingData = async (startTime : Date, endTime : Date) => {
        if(captureDetails?.data?.type === ITrackingDataTypes.person){
            const PersonCaptureDetails = captureDetails.data as IPersonTrackingType
            const faceId = PersonCaptureDetails?.faceId
            if(!faceId)
                return message.warning("Please select an object to track from the right panel")
            if(startTime > endTime)
                return message.warning("Start date must be less than end date")
            try {
                message.loading("Loading...", 100)
                const response = await privateAPI.get("/tracking/getTrackingDataByTimeRange", {faceId, startTime, endTime })
                message.destroy()
                const trackingData = response?.data
                if(trackingData.length === 0)
                    message.info("No tracking data available")
                const wayPointsArray : ITrackingWaypointsType[] = []
                
                for(let data of trackingData){
                    const arrayCoordinates = parseCoordinates(data.coordinates)
                    const location = await getLocationNameFromCordinates(arrayCoordinates)
                    if(PersonCaptureDetails)
                        wayPointsArray.push({
                            ...captureDetails.data,
                            name: data.stream_name,
                            lastSeen: location?.name ?? 'Unknown',
                            coordinates: arrayCoordinates,
                            timeSeen: data.Timestamp,
                            S3Key : data.S3Key,
                            radius: 10
                        } as ITrackingWaypointsType)
                }
                setWayPoints(wayPointsArray)
            } catch (error) {
                console.log({error})
                message.error("Unable to get tracking data")
            }
        } 
        
        else if(captureDetails?.data?.type === ITrackingDataTypes.plate){
            const plateCapture = captureDetails.data as IPlateTrackingType
            const plateNumber = plateCapture?.plateNumber
            if(!plateNumber)
                return message.warning("Please select an object to track from the right panel")
            if(startTime > endTime)
                return message.warning("Start date must be less than end date")
            try {
                message.loading("Loading...", 100)
                const response = await privateAPI.get("/tracking/getTrackingDetailsByNumberPlateAndTimestamp", {plateNumber, startTime, endTime })
                message.destroy()
                const trackingData = response?.data
                if(trackingData.length === 0)
                    message.info("No tracking data available")
                const wayPointsArray : IPlateTrackingWaypoints[] = []
                
                for(let data of trackingData){
                    const arrayCoordinates = parseCoordinates(data.coordinates)
                    if(plateCapture)
                        wayPointsArray.push({
                            ...captureDetails.data,
                            plateNumber: data.plateNumber,
                            locationName: data.locationName ?? 'Unknown',
                            coordinates: arrayCoordinates,
                            timestamp: data.Timestamp,
                            imageUrl : data.imageUrl,
                            id : data.Id,
                            userId : data.UserId,
                            radius: 10
                        } as IPlateTrackingWaypoints)
                }
                setWayPoints(wayPointsArray)
            } catch (error) {
                console.log({error})
                message.error("Unable to get tracking data")
            }
        }
    }

    return (
        <ConfigProvider
            theme={{
                components : {
                    DatePicker : {
                        activeBg : theme.colors.bg.tetiary,
                        activeBorderColor : `${theme.colors.main.primary}${hexOpacity(40)}`,
                        hoverBg : theme.colors.bg.tetiary,
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