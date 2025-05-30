'use client'

import axios from "axios";
import TableBody from "./tableBody";
import TableHead from "./tableHead";
import { IPersonTrackingType, IPersonTrackingWithImageType, ITrackingDataTypes } from "./types";
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
import InfinityLoader from "@components/loaders/infinityLoader";

const privateAPI = new protectedAPI();

const Table = () => {
    const { data: sessionData, status } = useSession();
    const [originalImageUrl, setOriginalImageUrl] = useState<string>()
    const router = useRouter();

    useEffect(() => {
        // Redirect to login if the session is unauthenticated
        if (status === "unauthenticated") {
            router.push("/auth/login");
        }
    }, [status, router]);

    const { captureDetails } = useContext(trackingContext);
    const [newPersonTrackingData, setPersonTrackingData] = useState<{ status: 'loading' | null, data: IPersonTrackingWithImageType[] }>({ status: null, data: [] });
    const [endDate, setEndDate] = useState<Date>();
    const [startDate, setStartDate] = useState<Date>();

    const getTrackingHistory = async () => {
        const userId = sessionData?.user.userId;
        if (!userId) return;
        setPersonTrackingData({ data: [], status: 'loading' });

        try {
            const response = await privateAPI.get("/tracking/getTrackingDataByUserId", { userId });
            const trackingData = response?.data?.data;
            
            const people: IPersonTrackingWithImageType[] = [];
            for (const data of trackingData) {
                const {details} = data
                const personDetails = details?.personDetails
                const { FaceId, Timestamp, coordinates, stream_name, S3Key, userId, imageUrl, Id } = data;
                const arrayCoordinates = parseCoordinates(coordinates);
                const location = await getLocationNameFromCordinates(arrayCoordinates);
                
                const personResultsParams: IPersonTrackingWithImageType = {
                    id : Id,
                    name: `${personDetails?.forenames ?? ''} ${personDetails?.surname ?? ''}`,
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
                    originalImageUrl : details?.imageUrl ?? '',
                    niaDetails : details
                };
                people.push(personResultsParams);
            }
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
        <div className="min-w-[200px] max-w-full h-full overflow-auto ">
            <table className="w-full min-w-[700px]">
                <TableHead />
                {
                    newPersonTrackingData.data.length !== 0 &&
                    <TableBody trackingData={newPersonTrackingData.data} />
                }
            </table>
            {
                newPersonTrackingData.status === 'loading' ? 
                <div className="w-full h-full flex justify-center items-center">
                    <InfinityLoader />
                </div>
                :
                newPersonTrackingData.status === null && newPersonTrackingData.data.length === 0 && 
                <NoData />
            }
        </div>
    );
};

export default Table;