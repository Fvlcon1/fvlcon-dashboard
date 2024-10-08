export enum ITrackingDataTypes {
    person = 'person',
    plate = 'plate'
}

export type IPersonTrackingType = {
    name : string,
    type : ITrackingDataTypes,
    alias : string,
    lastSeen : string,
    coordinates : number[],
    timeSeen : Date
}