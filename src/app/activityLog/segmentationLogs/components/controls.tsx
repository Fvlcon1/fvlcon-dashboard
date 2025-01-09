'use client'

import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { DatePicker, Dropdown, MenuProps } from "antd"
import { useEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa6"
import { clearIcon } from "../../components/antdCustomClearIcon"
import { FaCalendarAlt } from "react-icons/fa"
import useSegmentationLogs from "../utils/useSegmentationLogs"

const Controls = () => {
    const [searchValue, setSearchValue] = useState('')
    const [statusValue, setStatusValue] = useState<"Status" | "Failed" | "Successful">('Status')
    const [typeValue, setTypeValue] = useState<"images" | "videos">('images')
    const [startDate, setStartDate] = useState<string | string[]>()
    const [endDate, setEndDate] = useState<string | string[]>()

    const {getSegmentationLogs} = useSegmentationLogs()

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

    useEffect(()=>{
        getSegmentationLogs({
            startDate : startDate ? new Date(startDate as string) : undefined, 
            endDate : endDate ? new Date(endDate as string) : undefined,
            status : statusValue,
            type : typeValue
        })
    },[startDate, endDate, statusValue, typeValue])

    return (
        <div className="gap-2 flex">
            {/* <Searchbar 
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            /> */}
            <div className="flex items-center gap-2">
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
            <Dropdown 
                menu={{
                    items : statusItems,
                }} 
            >
                <div className="rounded-md border-[1px] hover:border-bg-alt1 border-bg-secondary px-2 py-1 flex gap-2 items-center cursor-pointer">
                    <Text>
                        {statusValue}
                    </Text>
                    <FaCaretDown 
                        color={theme.colors.text.secondary}
                        className="mt-[-2px]"
                    />
                </div>
            </Dropdown>
            <Dropdown 
                menu={{
                    items : typeItems,
                }} 
            >
                <div className="rounded-md border-[1px] hover:border-bg-alt1 border-bg-secondary px-2 py-1 flex gap-2 items-center cursor-pointer">
                    <Text>
                        {typeValue}
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