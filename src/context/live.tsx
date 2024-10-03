'use client'

import { imagesType } from '@/app/dashboard/home/components/images/controls';
import { camExplorerData } from '@/app/live/components/profile container/camera links/camExplorerData';
import { activeCameraType, FolderOrCamera } from '@/utils/@types';
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
            url : "https://stream.fvlcon.app:8888/towncouncil/channel_1"
        },
        {
            id : '2',
            url : "https://stream.fvlcon.app:8888/towncouncil/channel_3"
        },
        {
            id : '3',
            url : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {
            id : '4',
            url : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        },
        {
            id : '5',
            url : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
        },
    ])
    const [numberOfCamerasPerPage, setNumberOfCamerasPerPage] = useState<number>(4)
    const [folders, setFolders] = useState<FolderOrCamera[]>(camExplorerData);
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
