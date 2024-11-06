import { LatLngExpression } from "leaflet"

export enum ITrackingDataTypes {
    person = 'person',
    plate = 'plate',
    all = 'all'
}

export type ITrackingDataType = 'all' | 'plate' | 'people'

export type IPersonTrackingType = {
    name : string,
    type : ITrackingDataTypes,
    streamName : string,
    alias : string,
    lastSeen : string,
    coordinates : LatLngExpression & number[],
    timeSeen : Date,
    S3Key : string,
    imageUrl? : string
}

export type ITrackingWaypointsType = {
    name : string,
    lastSeen : string,
    coordinates : LatLngExpression & number[],
    timeSeen : Date,
    radius : number,
    color? : string
    fillColor? : string
}