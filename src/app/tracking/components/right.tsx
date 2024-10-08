'use client'

import Text from "@styles/components/text"
import RightControls from "./rightControls"
import { IoImage } from "react-icons/io5"
import theme from "@styles/theme"
import { useState } from "react"
import DndImage from "./dndImage"
import PersonResultContainer from "./PersonResultContainer"
import Divider from "@components/divider/divider"
import { personTrackingData } from "./data"

const Right = () => {
    return (
        <div className="w-[350px] p-3 flex h-full bg-gradient-container rounded-lg flex-col gap-2">
            <RightControls />
            {/* <DndImage /> */}
            <div className="flex flex-col w-full overflow-y-auto">
                {
                    personTrackingData.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-[95%] duration-200 gap-3 pt-3 hover:bg-bg-secondary cursor-pointer"
                        >
                            <PersonResultContainer 
                                {...item}
                            />
                            <Divider className="!w-full" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Right