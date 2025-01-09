import { trackingLogsType } from "../components/trackingLogs.types";

const useGroupLogsByDate = (logs?: trackingLogsType[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    console.log({groupLogs : logs})
  
    const todayLogs: trackingLogsType[] = [];
    const yesterdayLogs: trackingLogsType[] = [];
    const earlierLogs: trackingLogsType[] = [];
  
    logs?.forEach((log) => {
      const logDate = new Date(log.date);
  
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

    console.log({
      today: todayLogs,
        yesterday: yesterdayLogs,
        earlier: earlierLogs,
    })
    return {
        today: todayLogs,
        yesterday: yesterdayLogs,
        earlier: earlierLogs,
    }
}

export default useGroupLogsByDate