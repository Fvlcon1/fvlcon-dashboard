'use client'

import { imagesType } from '@/app/dashboard/home/components/images/controls';
import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';

export const liveContext = createContext<{
    activeCameras : number[],
    setActiveCameras: React.Dispatch<React.SetStateAction<number[]>>
}>({
    activeCameras : [],
    setActiveCameras: ()=>{}
});

export const LiveProvider = ({ children }: { children: ReactNode }) => {
    const [activeCameras, setActiveCameras] = useState<number[]>([1,2,3,4])
    return (
        <liveContext.Provider value={{ 
            activeCameras,
            setActiveCameras
         }}>
            {children}
        </liveContext.Provider>
    );
};
