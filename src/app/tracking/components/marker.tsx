'use client'

import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';
import L from 'leaflet'
import { LatLngExpression } from 'leaflet';

const CustomMarker = ({
    position,
    popup
} : {
    position : LatLngExpression & number[]
    popup? : ReactNode
}) => {
    const [camMarkerIcon, setCamMarkerIcon] = useState<L.Icon>();

    // Leaflet icon setup, wrapped inside useEffect to avoid SSR issues
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const icon = new L.Icon({
                iconUrl: '/assets/prod/pin.png', // Ensure cam.png is in the /public/assets/prod/ folder
                iconSize: [55, 50],
            });
            setCamMarkerIcon(icon);
        }
    }, []);
    const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
    return (
        <Marker position={position} icon={camMarkerIcon}>
            <Popup>
                {popup ?? `${position[0]}, ${position[1]}`}
            </Popup>
        </Marker>
    )
}
export default CustomMarker