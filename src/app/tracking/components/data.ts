import { IPersonTrackingType, ITrackingDataTypes, ITrackingWaypointsType } from "./types";

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


export const trackingDataWaypoints : ITrackingWaypointsType[] = [
    {
        name: 'Start Point',
        lastSeen: 'Korle Bu, Accra',
        coordinates: [5.5560, -0.2227],
        radius: 100,
        timeSeen: new Date('2024-10-05T15:00:00'),
        color: 'green',
        fillColor: '#28a745'
    },
    {
        name: 'Waypoint 1',
        lastSeen: 'High Street, Accra',
        coordinates: [5.5475, -0.2057],
        radius: 100,
        color: 'orange',
        fillColor: '#fd7e14',
        timeSeen: new Date('2024-10-05T15:00:00'),
    },
    {
        name: 'Waypoint 2',
        lastSeen: 'Osu Castle, Accra',
        coordinates: [5.5465, -0.1846],
        radius: 100,
        color: 'orange',
        fillColor: '#fd7e14',
        timeSeen: new Date('2024-10-05T15:00:00'),
    },
    {
        name: 'Waypoint 3',
        lastSeen: 'Osu Oxford Street, Accra',
        coordinates: [5.5519, -0.1741],
        radius: 100,
        color: 'orange',
        fillColor: '#fd7e14',
        timeSeen: new Date('2024-10-05T15:00:00'),
    },
    {
        name: 'Waypoint 4',
        lastSeen: 'East Legon, Accra',
        coordinates: [5.6145, -0.1751],
        radius: 100,
        color: 'orange',
        fillColor: '#fd7e14',
        timeSeen: new Date('2024-10-05T15:00:00'),
    },
    {
        name: 'Final Destination',
        lastSeen: 'Madina, Accra',
        coordinates: [5.6753, -0.1619],
        radius: 100,
        color: 'red',
        fillColor: '#dc3545',
        timeSeen: new Date('2024-10-05T15:00:00'),
    }
];
