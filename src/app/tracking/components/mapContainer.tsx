'use client';

import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { liveContext } from '@/context/live';
import { trackingContext } from '../context/trackingContext';// Import useMap directly
import './styles.css';
import MapInternal from './mapInternal';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const LocationMarker = dynamic(() => import('./marker').then(mod => mod.LocationMarker), { ssr: false });
const TrackingMarker = dynamic(() => import('./marker').then(mod => mod.TrackingMarker), { ssr: false });
const RoutingMachine = dynamic(() => import('./routingMachine'), { ssr: false });

const MapComponent = () => {
    const [wayPointsCoordinates, setWayPointsCoordinates] = useState<any>();
    const { activeCameras } = useContext(liveContext);
    const { showCameras, wayPoints, center } = useContext(trackingContext);
    const [zoom, setZoom] = useState<number>(12);

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
                    />
                ))}
                <RoutingMachine wayPointsCoordinates={wayPointsCoordinates} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;