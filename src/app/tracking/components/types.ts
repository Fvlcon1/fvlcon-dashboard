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
    faceId : string,
    imageUrl? : string
    userId : string
}

export interface IPersonTrackingWithImageType extends IPersonTrackingType {
    originalImageUrl? : string
}

export interface ITrackingWaypointsType extends IPersonTrackingType {
    coordinates : LatLngExpression & number[],
    radius : number,
    color? : string
    fillColor? : string
}