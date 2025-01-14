'use client'

import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { DatePicker, Dropdown, MenuProps } from "antd"
import { ReactNode, useEffect, useState } from "react"
import { FaCalendarAlt } from "react-icons/fa"
import { FaCaretDown } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi";
import { MdCancel } from "react-icons/md"
import { clearIcon } from "../../components/antdCustomClearIcon"
import useTrackingLogs from "../utils/useTrackingLogs"
import Pagination from "../../components/pagination"

const Controls = () => {
    const [searchValue, setSearchValue] = useState('')
    const [startDate, setStartDate] = useState<string | string[]>()
    const [endDate, setEndDate] = useState<string | string[]>()
    const [pageSize, setPageSize] = useState< number>(7)
    const [pageNumber, setPageNumber] = useState<number>(1)

    const {getTrackingLogs} = useTrackingLogs()

    const runGetTracking = () => {
        getTrackingLogs({
            startDate : startDate ? new Date(startDate as string) : undefined, 
            endDate : endDate ? new Date(endDate as string) : undefined,
            page : pageNumber,
            pageSize : pageSize
        })
    }

    useEffect(()=>{
        runGetTracking()
    },[startDate, endDate])

    useEffect(() => {
        if(pageSize && pageNumber){
            const timer = setTimeout(() => {
                runGetTracking();
            }, 1000);
    
            return () => clearTimeout(timer);
        }
    }, [pageNumber, pageSize]);

    return (
        <div className="gap-2 flex">
            {/* <Searchbar 
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            /> */}
            <Pagination 
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
            <div className="flex items-center gap-2">
                <DatePicker
                    allowClear={clearIcon}
                    placeholder="Start date"
                    onChange={(date, dateToString)=>setStartDate(dateToString)}
                    suffixIcon={<FaCalendarAlt color={theme.colors.text.secondary}/>}
                />
                <Text>
                    To
                </Text>
                <DatePicker
                    allowClear={clearIcon}
                    placeholder="End date"
                    onChange={(date, dateToString)=>setEndDate(dateToString)}
                    suffixIcon={<FaCalendarAlt color={theme.colors.text.secondary} />}
                />
            </div>
        </div>
    )
}
export default Controls