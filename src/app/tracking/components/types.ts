import { LatLngExpression } from "leaflet"

export enum ITrackingDataTypes {
    person = 'person',
    plate = 'plate'
}

export type IPersonTrackingType = {
    name : string,
    type : ITrackingDataTypes,
    alias : string,
    lastSeen : string,
    coordinates : LatLngExpression & number[],
    timeSeen : Date
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