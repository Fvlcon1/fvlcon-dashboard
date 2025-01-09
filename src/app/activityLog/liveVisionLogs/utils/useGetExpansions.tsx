import { useEffect, useState } from "react";
import useLiveVisionData from "./useLiveVisionData";
import useGroupsLogsByDate from "./useGroupsLogsByDate";

const useGetExpansions = () => {
    const { newPersonTrackingData } = useLiveVisionData();
    const { today, yesterday, earlier } = useGroupsLogsByDate(newPersonTrackingData.data);

    const [expandToday, setExpandToday] = useState(false);
    const [expandYesterday, setExpandYesterday] = useState(false);
    const [expandEarlier, setExpandEarlier] = useState(false);

    useEffect(() => {
        const shouldExpandToday = today.length > 0 || (!yesterday.length && !earlier.length);
        const shouldExpandYesterday = !shouldExpandToday && yesterday.length > 0;
        const shouldExpandEarlier = !shouldExpandToday && !shouldExpandYesterday;

        setExpandToday(shouldExpandToday);
        setExpandYesterday(shouldExpandYesterday);
        setExpandEarlier(shouldExpandEarlier);
    }, [today, yesterday, earlier]);

    return {
        expandToday,
        setExpandToday,
        expandYesterday,
        setExpandYesterday,
        expandEarlier,
        setExpandEarlier,
    };
};

export default useGetExpansions;