import dynamic from 'next/dynamic';
import { ClickAwayListener } from '@mui/base';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';
import Text from '@styles/components/text';
import theme from '@styles/theme';
import { IoLocation } from 'react-icons/io5';

// Dynamically import leaflet components without SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const CustomMarker = dynamic(() => import('./marker'), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const Map = ({
    show,
    setShow,
}: {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}) => {
    const coordinates : LatLngExpression & number[] = [5.553392620250122, -0.2420921711635305]
    const [locationName, setLocationName] = useState<any>()

    const getLocationNameFromCordinates = async () => {
        const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse`, {
            params : {
                lat : coordinates[0],
                lon : coordinates[1],
                appid : '12d9154b1f1c1178b34d1b238de0b6f4'
            }
        })
        setLocationName(response.data[0])
    }
    useEffect(()=>{
        getLocationNameFromCordinates()
    },[])
    return (
        <AnimatePresence>
            {show && (
                <ClickAwayListener onClickAway={() => setShow(false)}>
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="absolute flex flex-col gap-2 top-8 right-0 w-[300px] p-2 rounded-lg bg-[#0000008b] backdrop-filter backdrop-blur-2xl shadow-custom-shadow"
                    >
                        <div className="w-full relative overflow-hidden flex justify-center items-center rounded-md bg-bg-secondary h-[150px]">
                            <MapContainer className="w-full h-[150px]" center={coordinates} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <CustomMarker position={coordinates}/>
                            </MapContainer>
                        </div>
                        <div className='flex items-center gap-1'>
                            <IoLocation 
                                color={theme.colors.text.primary}
                                size={13}
                                className='mt-[-2px]'
                            />
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {`${locationName.name}, ${locationName.state}`}
                            </Text>
                        </div>
                    </motion.div>
                </ClickAwayListener>
            )}
        </AnimatePresence>
    );
};

export default Map;
