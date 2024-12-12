'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';
import { FvlconizationLogsTypes } from '../components/fvlconizationLogs.types';

export const fvlocnizationLogsContext = createContext<{
    fvlconizationLogs: {status?: 'loading' | null, data?: FvlconizationLogsTypes[]}
    setFvlconizationLogs: React.Dispatch<React.SetStateAction<{status?: 'loading' | null, data?: FvlconizationLogsTypes[]}>>
}>({
    fvlconizationLogs : {status : null, data : []},
    setFvlconizationLogs : ()=> {}
});

export const FvlocnizationLogsContextProvider = ({ children }: { children: ReactNode }) => {
    const [fvlconizationLogs, setFvlconizationLogs] = useState<{status?: 'loading' | null, data?: FvlconizationLogsTypes[]}>({status : null, data : []})
    return (
        <fvlocnizationLogsContext.Provider value={{
            fvlconizationLogs,
            setFvlconizationLogs
         }}>
            {children}
        </fvlocnizationLogsContext.Provider>
    );
};
