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

type Gender = "male" | "female"

const AddWantedPeople = () => {
    const [name, setName] = useState("")
    const [gender, setGender] = useState<Gender>("male")
    const [priority, setPriority] = useState<Priority>("medium priority")

    const handleSectionChange = (section : Gender) => {
        setGender(section)
    }

    const options: CheckboxGroupProps<Gender>['options'] = [
        { label: <Text textColor={gender === "male" ? theme.colors.text.primary : ""}>Male</Text>, value: 'male' },
        { label: <Text textColor={gender === "female" ? theme.colors.text.primary : ""}>Female</Text>, value: 'female' },
    ];

    const priorityOptions: CheckboxGroupProps<Priority>['options'] = [
        { label: <Text textColor={priority === "high priority" ? theme.colors.text.primary : ""}>High Priority</Text>, value: 'high priority' },
        { label: <Text textColor={priority === "medium priority" ? theme.colors.text.primary : ""}>Medium Priority</Text>, value: 'medium priority' },
        { label: <Text textColor={priority === "low priority" ? theme.colors.text.primary : ""}>Low Priority</Text>, value: 'low priority' },
    ];

    const marks: SliderSingleProps['marks'] = {
        0: '0',
        100: '100',
        200: '200',
      };

    return (
        <>
            <SelectFile />
            <div className="flex flex-col gap-1">
                <Text textColor={theme.colors.text.primary} className="pl-1">
                    Name
                </Text>
                <FormInput
                    content={name}
                    setContent={setName}
                    placeholder="Eg. John Doe"
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
                    defaultValue="male"
                    buttonStyle="solid"
                    className="[&_.ant-radio-button-wrapper-checked]:!bg-main-primary"
                />
            </div>
            <div className="flex flex-col gap-1 px-1">
                <Text textColor={theme.colors.text.primary}>
                    Age Range
                </Text>
                <Slider 
                    className="flex flex-1" 
                    range 
                    defaultValue={[0, 100]}
                    marks={marks}
                />
            </div>
        </>
    )
}
export default AddWantedPeople