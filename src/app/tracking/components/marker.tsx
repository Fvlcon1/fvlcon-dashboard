'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
import L from 'leaflet';
import { LatLngExpression } from 'leaflet';

const CustomMarker = ({
    position,
    popup,
    onClick
} : {
    position : LatLngExpression & number[],
    popup? : ReactNode,
    onClick?: () => void
}) => {
    const [camMarkerIcon, setCamMarkerIcon] = useState<L.Icon>();

    useEffect(() => {
        const icon = new L.Icon({
            iconUrl: '/assets/prod/pin.png',
            iconSize: [55, 50],
        });
        setCamMarkerIcon(icon);
    }, []);

    const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
    const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

    return (
        <Marker position={position} icon={camMarkerIcon} eventHandlers={{ click: onClick }}>
            <Popup>{popup ?? `${position[0]}, ${position[1]}`}</Popup>
        </Marker>
    );
};

export const BlueDotMarker = ({
    position,
    popup,
    onClick
} : {
    position : LatLngExpression & number[],
    popup? : ReactNode,
    onClick?: () => void
}) => {
    const [camMarkerIcon, setCamMarkerIcon] = useState<L.Icon>();

    useEffect(() => {
        const icon = new L.Icon({
            iconUrl: '/assets/prod/blueDot.png',
            iconSize: [18, 15],
        });
        setCamMarkerIcon(icon);
    }, []);

    const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
    const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

    return (
        <Marker position={position} icon={camMarkerIcon} eventHandlers={{ click: onClick }}>
            <Popup>{popup ?? `${position[0]}, ${position[1]}`}</Popup>
        </Marker>
    );
};

export const TrackingMarker = ({
    position,
    popup,
    onClick
} : {
    position : LatLngExpression & number[],
    popup? : ReactNode,
    onClick?: () => void
}) => {
    const [camMarkerIcon, setCamMarkerIcon] = useState<L.Icon>();

    useEffect(() => {
        const icon = new L.Icon({
            iconUrl: '/assets/prod/pin.png',
            iconSize: [55, 50],
        });
        setCamMarkerIcon(icon);
    }, []);

    const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
    const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

    return (
        <Marker position={position} icon={camMarkerIcon} eventHandlers={{ click: onClick }}>
            <Popup>{popup ?? `${position[0]}, ${position[1]}`}</Popup>
        </Marker>
    );
};

export const LocationMarker = ({
    position,
    popup,
    onClick
} : {
    position : LatLngExpression & number[],
    popup? : ReactNode,
    onClick?: () => void
}) => {
    const [camMarkerIcon, setCamMarkerIcon] = useState<L.Icon>();

    useEffect(() => {
        const icon = new L.Icon({
            iconUrl: '/assets/prod/location shadow.png',
            iconSize: [40, 40],
        });
        setCamMarkerIcon(icon);
    }, []);

    const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
    const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

    return (
        <Marker position={position} icon={camMarkerIcon} eventHandlers={{ click: onClick }}>
            <Popup>{popup ?? `${position[0]}, ${position[1]}`}</Popup>
        </Marker>
    );
};

export default CustomMarker;