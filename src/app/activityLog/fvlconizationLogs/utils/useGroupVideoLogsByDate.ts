import { FvlconizationVideoLogsType } from "../components/fvlconizationLogs.types";

const useGroupVideoLogsByDate = (logs?: FvlconizationVideoLogsType[]) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    const todayLogs: FvlconizationVideoLogsType[] = [];
    const yesterdayLogs: FvlconizationVideoLogsType[] = [];
    const earlierLogs: FvlconizationVideoLogsType[] = [];
  
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

    return {
        today: todayLogs,
        yesterday: yesterdayLogs,
        earlier: earlierLogs,
    }
}

export default useGroupVideoLogsByDate