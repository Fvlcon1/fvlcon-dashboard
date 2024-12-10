'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';
import { FvlconizationLogsTypes } from '../components/fvlconizationLogs.types';

export const fvlocnizationLogsContext = createContext<{
    fvlconizationLogs: FvlconizationLogsTypes[]
    setFvlconizationLogs: React.Dispatch<React.SetStateAction<FvlconizationLogsTypes[]>>
}>({
    fvlconizationLogs : [],
    setFvlconizationLogs : ()=> {}
});

export const FvlocnizationLogsContextProvider = ({ children }: { children: ReactNode }) => {
    const [fvlconizationLogs, setFvlconizationLogs] = useState<FvlconizationLogsTypes[]>([])
    return (
        <fvlocnizationLogsContext.Provider value={{
            fvlconizationLogs,
            setFvlconizationLogs
         }}>
            {children}
        </fvlocnizationLogsContext.Provider>
    );
};
