import { IPersonTrackingType, IPersonTrackingWithImageType, IPlateTrackingType, ITrackingDataTypes } from "@/app/tracking/components/types"
import { protectedAPI } from "@/utils/api/api"
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates"
import { parseCoordinates } from "@/utils/parseCoordinate"
import { message } from "antd"

const privateApi = new protectedAPI()

export const getUserDetailsFromTrackingData = async (trackingData : any) : Promise<IPersonTrackingWithImageType | IPlateTrackingType | undefined>  => {
    try {
        const {details} = trackingData
        console.log({trackingData})
        const { FaceId, Timestamp, coordinates, stream_name, S3Key, userId, UserId, imageUrl, type, Id, plateNumber, locationName, Similarity } = trackingData;
        const arrayCoordinates = parseCoordinates(coordinates);
        const location = await getLocationNameFromCordinates(arrayCoordinates);
        
        if(type === "plate"){
            const dvlaDetails = await fetchDvlaRecord(plateNumber)
            const plateDetails: IPlateTrackingType = {
                id : Id,
                plateNumber,
                imageUrl,
                locationName,
                coordinates,
                timestamp : Timestamp,
                type,
                userId : UserId,
                S3Key,
                dvlaDetails
            }
            
            console.log({plateDetails})
            return plateDetails
        } else {
            const userDetails: IPersonTrackingWithImageType = {
                id : Id,
                name: `${details?.personDetails?.forenames ?? ''} ${details?.personDetails?.surname ?? ''}`,
                type: ITrackingDataTypes.person,
                alias: "",
                lastSeen: location?.name ?? 'Unknown',
                coordinates: arrayCoordinates,
                timeSeen: new Date(Timestamp),
                faceId: FaceId,
                streamName: stream_name,
                S3Key,
                userId,
                imageUrl,
                similarity : Similarity,
                originalImageUrl : details?.imageUrl ?? ''
            };
            return userDetails
        }
    } catch (error : any) {
        console.log({error})
        message.error("Error fetching data")
    }
}

/**
 * Get dvla details of the plate
 * @param plateNumber Number plate of the vehicle
 */
const fetchDvlaRecord = async (plateNumber:string) => {
    if(plateNumber){
        const getRecord = await privateApi.get("/dvlarecords/getDvlaRecord", {plateNumber})
        const record = getRecord?.data
        return record
    }
}