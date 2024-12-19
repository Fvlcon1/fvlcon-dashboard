import { IPersonTrackingWithImageType } from "@/app/tracking/components/types";

const groupLogsByDate = (logs?: IPersonTrackingWithImageType[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    const todayLogs: IPersonTrackingWithImageType[] = [];
    const yesterdayLogs: IPersonTrackingWithImageType[] = [];
    const earlierLogs: IPersonTrackingWithImageType[] = [];
  
    logs?.forEach((log) => {
      const logDate = new Date(log.timeSeen);
  
      // Remove time component from date for comparison
      const isSameDate = (date1: Date, date2: Date) =>
        date1.toDateString() === date2.toDateString();
  
      if (isSameDate(logDate, today)) {
        todayLogs.push(log);
      } else if (isSameDate(logDate, yesterday)) {
        yesterdayLogs.push(log);
      } else {
        earlierLogs.push(log);
      }
    })

    return {
        today: todayLogs,
        yesterday: yesterdayLogs,
        earlier: earlierLogs,
    }
}

export default groupLogsByDate