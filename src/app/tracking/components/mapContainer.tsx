'use client'

import dynamic from 'next/dynamic';
import { ClickAwayListener } from '@mui/base';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';
import Text from '@styles/components/text';
import theme from '@styles/theme';
import { IoLocation } from 'react-icons/io5';
import { liveContext } from '@/context/live';
import { trackingContext } from '../context/trackingContext';
import getLocationNameFromCordinates from '@/utils/getLocationNameFromCoordinates';

// Dynamically import leaflet components without SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const CustomMarker = dynamic(() => import('./marker'), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const MapComponent = () => {
    const coordinates : LatLngExpression & number[] = [5.553392620250122, -0.2420921711635305]
    const {activeCameras} = useContext(liveContext)
    const {showCameras} = useContext(trackingContext)
    const [locationName, setLocationName] = useState<any>()

    const getLocation = async () => {
        const location = await getLocationNameFromCordinates(coordinates)
        setLocationName(location)
    }

    useEffect(()=>{
        getLocation()
    },[])
    return (
        <div className="w-full relative overflow-hidden flex justify-center items-center rounded-md bg-bg-secondary h-full">
            <MapContainer className="w-full h-full" center={activeCameras[0].coordinates ? activeCameras[0].coordinates as LatLngExpression & number[] : coordinates} zoom={12} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    showCameras &&
                    activeCameras?.map((cam, index) => (
                        <CustomMarker 
                            key={index}
                            position={cam.coordinates as LatLngExpression & number[]} 
                        />
                    ))
                }
            </MapContainer>
        </div>
    );
};

export default MapComponent;
