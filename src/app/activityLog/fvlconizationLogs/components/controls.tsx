'use client'

import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { DatePicker, Dropdown, MenuProps, Tooltip } from "antd"
import { useContext, useEffect, useState } from "react"
import { FaCalendarAlt } from "react-icons/fa"
import { FaAngleLeft, FaAngleRight, FaCaretDown } from "react-icons/fa6"
import { clearIcon } from "../../components/antdCustomClearIcon"
import { fvlocnizationLogsContext } from "../context/fvlconizationLogsContext"
import useFvlconizationLogs from "../utils/useFvlconizationLogs"
import Pagination from "../../components/pagination"
import { number } from "zod"
import useTimer from "@/utils/useTimer"

const Controls = () => {
    const [searchValue, setSearchValue] = useState('')
    const [statusValue, setStatusValue] = useState<"Failed" | "Successful">()
    const [startDate, setStartDate] = useState<string | string[]>()
    const [endDate, setEndDate] = useState<string | string[]>()
    const [pageSize, setPageSize] = useState< number>(7)
    const [pageNumber, setPageNumber] = useState<number>(1)

    const { typeValue, setTypeValue} = useContext(fvlocnizationLogsContext)
    const {getFvlconizationLogs, getFvlconizationVideoLogs} = useFvlconizationLogs()

    const statusItems: MenuProps['items'] = [
        {
          label: <Text onClick={()=>setStatusValue("Failed")}>Failed</Text>,
          key: '1',
        },
        {
            label: <Text onClick={()=>setStatusValue("Successful")}>Successful</Text>,
            key: '2',
          }
      ];

      const typeItems: MenuProps['items'] = [
        {
          label: <Text onClick={()=>setTypeValue("image")}>images</Text>,
          key: '0',
        },
        {
          label: <Text onClick={()=>setTypeValue("video")}>videos</Text>,
          key: '1',
        },
      ];

    const runGetFulconization = () => {
        if(typeValue !== 'video'){
            getFvlconizationLogs({
                startDate : startDate ? new Date(startDate as string) : undefined, 
                endDate : endDate ? new Date(endDate as string) : undefined,
                status : statusValue,
                type : typeValue,
                page : pageNumber,
                pageSize
            })
        } else if(typeValue === 'video'){
            getFvlconizationVideoLogs({
                startDate : startDate ? new Date(startDate as string) : undefined, 
                endDate : endDate ? new Date(endDate as string) : undefined,
                status : statusValue,
                type : typeValue,
                page : pageNumber,
                pageSize
            })
        }
    }

    useEffect(()=>{
        runGetFulconization()
    },[startDate, endDate, statusValue, typeValue])

    useEffect(() => {
        if(pageNumber && pageSize){
            const timer = setTimeout(() => {
              runGetFulconization();
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
            <div className="flex items-center gap-2">
            <Pagination 
                pageSize={pageSize}
                setPageSize={setPageSize}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
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
            <Dropdown 
                menu={{
                    items : statusItems,
                }}
            >
                <div className="rounded-md border-[1px] hover:border-bg-alt1 border-bg-quantinary px-2 py-1 flex gap-2 items-center cursor-pointer">
                    <Text>
                        {statusValue ?? 'Status'}
                    </Text>
                    <FaCaretDown 
                        color={theme.colors.text.secondary}
                        className="mt-[-2px]"
                        size={14}
                    />
                </div>
            </Dropdown>
            <Dropdown 
                menu={{
                    items : typeItems,
                }} 
            >
                <div className="rounded-md border-[1px] hover:border-bg-alt1 border-bg-quantinary px-2 py-1 flex gap-2 items-center cursor-pointer">
                    <Text>
                        {typeValue}
                    </Text>
                    <FaCaretDown 
                        color={theme.colors.text.secondary}
                        className="mt-[-2px]"
                        size={14}
                    />
                </div>
            </Dropdown>
        </div>
    )
}
export default Controls