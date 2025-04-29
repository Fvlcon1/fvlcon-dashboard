'use client'

import { useState } from "react"
import FormItem from "./formItem"
import SelectFile from "./select-file"
import Divider from "@components/divider/divider"
import { Radio, Slider, SliderSingleProps } from "antd"
import { CheckboxGroupProps } from "antd/es/checkbox"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import Header from "./header"
import {Priority} from "../../../utils/types"
import FormInput from "./form-input"
import Selectable, { SelectableOption } from "@components/dropdown/selectable"

type Gender = "male" | "female"

const AddWantedVehicle = () => {
    const [name, setName] = useState("")
    const [color, setColor] = useState<string>("black")
    const [priority, setPriority] = useState<Priority>("medium priority")
    const [reason, setReason] = useState("Stolen")

    const handleSectionChange = (color : string) => {
        setColor(color)
    }

    const options: CheckboxGroupProps<string>['options'] = [
        { label: <Text textColor={color === "black" ? theme.colors.text.primary : ""}>Black</Text>, value: 'black' },
        { label: <Text textColor={color === "silver" ? theme.colors.text.primary : ""}>Silver</Text>, value: 'silver' },
        { label: <Text textColor={color === "red" ? theme.colors.text.primary : ""}>Red</Text>, value: 'red' },
        { label: <Text textColor={color === "yellow" ? theme.colors.text.primary : ""}>Yellow</Text>, value: 'yellow' },
        { label: <Text textColor={color === "white" ? theme.colors.text.primary : ""}>White</Text>, value: 'white' },
    ];

    const priorityOptions: CheckboxGroupProps<Priority>['options'] = [
        { label: <Text textColor={priority === "high priority" ? theme.colors.text.primary : ""}>High Priority</Text>, value: 'high priority' },
        { label: <Text textColor={priority === "medium priority" ? theme.colors.text.primary : ""}>Medium Priority</Text>, value: 'medium priority' },
        { label: <Text textColor={priority === "low priority" ? theme.colors.text.primary : ""}>Low Priority</Text>, value: 'low priority' },
    ];

    const menuItems: SelectableOption[] = [
        { key: "1", label: "Stolen", value: "Stolen" },
        { key: "2", label: "Traffic Violation", value: "Traffic Violation" },
        { key: "3", label: "Missing", value: "Missing" },
    ];

    const marks: SliderSingleProps['marks'] = {
        0: '0',
        100: '100',
        200: '200',
      };

    return (
        <>
            <div className="flex flex-col gap-1">
                <Text textColor={theme.colors.text.primary} className="pl-1">
                    Plate Number
                </Text>
                <FormInput
                    content={name}
                    setContent={setName}
                    placeholder="Eg. GX 126-22"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Text textColor={theme.colors.text.primary} className="pl-1">
                    Reason
                </Text>
                <Selectable
                    options={menuItems}
                    value={reason}
                    onChange={value => setReason(value)}
                    innerClassName="!bg-bg-tetiary !h-[35px] border-[1px] border-bg-quantinary"
                />
            </div>

            <div className="flex items-center gap-8 justify-between w-full">
                <Radio.Group
                    options={priorityOptions}
                    onChange={(e)=>setPriority(e.target.value)}
                    defaultValue="medium priority"
                    optionType="button"
                    buttonStyle="solid"
                    className="[&_.ant-radio-button-wrapper-checked]:!bg-main-primary"
                />
                <Radio.Group
                    options={options}
                    onChange={(e)=>handleSectionChange(e.target.value)}
                    defaultValue="black"
                    buttonStyle="solid"
                    className="[&_.ant-radio-button-wrapper-checked]:!bg-main-primary"
                />
            </div>
        </>
    )
}
export default AddWantedVehicle