'use client'

import Text from "@styles/components/text"
import RightControls from "./rightControls"
import { IoImage } from "react-icons/io5"
import theme from "@styles/theme"
import { useContext, useEffect, useState } from "react"
import DndImage from "./dndImage"
import PersonResultContainer from "./PersonResultContainer"
import Divider from "@components/divider/divider"
import { protectedAPI, unprotectedAPI } from "@/utils/api/api"
import { IPersonTrackingType, IPlateOrPerson, IPlateTrackingType, ITrackingDataTypes } from "./types"
import axios from "axios"
import { parseCoordinates } from "@/utils/parseCoordinate"
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates"
import Skeleton from "react-loading-skeleton"
import { trackingContext } from "../context/trackingContext"
import { message } from "antd"
import { showWarning, showError } from "../utils/uiHelpers"
import NoData from "./noData"
import PlateContainer from "./plateContainer"

const privateAPI = new protectedAPI()
const publicAPI = new unprotectedAPI()

const Right = () => {
    const [newPersonTrackingData, setPersonTrackingData] = useState<{ status: 'loading' | null, data: IPersonTrackingType[] }>({ status: null, data: [] })
    const [searchResults, setSearchResults] = useState<{status: 'loading' | null, data: IPlateOrPerson[]}>({status : null, data : []})
    const [filteredSearchResults, setFilteredSearchResults] = useState(searchResults)
    const [searchValue, setSearchValue] = useState<string>('')
    
    const { imageUrl, setImageUrl } = useContext(trackingContext)

    /**
 * Fetches tracking data for a given image URL.
 * Handles loading state, error feedback, and transforms API response.
 * @param imageUrl Base64 image string
 */
const getTrackingData = async (imageUrl: string) => {
    setPersonTrackingData({ status: 'loading', data: [] });
    try {
        const response = await privateAPI.post("/tracking/searchFaceByImage", { base64Image: imageUrl });
        const trackingData = response?.data?.trackingData;
        const niaDetails = response?.data?.details;

        if (trackingData) {
            const people: IPersonTrackingType[] = [];
            for (const data of trackingData) {
                try {
                    const { FaceId, Timestamp, coordinates, stream_name, S3Key, UserId, Id } = data;
                    const arrayCoordinates = parseCoordinates(coordinates);
                    const location = await getLocationNameFromCordinates(arrayCoordinates);
                    const personName = `${niaDetails?.personDetails.forenames ?? ''} ${niaDetails?.personDetails.surname ?? ''}`;
                    const personResultsParams: IPersonTrackingType = {
                        id: Id,
                        name: personName,
                        type: ITrackingDataTypes.person,
                        alias: "",
                        lastSeen: location?.name ?? 'Unknown',
                        coordinates: arrayCoordinates,
                        timeSeen: new Date(Timestamp),
                        faceId: FaceId,
                        streamName: stream_name,
                        S3Key,
                        userId: UserId,
                        niaDetails: niaDetails
                    };
                    people.push(personResultsParams);
                } catch (error: any) {
                    showError("Error fetching data");
                    setPersonTrackingData(prev => ({ ...prev, status: null }));
                }
            }
            // Helper for artificial delay (for UI smoothness)
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            /**
             * Updates state with tracking people, one by one (with delay).
             */
            const updatePersonTrackingData = async (people: IPersonTrackingType[]) => {
                for (let person of people) {
                    setPersonTrackingData(prev => ({
                        data: [...prev.data, person],
                        status: null
                    }));
                    await delay(100);
                }
            };
            updatePersonTrackingData(people);
        } else {
            showWarning("No data found");
            setPersonTrackingData(prev => ({ ...prev, status: null }));
        }
    } catch (error: any) {
        setPersonTrackingData({ status: null, data: [] });
        showError(error?.response?.data || "Unknown error");
    }
}

    useEffect(()=>{
        setSearchResults(newPersonTrackingData)
    },[newPersonTrackingData])

    useEffect(() => {
        if (imageUrl?.length) {
            getTrackingData(imageUrl)
        }
    }, [imageUrl])

    return (
        <div className="w-[25%] min-w-[330px] max-w-[350px] p-3 flex h-full bg-gradient-container overflow-y-auto rounded-lg flex-col gap-2">
            <RightControls 
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                newPersonTrackingData={newPersonTrackingData}
                setFilteredSearchResults={setFilteredSearchResults}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            {
                filteredSearchResults.data.length > 0 ? 
                <div className="flex flex-col w-full overflow-y-auto">
                    {
                        filteredSearchResults.data.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col w-[95%] duration-200 gap-3 pt-3 hover:bg-bg-secondary cursor-pointer"
                            >
                                {
                                    item.type === ITrackingDataTypes.person ?
                                    <PersonResultContainer
                                        {...item as IPersonTrackingType}
                                    />
                                    :
                                    item.type === ITrackingDataTypes.plate &&
                                    <PlateContainer
                                        {...item as IPlateTrackingType}
                                    />
                                }
                                <Divider className="!w-full" />
                            </div>
                        ))
                    }
                </div>
                :
                searchResults.status === 'loading' ?
                [1, 2, 3, 4, 5, 6].map((item, index: number) => (
                    <div key={index} className="flex flex-col gap-1">
                        <Skeleton
                            height={100}
                            baseColor={theme.colors.bg.tetiary}
                            highlightColor={theme.colors.bg.alt1}
                        />
                        <Skeleton
                            baseColor={theme.colors.bg.tetiary}
                            highlightColor={theme.colors.bg.alt1}
                        />
                        <Skeleton
                            width={'50%'}
                            baseColor={theme.colors.bg.tetiary}
                            highlightColor={theme.colors.bg.alt1}
                        />
                    </div>
                ))
                :filteredSearchResults.data.length === 0 && searchResults.data.length !== 0 ?
                <NoData />
                :filteredSearchResults.data.length === 0 && searchValue.length ?
                <NoData />
                : filteredSearchResults.data.length === 0 &&
                <DndImage />
            }
        </div>
    )
}

export default Right