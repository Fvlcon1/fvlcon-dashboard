export interface Filters {
    startDate?: Date;
    endDate?: Date;
}

export interface trackingLogsType {
    imageUrl : string,
    identifiedPerson : string,
    date : Date,
    locations : {
        name : string,
        coordiantes : number[]
    }[],
}