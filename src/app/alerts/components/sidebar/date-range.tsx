'use client'

import { BiSolidCategory } from "react-icons/bi"
import Container from "../container"
import Title from "../title"
import { useState } from "react"
import { Checkbox, DatePicker, Switch } from "antd"
import Text from "@styles/components/text"
import Divider from "@components/divider/divider"
import { MdDateRange } from "react-icons/md"
import Button from "@components/button/button"

const DateRange = () => {
    const [startDate, setStartDate] = useState<string | string[]>();
    const [endDate, setEndDate] = useState<string | string[]>();

    return (
        <Container>
            <Title
                text="Date Range"
                Icon={MdDateRange}
            />
            <div className="flex flex-col gap-2 w-full pr-3">
                <div className="flex flex-col gap-1">
                    <Text>
                        From
                    </Text>
                    <DatePicker
                        allowClear
                        placeholder="DD/MM/YY"
                        onChange={(_, dateToString) => setStartDate(dateToString)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Text>
                        To
                    </Text>
                    <DatePicker
                        allowClear
                        placeholder="DD/MM/YY"
                        onChange={(_, dateToString) => setEndDate(dateToString)}
                    />
                </div>
                <Button 
                    text="Apply"
                    className="!bg-main-primary !w-full"
                />
            </div>
        </Container>
    )
}
export default DateRange