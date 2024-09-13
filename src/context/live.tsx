'use client'

import { imagesType } from '@/app/dashboard/home/components/images/controls';
import { camdata } from '@/app/live/components/profile container/camera links/camdata';
import { FolderOrCamera } from '@/utils/@types';
import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';

export const liveContext = createContext<{
    activeCameras : number[]
    setActiveCameras: React.Dispatch<React.SetStateAction<number[]>>
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
    const [activeCameras, setActiveCameras] = useState<number[]>([1,2,3,4,5,6])
    const [numberOfCamerasPerPage, setNumberOfCamerasPerPage] = useState<number>(4)
    const [folders, setFolders] = useState<FolderOrCamera[]>(camdata);
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
