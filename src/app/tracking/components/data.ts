import { IPersonTrackingType, ITrackingDataTypes } from "./types";

export const personTrackingData: IPersonTrackingType[] = [
    {
        type: ITrackingDataTypes.person,
        name: 'Kwame Asante',
        alias: 'Kwame Hustler',
        lastSeen: 'Osu, Accra',
        coordinates: [5.5580, -0.1870],  // Osu, Accra
        timeSeen: new Date('2024-10-03T12:45:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Ama Serwaa',
        alias: 'Golden Voice',
        lastSeen: 'East Legon, Accra',
        coordinates: [5.6500, -0.1630],  // East Legon, Accra
        timeSeen: new Date('2024-10-01T08:15:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Yaw Mensah',
        alias: 'Street King',
        lastSeen: 'Spintex, Accra',
        coordinates: [5.6316, -0.1229],  // Spintex, Accra
        timeSeen: new Date('2024-10-04T14:00:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Mohammed Ismail',
        alias: 'Black Sherif',
        lastSeen: 'Kokomlemle, New Town',
        coordinates: [5.5655, -0.2077],  // Kokomlemle, New Town
        timeSeen: new Date('2024-10-05T10:30:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Akosua Addo',
        alias: 'Night Runner',
        lastSeen: 'Labone, Accra',
        coordinates: [5.5647, -0.1747],  // Labone, Accra
        timeSeen: new Date('2024-09-30T11:20:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Kojo Annan',
        alias: 'Quick Feet',
        lastSeen: 'Madina, Accra',
        coordinates: [5.6802, -0.1657],  // Madina, Accra
        timeSeen: new Date('2024-10-02T16:45:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Esi Adjei',
        alias: 'Power Woman',
        lastSeen: 'Achimota, Accra',
        coordinates: [5.6154, -0.2341],  // Achimota, Accra
        timeSeen: new Date('2024-09-29T09:30:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Kwesi Oppong',
        alias: 'Silent Mover',
        lastSeen: 'Dansoman, Accra',
        coordinates: [5.5731, -0.2511],  // Dansoman, Accra
        timeSeen: new Date('2024-10-04T13:10:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Abena Asamoah',
        alias: 'The Phantom',
        lastSeen: 'Adenta, Accra',
        coordinates: [5.7044, -0.1729],  // Adenta, Accra
        timeSeen: new Date('2024-09-28T07:55:00')  
    },
    {
        type: ITrackingDataTypes.person,
        name: 'Kofi Boateng',
        alias: 'Steel Gaze',
        lastSeen: 'Tema, Community 1',
        coordinates: [5.6786, -0.0177],  // Tema, Community 1
        timeSeen: new Date('2024-10-05T15:00:00')  
    }
];
