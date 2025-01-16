'use client'

import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { DatePicker, Dropdown, MenuProps } from "antd"
import { useEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa6"
import useLiveVisionData from "../utils/useLiveVisionData"
import Pagination from "../../components/pagination"

const Controls = () => {
    const [searchValue, setSearchValue] = useState('')
    const [statusValue, setStatusValue] = useState<"Status" | "Failed" | "Successful">('Status')
    const [typeValue, setTypeValue] = useState<"images" | "videos">('images')
    const [startDate, setStartDate] = useState<string | string[]>()
    const [endDate, setEndDate] = useState<string | string[]>()
    const [pageSize, setPageSize] = useState< number>(7)
    const [pageNumber, setPageNumber] = useState<number>(1)

    const {getLiveVisionHistory} = useLiveVisionData()

    const statusItems: MenuProps['items'] = [
        {
          label: <Text onClick={()=>setStatusValue("Status")}>Status</Text>,
          key: '0',
        },
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
          label: <Text onClick={()=>setTypeValue("images")}>images</Text>,
          key: '0',
        },
        {
          label: <Text onClick={()=>setTypeValue("videos")}>videos</Text>,
          key: '1',
        },
    ];

    const runGetLiveVisionLogs = () => {
        getLiveVisionHistory({
            startDate : startDate ? new Date(startDate as string) : undefined, 
            endDate : endDate ? new Date(endDate as string) : undefined,
            page : pageNumber,
            pageSize : pageSize
        })
    }

    useEffect(()=>{
        runGetLiveVisionLogs()
    },[startDate, endDate])

    useEffect(() => {
        if(pageSize && pageNumber){
            const timer = setTimeout(() => {
                runGetLiveVisionLogs();
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
                    allowClear
                    placeholder="Start date"
                    onChange={(date, dateToString)=>setStartDate(dateToString)}
                />
                <Text>
                    To
                </Text>
                <DatePicker
                    allowClear
                    placeholder="End date"
                    onChange={(date, dateToString)=>setEndDate(dateToString)}
                />
            </div>
            <Dropdown 
                menu={{
                    items : statusItems,
                }} 
            >
                <div className="rounded-md border-[1px] hover:border-bg-alt1 border-bg-quantinary px-2 py-1 flex gap-2 items-center cursor-pointer">
                    <Text>
                        {statusValue}
                    </Text>
                    <FaCaretDown 
                        color={theme.colors.text.secondary}
                        className="mt-[-2px]"
                    />
                </div>
            </Dropdown>
        </div>
    )
}
export default Controls