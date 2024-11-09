'use client'

import axios from "axios";
import TableBody from "./tableBody";
import TableHead from "./tableHead";
import { IPersonTrackingType, ITrackingDataTypes } from "./types";
import { API_URL } from "@/utils/constants";
import { protectedAPI } from "@/utils/api/api";
import { useContext, useEffect, useState } from "react";
import { trackingContext } from "../context/trackingContext";
import { parseCoordinates } from "@/utils/parseCoordinate";
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates";
import { message } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NoData from "./noData";
import Skeleton from "react-loading-skeleton";
import theme from "@styles/theme";

const privateAPI = new protectedAPI();

const Table = () => {
    const { data: sessionData, status } = useSession();
    const [originalImageUrl, setOriginalImageUrl] = useState<string>()
    const router = useRouter();

    useEffect(() => {
        // Redirect to login if the session is unauthenticated
        if (status === "unauthenticated") {
            router.push("/auth/login?error=Please login");
        }
    }, [status, router]);

    const { captureDetails } = useContext(trackingContext);
    const [newPersonTrackingData, setPersonTrackingData] = useState<{ status: 'loading' | null, data: IPersonTrackingType[] }>({ status: null, data: [] });
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [startDate, setStartDate] = useState<Date>(() => {
        const sevenDaysAgo = new Date(endDate);
        sevenDaysAgo.setDate(endDate.getDate() - 7);
        return sevenDaysAgo;
    });

    const getTrackingHistory = async () => {
        const userId = sessionData?.user.userId;
        if (!userId) return;

        setPersonTrackingData({ data: [], status: 'loading' });

        try {
            const response = await privateAPI.get("/tracking/getTrackingDataByUserIdAndTimeRange", {
                userId,
                startTime: startDate,
                endTime: endDate
            });
            const trackingData = response?.data;
            let faceDetails: any;
            if (trackingData.length) {
                const getFaceDetails = await axios.get(`${API_URL}/${trackingData[0].FaceId}`);
                faceDetails = getFaceDetails.data
            } else {
                return setPersonTrackingData(prev => ({ ...prev, status: null }));
            }
            setOriginalImageUrl(faceDetails.imageUrl)
            
            const people: IPersonTrackingType[] = [];
            for (const data of trackingData) {
                const { FaceId, Timestamp, coordinates, stream_name, S3Key, userId } = data;
                let capturedImageUrl : string | undefined
                if(S3Key){
                    try {
                        const getCapturedImageUrl = await privateAPI.get(`/tracking/generatePresignedUrl/${S3Key}`)
                        capturedImageUrl = getCapturedImageUrl?.data
                    } catch (error) {
                        console.log({error})
                        message.error("Error getting original image url")
                    }
                }
                const arrayCoordinates = parseCoordinates(coordinates);
                const { name: locationName } = await getLocationNameFromCordinates(arrayCoordinates);
                
                const personResultsParams: IPersonTrackingType = {
                    name: `${faceDetails.FirstName} ${faceDetails.MiddleName} ${faceDetails.LastName}`,
                    type: ITrackingDataTypes.person,
                    alias: "",
                    lastSeen: locationName,
                    coordinates: arrayCoordinates,
                    timeSeen: new Date(Timestamp),
                    faceId: FaceId,
                    streamName: stream_name,
                    S3Key,
                    userId,
                    imageUrl : capturedImageUrl
                };
                people.push(personResultsParams);
            }
            console.log({people})
            setPersonTrackingData({ data: people, status: null });
        } catch (error) {
            console.error({error});
            message.error("Error fetching data");
            setPersonTrackingData(prev => ({ ...prev, status: null }));
        }
    };

    useEffect(() => {
        if (status === 'authenticated') {
            getTrackingHistory();
        }
    }, [status]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-w-[500px] overflow-y-auto">
            <table className="w-full">
                <TableHead />
                {
                    newPersonTrackingData.data.length !== 0 &&
                    <TableBody 
                        trackingData={newPersonTrackingData.data} 
                        originalImageUrl={originalImageUrl}
                    />
                }
            </table>
            {
                newPersonTrackingData.status === 'loading' ? 
                (
                    [1, 2, 3, 4, 5, 6].map((item, index: number) => (
                        <div key={index} className="flex flex-col gap-1">
                            <Skeleton
                                height={75}
                                baseColor={theme.colors.bg.tetiary}
                                highlightColor={theme.colors.bg.alt1}
                            />
                        </div>
                    ))
                ) 
                :
                newPersonTrackingData.status === null && newPersonTrackingData.data.length === 0 && 
                <NoData />
            }
        </div>
    );
};

export default Table;