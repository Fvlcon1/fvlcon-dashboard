'use client'

import { BiSolidCategory } from "react-icons/bi"
import Container from "../container"
import Title from "../title"
import { useState } from "react"
import { Switch } from "antd"
import Text from "@styles/components/text"
import Divider from "@components/divider/divider"

const AlertCategories = () => {
    const [alertCategoryItems, setAlertCategoryItems] = useState([
        {
            title : "All Alerts",
            isOn : false
        },
        {
            title : "Wanted People",
            isOn : true
        },
        {
            title : "Wanted Vehicles",
            isOn : true
        },
        {
            title : "Suspicious Activities",
            isOn : false
        },
    ])

    const handleToggleCategory = (index : number, state : boolean) => {
        setAlertCategoryItems(prev => {
            const newArr = prev
            newArr[index].isOn = state
            return newArr
        })
    }

    return (
        <Container>
            <Title
                text="Alert Categories"
                Icon={BiSolidCategory}
            />
            <div className="flex flex-col gap-2 w-full">
                {
                    alertCategoryItems.map((item, index) => (
                        <div 
                            className="flex flex-col gap-2"
                            key={index}
                        >
                            <div className="flex gap-2 items-center">
                                <Switch
                                    onChange={state => handleToggleCategory(index, state)}
                                    defaultChecked={item.isOn}
                                    size="small"
                                    className="custom-switch"
                                />
                                <Text>
                                    {item.title}
                                </Text>
                            </div>
                            {
                                index !== alertCategoryItems.length -1 &&
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
export default AlertCategories