'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';
import L from 'leaflet'
import { LatLngExpression } from 'leaflet';

const CustomMarker = ({
    position
} : {
    position : LatLngExpression & number[]
}) => {
    const [camMarkerIcon, setCamMarkerIcon] = useState<L.Icon>();

    // Leaflet icon setup, wrapped inside useEffect to avoid SSR issues
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const icon = new L.Icon({
                iconUrl: '/assets/prod/cctv.png', // Ensure cam.png is in the /public/assets/prod/ folder
                iconSize: [35, 30],
            });
            setCamMarkerIcon(icon);
        }
    }, []);
    const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
    return (
        <Marker position={position} icon={camMarkerIcon}>
            <Popup>Cam</Popup>
        </Marker>
    )
}
export default CustomMarker