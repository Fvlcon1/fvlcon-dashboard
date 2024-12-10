'use client'

import { imagesType } from '@/app/dashboard/home/components/images/controls';
import { camExplorerData } from '@/app/live/components/profile container/camera links/camExplorerData';
import { activeCameraType, FolderOrCamera } from '@/utils/@types';
import { protectedAPI } from '@/utils/api/api';
import { message } from 'antd';
import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';

export const liveContext = createContext<{
    activeCameras : activeCameraType[]
    setActiveCameras: React.Dispatch<React.SetStateAction<activeCameraType[]>>
    numberOfCamerasPerPage : number
    setNumberOfCamerasPerPage: React.Dispatch<React.SetStateAction<number>>
    folders: FolderOrCamera[]
    setFolders: React.Dispatch<React.SetStateAction<FolderOrCamera[]>>
}>({
    activeCameras : [],
    setActiveCameras: ()=>{},
    numberOfCamerasPerPage : 0,
    setNumberOfCamerasPerPage : ()=>{},
    folders : [],
    setFolders : ()=> {}
});

export const LiveProvider = ({ children }: { children: ReactNode }) => {
    const [activeCameras, setActiveCameras] = useState<activeCameraType[]>([
        {
            id : '1',
            url : "https://ljexe63ri7c60g-4000.proxy.runpod.net/",
            location : 'Osu Accra',
            streamName : "my_stream_name",
            coordinates : [5.558, -0.187]
        },
        {
            id : '2',
            url : "https://ljexe63ri7c60g-3000.proxy.runpod.net/",
            location : 'Kumasi',
            streamName : "stream2",
            coordinates : [6.669450646774655, -1.5176043915812956]
        },
        // {
        //     id : '3',
        //     url : "https://63ff329fba3ea428cf30d60dccb666c6.serveo.net/video_feed",
        //     location : 'East legon, Accra',
        //     streamName : "stream2",
        //     coordinates : [5.65, -0.163]
        // },
    ])
    const [numberOfCamerasPerPage, setNumberOfCamerasPerPage] = useState<number>(4)
    const [folders, setFolders] = useState<FolderOrCamera[]>([]);
    return (
        <liveContext.Provider value={{ 
            activeCameras,
            setActiveCameras,
            numberOfCamerasPerPage,
            setNumberOfCamerasPerPage,
            folders,
            setFolders
         }}>
            {children}
        </liveContext.Provider>
    );
};
