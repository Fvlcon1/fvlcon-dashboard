'use client'

import { liveContext } from "@/context/live";
import LiveContainer from "./live container/liveContainer"
import { useContext, useEffect, useState } from "react"
import AppTypography from "@styles/components/appTypography";
import theme from "@styles/theme";
import ClickableTab from "@components/clickable/clickabletab";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { activeCameraType } from "@/utils/@types";
import { getHLSStreamURL } from "../utils/getHlsUrl";
import CapturedScreenshotImage from "./live container/capturedScreenshotImage";

const LiveView = () => {
    const {
        activeCameras, 
        setActiveCameras, 
        numberOfCamerasPerPage, 
        setNumberOfCamerasPerPage
    } = useContext(liveContext)
    const [gridClass, setGridClass] = useState<string>();
    const [screenHeight, setScreenHeight] = useState<number>(100);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cameras, setCameras] = useState<activeCameraType[][]>([])

    const getGridClass = () => {;
        switch (true) {
            case numberOfCamerasPerPage === 1:
              return "grid-cols-1 grid-rows-1";
            case numberOfCamerasPerPage <= 4:
              return "grid-cols-2 grid-rows-2";
            case numberOfCamerasPerPage <= 6:
              return "grid-cols-3 grid-rows-2";
            case numberOfCamerasPerPage <= 9:
              return "grid-cols-3 grid-rows-3";
            case numberOfCamerasPerPage <= 12:
              return "grid-cols-4 grid-rows-3";
            default:
                return "grid-cols-2 grid-rows-2";
          }
    };

    const handleBack = () => {
        if(currentIndex > 0)
            setCurrentIndex(prev => prev - 1)
    }

    const handleFoward = () => {
        if(currentIndex < cameras.length - 1)
            setCurrentIndex(prev => prev + 1)
    }

    const handleSetCamerasPerPage = () => {
        const cameras = []
        for (let i = 0; i < activeCameras.length; i += numberOfCamerasPerPage) {
            const chunk = activeCameras.slice(i, i + numberOfCamerasPerPage);
            cameras.push(chunk);
          }
        setCameras(cameras)
    }

    useEffect(() => {
        setGridClass(getGridClass());
        handleSetCamerasPerPage()
    }, [activeCameras, numberOfCamerasPerPage]);

    useEffect(() => {
        getHLSStreamURL("my_stream_name")
        setScreenHeight(window.innerHeight);
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return ()=> window.removeEventListener('resize', handleResize)
    }, []);

    return (
        <>
            <CapturedScreenshotImage />
            <div className="flex flex-col justify-between h-[90vh] gap-2 w-full">
                <div 
                    className="w-full relative overflow-hidden h-fit"
                    // style={{ height: `${screenHeight - 125}px` }}
                >
                    <div
                        className="flex transition-transform duration-500 h-full"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {
                            cameras.map((item, index) => (
                                <div
                                    className={`grid min-w-full gap-2 ${gridClass ?? 'grid-cols-2 gap-2'}`}
                                    // style={{ height: `${screenHeight - 125}px` }}
                                    key={index}
                                >
                                    {
                                        item.map((cam, index: number) => (
                                            <LiveContainer 
                                                key={index}
                                                index={index}
                                                url={cam.url}
                                                id={`liveContainer${index}`}
                                                gridClass={gridClass}
                                                streamName={cam.streamName}
                                            />
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex w-full justify-center items-center gap-1">
                    <ClickableTab
                        className="hover:!bg-bg-quantinary !rounded-full"
                        onClick={handleBack}
                    >
                        <FaCaretLeft
                            color={theme.colors.text.secondary}
                        />
                    </ClickableTab>
                    <div className="px-3 h-[30px] rounded-full bg-bg-tetiary gap-2 flex justify-center items-center">
                        {
                            cameras.map((item, index) => (
                                <div 
                                    className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-slate-50' : 'bg-bg-alt1'} duration-500`}
                                    key={index}
                                >
                                    
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex rounded-full px-3 h-[30px] justify-center items-center bg-bg-tetiary">
                        <AppTypography
                            textColor={theme.colors.text.primary}
                        >
                            + {cameras.length - 1}
                        </AppTypography>
                    </div>
                    <ClickableTab
                        className="hover:!bg-bg-quantinary !rounded-full"
                        onClick={handleFoward}
                    >
                        <FaCaretRight 
                            color={theme.colors.text.secondary}
                        />
                    </ClickableTab>
                </div>
            </div>
        </>
    );
};
export default LiveView;
