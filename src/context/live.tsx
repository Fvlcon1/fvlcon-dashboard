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
            url : "https://stream.fvlcon.app:8888/towncouncil/channel_1",
            location : 'Osu Accra',
            streamName : "my_stream_name",
            coordinates : [5.558, -0.187]
        },
        {
            id : '2',
            url : "https://stream.fvlcon.app:8888/towncouncil/channel_3",
            location : 'East legon, Accra',
            streamName : "stream2",
            coordinates : [5.65, -0.163]
        },
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
