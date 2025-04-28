'use client'

import { BiSolidCategory } from "react-icons/bi"
import Container from "../container"
import Title from "../title"
import { useState } from "react"
import { Checkbox, Switch } from "antd"
import Text from "@styles/components/text"
import Divider from "@components/divider/divider"

const Filter = () => {
    const [filterOptions, setFilterOptions] = useState([
        {
            title : "High Priority",
            isOn : false
        },
        {
            title : "Medium Priority",
            isOn : true
        },
        {
            title : "Low Priority",
            isOn : true
        },
    ])

    const handleFilterChange = (index : number, state : boolean) => {
        setFilterOptions(prev => {
            const newArr = prev
            newArr[index].isOn = state
            return newArr
        })
    }

    return (
        <Container>
            <Title
                text="Filter"
                Icon={BiSolidCategory}
            />
            <div className="flex flex-col gap-2 w-full">
                {
                    filterOptions.map((item, index) => (
                        <div 
                            className="flex flex-col gap-2"
                            key={index}
                        >
                            <div className="flex gap-2 items-center">
                                <Checkbox
                                    onChange={state => handleFilterChange(index, state.target.value)}
                                    defaultChecked={item.isOn}
                                />
                                <Text>
                                    {item.title}
                                </Text>
                            </div>
                            {
                                index !== filterOptions.length -1 &&
                                <div className="w-full pl-[30px]">
                                    <Divider />
                                </div>
                            }
                        </div>
                    ))
                }
            </div>
        </Container>
    )
}
export default Filter