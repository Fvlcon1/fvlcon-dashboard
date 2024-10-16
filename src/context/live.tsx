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
            streamName : "my_stream_name",
            coordinates : [5.558, -0.187]
        // },
        // {
        //     id : '2',
        //     url : "https://stream.fvlcon.app:8888/towncouncil/channel_3",
        //     location : 'East legon, Accra',
        //     streamName : "my_stream_name",
        //     coordinates : [5.65, -0.163]
        // },
        // {
        //     id : '4',
        //     url : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        //     location : 'Spintex, Accra',
        //     streamName : "my_stream_name",
        //     coordinates : [5.6316, -0.1229]
        // },
        // {
        //     id : '5',
        //     url : "https://b-61687957.kinesisvideo.us-east-1.amazonaws.com/hls/v1/getHLSMasterPlaylist.m3u8?SessionToken=CiBvnJwsJ3RF4OqXt1l1mfRt1CFrQtcZZ0tbS4YDHWHKZxIQ-1eHThDwhJkmxnuCbigpVhoZAYljNZaUescsE4aPFKDxg6bMwCB0d7ZhwSIgf5NZ0Nfo7dV0E0b2IIXZjpZiMXOoMz69k6tdK9_QOz4~",
        //     location : 'Kokomlemle, new town',
        //     streamName : "my_stream_name",
        //     coordinates : [5.5655, -0.2077]
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
