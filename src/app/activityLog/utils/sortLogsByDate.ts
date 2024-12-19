export const sortLogsByDate = (logs : {date : Date, [key : string] : any}[], sortType : 'asc' | 'des' = 'des') => {
    const filteredLogs = logs.sort((a, b) => new Date((sortType === 'des' ? b : a).date).getTime() - new Date((sortType === 'des' ? a : b).date).getTime())
    return filteredLogs
}