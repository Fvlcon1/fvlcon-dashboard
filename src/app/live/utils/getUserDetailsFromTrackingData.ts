import { IPersonTrackingType, IPersonTrackingWithImageType, IPlateTrackingType, ITrackingDataTypes } from "@/app/tracking/components/types"
import { protectedAPI } from "@/utils/api/api"
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates"
import { parseCoordinates } from "@/utils/parseCoordinate"
import { message } from "antd"

const privateApi = new protectedAPI()

/**
 * Extracts and formats user details from tracking data for both person and plate types.
 * Handles async lookups (location, DVLA record) and error feedback.
 * @param trackingData Incoming tracking data (person or plate)
 * @returns Formatted tracking details or undefined on error
 */
export const getUserDetailsFromTrackingData = async (
    trackingData: any
): Promise<IPersonTrackingWithImageType | IPlateTrackingType | undefined> => {
    try {
        const { details } = trackingData;
        const {
            FaceId,
            Timestamp,
            coordinates,
            stream_name,
            S3Key,
            userId,
            UserId,
            imageUrl,
            type,
            Id,
            plateNumber,
            locationName,
            Similarity,
            originalImageUrl
        } = trackingData;
        const arrayCoordinates = parseCoordinates(coordinates);
        const location = await getLocationNameFromCordinates(arrayCoordinates);

        if (type === "plate") {
            // Plate detection: enrich with DVLA details
            const dvlaDetails = await fetchDvlaRecord(plateNumber);
            const plateDetails: IPlateTrackingType = {
                id: Id,
                plateNumber,
                imageUrl,
                locationName,
                coordinates,
                timestamp: Timestamp,
                type,
                userId: UserId,
                S3Key,
                dvlaDetails,
            };
            return plateDetails;
        } else {
            // Person detection
            const userDetails: IPersonTrackingWithImageType = {
                id: Id,
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
                similarity: Similarity,
                originalImageUrl,
                niaDetails: details
            };
            return userDetails;
        }
    } catch (error: any) {
        // Centralized error feedback
        console.error("Error extracting user details from tracking data:", error);
        message.error("Error fetching tracking details");
    }
}

/**
 * Fetches DVLA details for a given plate number.
 * @param plateNumber Number plate of the vehicle
 * @returns DVLA record object or undefined
 */
const fetchDvlaRecord = async (plateNumber: string) => {
    if (!plateNumber) return undefined;
    try {
        const getRecord = await privateApi.get("/dvlarecords/getDvlaRecord", { plateNumber });
        return getRecord?.data;
    } catch (error) {
        console.error("Error fetching DVLA record:", error);
        return undefined;
    }
};