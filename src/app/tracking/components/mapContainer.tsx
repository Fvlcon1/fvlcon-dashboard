'use client'

import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { liveContext } from '@/context/live';
import { trackingContext } from '../context/trackingContext';
import getLocationNameFromCordinates from '@/utils/getLocationNameFromCoordinates';
import { trackingDataWaypoints } from './data';
import './styles.css'

// Dynamically import leaflet components without SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });
const CustomMarker = dynamic(() => import('./marker'), { ssr: false });
const RoutingMachine = dynamic(() => import('./routingMachine'), { ssr: false });
const BlueDotMarker = dynamic(() => import('./marker').then(mod => mod.BlueDotMarker), { ssr: false });
const TrackingMarker = dynamic(() => import('./marker').then(mod => mod.TrackingMarker), { ssr: false });
const LocationMarker = dynamic(() => import('./marker').then(mod => mod.LocationMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const MapComponent = () => {
    const coordinates : LatLngExpression & number[] = [5.553392620250122, -0.2420921711635305]
    const [wayPointsCoordinates, setWayPointsCoordinates] = useState<any>()
    const {activeCameras} = useContext(liveContext)
    const {showCameras} = useContext(trackingContext)
    const [locationName, setLocationName] = useState<any>()
    const [zoom, setZoom] = useState<number>(12)

    const getLocation = async () => {
        const location = await getLocationNameFromCordinates(coordinates)
        setLocationName(location)
    }

    const getWaypointCoordinates = () => {
        const coordinates = trackingDataWaypoints.map(point => point.coordinates)
        setWayPointsCoordinates(coordinates)
    }

    useEffect(()=>{
        getLocation()
        getWaypointCoordinates()
        setTimeout(() => {
            setZoom(15)
        }, 3000);
    },[])
    return (
        <div className="w-full relative overflow-hidden flex justify-center items-center rounded-lg bg-bg-secondary h-full">
            <MapContainer className="w-full h-full" center={activeCameras[0].coordinates ? activeCameras[0].coordinates as LatLngExpression & number[] : coordinates} zoom={zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    showCameras &&
                    activeCameras?.map((cam, index) => (
                        <LocationMarker
                            key={index}
                            position={cam.coordinates as LatLngExpression & number[]} 
                        />
                    ))
                }
                {
                    trackingDataWaypoints.map((item, index) => (
                        <TrackingMarker
                            key={index}
                            position={[item.coordinates[0] + 0.0003, item.coordinates[1] - 0.0005] as LatLngExpression & number[]} 
                        />
                    ))
                }
                <RoutingMachine 
                    wayPointsCoordinates={wayPointsCoordinates}
                />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
