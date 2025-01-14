import { useEffect } from "react";
import { FvlconizationLogsTypes } from "../components/history.types";
import useFvlconizationLogs from "./useFvlconizationLogs";

const useGroupsLogsByDate = () => {
  const {fvlconizationLogs, getFvlconizationLogs} = useFvlconizationLogs()
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const logs = fvlconizationLogs.data

  const todayLogs: FvlconizationLogsTypes[] = [];
  const yesterdayLogs: FvlconizationLogsTypes[] = [];
  const earlierLogs: FvlconizationLogsTypes[] = [];

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
      fvlconizationLogs
  }
}

export default useGroupsLogsByDate