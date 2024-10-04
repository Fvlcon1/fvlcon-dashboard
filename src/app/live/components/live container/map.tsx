import dynamic from 'next/dynamic';
import { ClickAwayListener } from '@mui/base';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import camIcon from '@/assets/prod/cctv.png'
import L from 'leaflet';

// Dynamically import MapContainer and other leaflet components with SSR disabled
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
    ssr: false, // Disable server-side rendering
});
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const Map = ({
    show,
    setShow
}: {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}) => {
    const [camMarkerIcon, setCamMarkerIcon] = useState<L.Icon | null>(null);
    const [isBrowser, setIsBrowser] = useState(false);

    // Check if we're running in the browser (client-side)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsBrowser(true);
            const icon = new L.Icon({
                iconUrl: camIcon.src,
                iconSize: [35, 35]
            });
            setCamMarkerIcon(icon);
        }
    }, []);

    if (!isBrowser) {
        return null; // Return nothing during server-side rendering
    }

    return (
        <AnimatePresence>
            {show && (
                <ClickAwayListener onClickAway={() => setShow(false)}>
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="absolute top-8 right-0 w-[300px] p-2 rounded-lg bg-[#0000008b] backdrop-filter backdrop-blur-2xl shadow-custom-shadow"
                    >
                        <div className="w-full relative overflow-hidden flex justify-center items-center rounded-md bg-bg-secondary h-[150px]">
                            <MapContainer className="w-full h-[150px]" center={[5.5534139772087805, -0.2421029]} zoom={13} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {camMarkerIcon && (
                                    <Marker position={[5.5534139772087805, -0.2421029]} icon={camMarkerIcon}>
                                        <Popup>
                                            Cam
                                        </Popup>
                                    </Marker>
                                )}
                            </MapContainer>
                        </div>
                    </motion.div>
                </ClickAwayListener>
            )}
        </AnimatePresence>
    );
};

export default Map;