export interface SegmentationLogsTypes {
    type : string
    media : {
        status: string,
        segmentedImageS3Key: string,
        segmentedImageUrl: string
    }[]
    date : Date
    uploadedImageS3key : string
    uploadedImageUrl : string
    timeElapsed : number
    status : string
}