import { IPersonTrackingType, IPersonTrackingWithImageType, ITrackingDataTypes } from "@/app/tracking/components/types"
import { protectedAPI } from "@/utils/api/api"
import { API_URL } from "@/utils/constants"
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates"
import { parseCoordinates } from "@/utils/parseCoordinate"
import { message } from "antd"
import axios from "axios"

const privateAPI = new protectedAPI()

export const getUserDetailsFromTrackingData = async (trackingData : any) : Promise<IPersonTrackingWithImageType | undefined>  => {
    try {
        const {details} = trackingData
        const { FaceId, Timestamp, coordinates, stream_name, S3Key, userId, imageUrl } = trackingData;
        const arrayCoordinates = parseCoordinates(coordinates);
        const location = await getLocationNameFromCordinates(arrayCoordinates);
        
        const userDetails: IPersonTrackingWithImageType = {
            name: `${details?.FirstName ?? ''} ${details?.MiddleName ?? ''} ${details?.LastName ?? ''}`,
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
            originalImageUrl : details?.imageUrl ?? ''
        };
        return userDetails
    } catch (error : any) {
        console.log({error})
        message.error("Error fetching data")
    }
}