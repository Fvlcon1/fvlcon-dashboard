export interface FvlconizationLogsTypes {
    type : string
    uploadedImageUrl : string
    identifiedPeople : string[]
    identifiedPeopleDetails? : any[],
    date : Date
    timeElapsed : number,
    accuracy : number,
    status : string,
}

export interface FvlconizationVideoLogsType {
    type : string,
    status : string,
    date : Date,
    timeElapsed : number,
    thumbnailUrl : string
    occurance : any[],
    identifiedPeople? : string[]
}