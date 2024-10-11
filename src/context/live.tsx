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
            url : "https://stream.fvlcon.app:8888/towncouncil/channel_1",
            location : 'Osu Accra',
            coordinates : [5.558, -0.187]
        },
        {
            id : '2',
            url : "https://stream.fvlcon.app:8888/towncouncil/channel_3",
            location : 'East legon, Accra',
            coordinates : [5.65, -0.163]
        },
        {
            id : '4',
            url : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            location : 'Spintex, Accra',
            coordinates : [5.6316, -0.1229]
        },
        {
            id : '5',
            url : "https://b-61687957.kinesisvideo.us-east-1.amazonaws.com/hls/v1/getHLSMasterPlaylist.m3u8?SessionToken=CiDaAZxsxDzJixJqPG5wxjDvbuYS_Lx7c9eS8VA_t3xnoBIQVCUinGjNaKOLbJ_VfDc8mxoZO56oeSqqduq6ASq-hmWKNeaFQ4dpJDJ-SSIgcFKVoxPosnl6ho7eZwEICOUVaWZOsboVBNsOsS7re6U~",
            location : 'Kokomlemle, new town',
            coordinates : [5.5655, -0.2077]
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
