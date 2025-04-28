import { ReactNode } from "react";

// In utils/types.ts
export interface BaseAlert {
    id: string;
    type: 'person' | 'vehicle';
    reason: string;
    recipients: string[];
    dateCreated: string;
    priority: Priority;
}

export interface PersonAlert extends BaseAlert {
    type: 'person';
    name?: string;
    gender: string;
    ageRange: string;
    imageUrl : string
}

export interface VehicleAlert extends BaseAlert {
    type: 'vehicle';
    plateNumber: string;
    typeofVehicle: string;
    color: string;
}

export type Priority = 'high priority' | 'medium priority' | 'low priority'

export type AlertData = PersonAlert | VehicleAlert;

export interface PersonData {
    left: ReactNode;
    recipients: ReactNode;
    dateCreated: ReactNode;
    priority: ReactNode;
    actions: ReactNode;
}

export interface VehicleData {
    left: ReactNode;
    recipients: ReactNode;
    dateCreated: ReactNode;
    priority: ReactNode;
    actions: ReactNode;
}

export type AlertTableData = PersonData | VehicleData