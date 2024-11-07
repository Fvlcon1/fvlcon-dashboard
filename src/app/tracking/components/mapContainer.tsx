'use client';

import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { liveContext } from '@/context/live';
import { trackingContext } from '../context/trackingContext';// Import useMap directly
import './styles.css';
import MapInternal from './mapInternal';
import { ITrackingWaypointsType } from './types';
import { protectedAPI } from '@/utils/api/api';
import { message } from 'antd';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const LocationMarker = dynamic(() => import('./marker').then(mod => mod.LocationMarker), { ssr: false });
const TrackingMarker = dynamic(() => import('./marker').then(mod => mod.TrackingMarker), { ssr: false });
const RoutingMachine = dynamic(() => import('./routingMachine'), { ssr: false });
const privateApi = new protectedAPI()

const MapComponent = () => {
    const [wayPointsCoordinates, setWayPointsCoordinates] = useState<(LatLngExpression & number[])[]>();
    const { activeCameras } = useContext(liveContext);
    const { showCameras, wayPoints, center, setCaptureDetails, setCenter } = useContext(trackingContext);
    const [zoom, setZoom] = useState<number>(12);

    const handleSetCaptureDetails = async (waypoint : ITrackingWaypointsType) => {
        const {name, type, alias, lastSeen, coordinates, timeSeen, streamName, S3Key, faceId, userId} = waypoint
        setCaptureDetails({status : 'loading'})
        let imageUrl : string | undefined
        if(S3Key){
            try {
                const response = await privateApi.get(`/tracking/generatePresignedUrl/${S3Key}`)
                imageUrl = response?.data
            } catch (error) {
                console.log({error})
                message.error("Error getting image url")
            }
        }
        setCaptureDetails({
            data : {
                name,
                type,
                alias,
                lastSeen,
                coordinates,
                timeSeen,
                streamName,
                S3Key,
                imageUrl,
                faceId,
                userId
            },
            status : undefined
        })
        setCenter(waypoint.coordinates)
    }

    // Function to retrieve coordinates from waypoints
    const getWaypointCoordinates = () => {
        if (wayPoints) {
            const coordinates = wayPoints.map(point => point.coordinates);
            setWayPointsCoordinates(coordinates);
        }
    };

    useEffect(() => {
        getWaypointCoordinates();
        setTimeout(() => {
            setZoom(15);
        }, 3000);
    }, [wayPoints]);

    return (
        <div className="w-full relative overflow-hidden flex justify-center items-center rounded-lg bg-bg-secondary h-full">
            <MapContainer
                className="w-full h-full"
                center={center ?? (activeCameras[0].coordinates as LatLngExpression & number[])}
                zoom={zoom}
                scrollWheelZoom={true}
                markerZoomAnimation
            >
                <MapInternal 
                    center={center}
                    zoom={zoom}
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showCameras &&
                    activeCameras?.map((cam, index) => (
                        <LocationMarker
                            key={index}
                            position={cam.coordinates as LatLngExpression & number[]}
                        />
                    ))}
                {wayPoints?.map((item, index) => (
                    <TrackingMarker
                        key={index}
                        position={[item.coordinates[0] + 0.0003, item.coordinates[1] - 0.0005] as LatLngExpression & number[]}
                        onClick={()=>handleSetCaptureDetails(item)}
                    />
                ))}
                <RoutingMachine wayPointsCoordinates={wayPointsCoordinates} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;