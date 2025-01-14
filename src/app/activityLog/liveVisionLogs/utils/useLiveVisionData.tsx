import { IPersonTrackingWithImageType, IPlateTrackingType, ITrackingDataTypes } from "@/app/tracking/components/types";
import { protectedAPI } from "@/utils/api/api"
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates";
import { parseCoordinates } from "@/utils/parseCoordinate";
import { message } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const privateApi = new protectedAPI()

const useLiveVisionData = () => {
    const { data: sessionData, status } = useSession();
    const [newPersonTrackingData, setPersonTrackingData] = useState<{ status: 'loading' | null, data: IPersonTrackingWithImageType[] }>({ status: null, data: [] });
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [startDate, setStartDate] = useState<Date>(() => {
        const sevenDaysAgo = new Date(endDate);
        sevenDaysAgo.setDate(endDate.getDate() - 7);
        return sevenDaysAgo;
    });

    const getLiveVisionHistory = async (
        params? : {
            startDate? : Date,
            endDate? : Date,
            status? : string,
            type? : string
            page? : number,
            pageSize? : number
        }
    ) => {
        const userId = sessionData?.user.userId;
        if (!userId) return;
        setPersonTrackingData({ data: [], status: 'loading' });

        try {
            const response = await privateApi.get("/tracking/getTrackingDataByUserIdAndTimeRange", {
                startDate : params?.startDate,
                endDate : params?.endDate,
                status : params?.status,
                type : params?.type,
                page : params?.page,
                pageSize : params?.pageSize
            });
            const trackingData = response?.data;
            
            const people: IPersonTrackingWithImageType[] = [];
            const plates: IPlateTrackingType[] = [];
            for (const data of trackingData) {
                const {details} = data
                const { FaceId, Timestamp, coordinates, stream_name, S3Key, userId, UserId, imageUrl, type, Id, plateNumber, locationName, Similarity } = data;
                const arrayCoordinates = parseCoordinates(coordinates);
                const location = await getLocationNameFromCordinates(arrayCoordinates);
                
                if(type === "plate"){
                    const plateDetails: IPlateTrackingType = {
                        id : Id,
                        plateNumber,
                        imageUrl,
                        locationName,
                        coordinates,
                        timestamp : Timestamp,
                        type,
                        userId : UserId,
                        S3Key
                    };
                    plates.push(plateDetails);
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
                    people.push(userDetails);
                }
            }
            setPersonTrackingData({ data: people, status: null });
        } catch (error) {
            console.error({error});
            message.error("Error fetching data");
            setPersonTrackingData(prev => ({ ...prev, status: null }));
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            getLiveVisionHistory();
        }
    }, [status]);
    return {getLiveVisionHistory, newPersonTrackingData}
}

export default useLiveVisionData