'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';
import { FvlconizationLogsTypes, FvlconizationVideoLogsType } from '../components/fvlconizationLogs.types';

export const fvlocnizationLogsContext = createContext<{
    fvlconizationLogs: {status?: 'loading' | null, data?: FvlconizationLogsTypes[]}
    setFvlconizationLogs: React.Dispatch<React.SetStateAction<{status?: 'loading' | null, data?: FvlconizationLogsTypes[]}>>
    fvlconizationVideoLogs: {status?: 'loading' | null, data?: FvlconizationVideoLogsType[]}
    setFvlconizationVideoLogs: React.Dispatch<React.SetStateAction<{status?: 'loading' | null, data?: FvlconizationVideoLogsType[]}>>
    setTypeValue: React.Dispatch<React.SetStateAction<"image" | "video">>
    typeValue: "image" | "video"
}>({
    fvlconizationLogs : {status : null, data : []},
    setFvlconizationLogs : ()=> {},
    fvlconizationVideoLogs : {status : null, data : []},
    setFvlconizationVideoLogs : ()=> {},
    typeValue : 'image',
    setTypeValue : ()=>{}
});

export const FvlocnizationLogsContextProvider = ({ children }: { children: ReactNode }) => {
    const [fvlconizationLogs, setFvlconizationLogs] = useState<{status?: 'loading' | null, data?: FvlconizationLogsTypes[]}>({status : null, data : []})
    const [fvlconizationVideoLogs, setFvlconizationVideoLogs] = useState<{status?: 'loading' | null, data?: FvlconizationVideoLogsType[]}>({status : null, data : []})
    const [typeValue, setTypeValue] = useState<"image" | "video">('image')

    return (
        <fvlocnizationLogsContext.Provider value={{
            fvlconizationLogs,
            setFvlconizationLogs,
            fvlconizationVideoLogs,
            setFvlconizationVideoLogs,
            typeValue,
            setTypeValue
         }}>
            {children}
        </fvlocnizationLogsContext.Provider>
    );
};
