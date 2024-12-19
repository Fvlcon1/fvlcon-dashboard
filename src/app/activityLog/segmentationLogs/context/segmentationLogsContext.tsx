'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { Dispatch } from 'react';
import { SegmentationLogsTypes } from '../components/segmentationLogs.types';

export const SegmentationLogsContext = createContext<{
    segmentationLogs: {status?: 'loading' | null, data?: SegmentationLogsTypes[]}
    setSegmentationLogs: React.Dispatch<React.SetStateAction<{status?: 'loading' | null, data?: SegmentationLogsTypes[]}>>
}>({
    segmentationLogs : {status : null, data : []},
    setSegmentationLogs : ()=> {}
});

export const SegmentationLogsContextProvider = ({ children }: { children: ReactNode }) => {
    const [segmentationLogs, setSegmentationLogs] = useState<{status?: 'loading' | null, data?: SegmentationLogsTypes[]}>({status : null, data : []})
    return (
        <SegmentationLogsContext.Provider value={{
            segmentationLogs,
            setSegmentationLogs
         }}>
            {children}
        </SegmentationLogsContext.Provider>
    );
};
