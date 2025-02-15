import { useContext } from "react"
import { trackingContext } from "../context/trackingContext"
import { IPersonTrackingType, IPlateTrackingType, IPlateTrackingWaypoints, ITrackingDataTypes, ITrackingWaypointsType } from '../components/types'
import { parseCoordinates } from "@/utils/parseCoordinate"
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates"
import { message } from "antd"
import { protectedAPI } from "@/utils/api/api"
import axios from "axios"

const privateAPI = new protectedAPI()

const useTrackingData = () => {
    const {showCameras, setShowCameras, setWayPoints, captureDetails} = useContext(trackingContext)

    /**
     * Gets tracking data within a specific time range
     * @param startTime Date
     * @param endTime Date
     */
    const getTrackingData = async (startTime : Date, endTime : Date) => {
        console.log("start")
        if(captureDetails?.data?.type === ITrackingDataTypes.person){
            console.log("hi")
            const PersonCaptureDetails = captureDetails.data as IPersonTrackingType
            const faceId = PersonCaptureDetails?.faceId
            const personLogId = PersonCaptureDetails?.id
            if(startTime > endTime){
                message.warning("Start date must be less than end date")
                return
            }
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
                const locations = wayPointsArray.map((point) => ({
                    name : point.lastSeen,
                    coordinates : point.coordinates
                }))
                storePersonTrackingLogs(faceId, locations, captureDetails.data.S3Key, personLogId)
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

        else {
            return message.warning("Please select person or vehicle to track")
        }
    }

    const storePersonTrackingLogs = async (faceId : string, locations : {name : string, coordinates : number[]}[], S3Key : string, personLogId : string) => {
        try {
            const result = await axios.post('/api/logs/trackingLogs', {
                faceId,
                locations,
                S3Key,
                personLogId
            })
            console.log({result})
        } catch (error) {
            console.log({error})
            message.error("Unable to save log")
        }
    }
    
    return { getTrackingData }
}
export default useTrackingData