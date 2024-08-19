'use client'

import { liveContext } from "@/context/live";
import LiveContainer from "./live container/liveContainer"
import { useContext, useEffect, useState } from "react"

const LiveView = () => {
    const {activeCameras, setActiveCameras} = useContext(liveContext)
    const [gridClass, setGridClass] = useState<string>();
    const [screenHeight, setScreenHeight] = useState<number>(100);

    const getGridClass = () => {
        const totalCameras = activeCameras.length;
        if (totalCameras <= 4) return "grid-cols-2 grid-rows-2";
        if (totalCameras <= 6) return "grid-cols-3 grid-rows-2";
        if (totalCameras <= 9) return "grid-cols-3 grid-rows-3";
        if (totalCameras <= 12) return "grid-cols-4 grid-rows-3";
    };

    useEffect(() => {
        setGridClass(getGridClass());
    }, [activeCameras]);

    useEffect(() => {
        setScreenHeight(window.innerHeight);
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return ()=> window.removeEventListener('resize', handleResize)
    }, []);

    return (
        <div
            className={`grid w-full gap-2 ${gridClass ?? 'grid-cols-2 gap-2'}`}
            style={{ height: `${screenHeight - 90}px` }}
        >
            {
                activeCameras.map((item, index: number) => (
                    <LiveContainer 
                        key={index}
                    />
                ))
            }
        </div>
    );
};
export default LiveView;
