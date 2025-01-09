'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { trackingLogsType } from '../components/trackingLogs.types';

export const trackingLogsContext = createContext<{
    trackingLogs: {status?: 'loading' | null, data?: trackingLogsType[]}
    setTrackingLogs: React.Dispatch<React.SetStateAction<{status?: 'loading' | null, data?: trackingLogsType[]}>>
}>({
    trackingLogs : {status : null, data : []},
    setTrackingLogs : ()=> {}
});

export const TrackingLogsProvider = ({ children }: { children: ReactNode }) => {
    const [trackingLogs, setTrackingLogs] = useState<{status?: 'loading' | null, data?: trackingLogsType[]}>({status : null, data : []})
    return (
        <trackingLogsContext.Provider value={{
            trackingLogs,
            setTrackingLogs
         }}>
            {children}
        </trackingLogsContext.Provider>
    );
};
