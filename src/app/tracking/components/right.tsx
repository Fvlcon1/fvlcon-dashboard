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
import { IPersonTrackingType, ITrackingDataTypes } from "./types"
import { API_URL } from "@/utils/constants"
import axios from "axios"
import { parseCoordinates } from "@/utils/parseCoordinate"
import { LatLngExpression } from "leaflet"
import getLocationNameFromCordinates from "@/utils/getLocationNameFromCoordinates"
import Skeleton from "react-loading-skeleton"
import { trackingContext } from "../context/trackingContext"
import { message } from "antd"
import NoData from "./noData"

const privateAPI = new protectedAPI()
const publicAPI = new unprotectedAPI()

const Right = () => {
    const [newPersonTrackingData, setPersonTrackingData] = useState<{ status: 'loading' | null, data: IPersonTrackingType[] }>({ status: null, data: [] })
    const [filteredPersonTrackingData, setFilteredPersonTrackingData] = useState(newPersonTrackingData)
    const { imageUrl, setImageUrl } = useContext(trackingContext)

    const getTrackingData = async (imageUrl: string) => {
        setPersonTrackingData({ status: 'loading', data: [] })
        try {
            const response = await privateAPI.post("/tracking/searchFaceByImage", {
                collectionId: "rek-collection1",
                base64Image: imageUrl
            })
            const trackingData = response?.data

            const { data: faceDetails } = await axios.get(`${API_URL}/${trackingData[0].FaceId}`)
            const people: IPersonTrackingType[] = []

            for (const data of trackingData) {
                try {
                    const { FaceId, Timestamp, coordinates, stream_name, S3Key, userId } = data
                    const arrayCoordinates = parseCoordinates(coordinates)
                    const {name : locationName} = await getLocationNameFromCordinates(arrayCoordinates)

                    const personResultsParams: IPersonTrackingType = {
                        name: `${faceDetails.FirstName} ${faceDetails.LastName}`,
                        type: ITrackingDataTypes.person,
                        alias: "",
                        lastSeen: locationName,
                        coordinates: arrayCoordinates,
                        timeSeen: new Date(Timestamp),
                        faceId : FaceId,
                        streamName : stream_name,
                        S3Key,
                        userId
                    }
                    people.push(personResultsParams)
                } catch (error: any) {
                    console.log({ error })
                    message.error("Error fetching data")
                    setPersonTrackingData( prev => ({
                        ...prev,
                        status: null,
                    }))
                }
            }

            const  delay = (ms : number) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            
            const updatePersonTrackingData = async (people : IPersonTrackingType[]) => {
                for (let person of people) {
                    setPersonTrackingData(prev => ({
                        data: [...prev.data, person],
                        status: null
                    }));
                    console.log({ person });
                    await delay(100);
                }
            }

            updatePersonTrackingData(people)
        } catch (error: any) {
            console.log({ error })
            setPersonTrackingData({
                status: null,
                data: []
            })
            message.error(error.response?.data.message ?? error.message)
        }
    }

    useEffect(()=>{
        setFilteredPersonTrackingData(newPersonTrackingData)
    },[newPersonTrackingData])

    useEffect(() => {
        if (imageUrl?.length) {
            getTrackingData(imageUrl)
        }
    }, [imageUrl])

    return (
        <div className="w-[25%] min-w-[330px] max-w-[350px] p-3 flex h-full bg-gradient-container overflow-y-auto rounded-lg flex-col gap-2">
            <RightControls 
                newPersonTrackingData={newPersonTrackingData}
                setFilteredPersonTrackingData={setFilteredPersonTrackingData}
            />
            {
                filteredPersonTrackingData.status === 'loading' ?
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
                    :filteredPersonTrackingData.data.length === 0 && newPersonTrackingData.data.length !== 0 ?
                    <NoData />
                    : filteredPersonTrackingData.data.length === 0 ?
                    <DndImage />
                    :
                    <div className="flex flex-col w-full overflow-y-auto">
                        {
                            filteredPersonTrackingData.data.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col w-[95%] duration-200 gap-3 pt-3 hover:bg-bg-secondary cursor-pointer"
                                >
                                    <PersonResultContainer
                                        {...item}
                                    />
                                    <Divider className="!w-full" />
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Right