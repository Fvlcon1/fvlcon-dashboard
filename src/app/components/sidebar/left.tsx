'use client'

import { logo } from "@/assets"
import AppTypography from "@styles/components/appTypography"
import Image from "next/image"
import Logo from "../logo/logo"
import Flex from "@styles/components/flex"
import { useState } from "react"
import { MdDashboard } from "react-icons/md"
import theme from "@styles/theme"
import { bottomPagesData, pagesData } from "./data"
import { Tooltip } from 'antd'

const Left = () => {
    const [pages, setPages] = useState(pagesData)
    const [bottomPages, setBottomPages] = useState(bottomPagesData)
    
    const setActive = (index : number) => {
        setPages(prev =>
            prev.map((item, i) => 
              i === index ? { ...item, active: true } : { ...item, active: false }
            )
          );
          
    }
    return (
        <div
            className="flex flex-col w-[70px] h-[100vh] bg-bg-secondary py-6 gap-3 items-center justify-between"
        >
            <Logo />
            <Flex
                direction="column"
                gap={5}
            >
                {
                    pages.map((item, index : number) => (
                        <Tooltip
                            key={index}
                            placement="right"
                            title={item.name}
                        >
                            <div
                                className={`w-full flex relative items-center justify-center cursor-pointer`}
                                onClick={()=>setActive(index)}
                            >
                                <div className={`absolute left-0 w-[4px] h-[25px] rounded-full ${item.active ? 'bg-text-primary' : 'bg-none'} duration-500`}></div>
                                <div
                                    className={`p-3 rounded-md ${item.active ? 'bg-bg-quantinary' : 'bg-none'} duration-500 hover:duration-300 hover:opacity-[0.6] hover:scale-[0.95]`}
                                >
                                    <item.icon
                                        className={`${item.active ? 'opacity-100' : 'opacity-100'}`}
                                        color={item.active ? theme.colors.text.primary : theme.colors.bg.alt2}
                                    />
                                </div>
                            </div> 
                        </Tooltip>
                    ))
                }
            </Flex>
            <Flex
                width="fit-content"
                direction="column"
                gap={0}
            >
                <div className="w-full h-[1px] bg-bg-alt1 rounded-full"></div>
                {
                    bottomPages.map((item, index : number) => (
                        <Tooltip
                            key={index}
                            placement="right"
                            title={item.name}
                        >
                            <div
                                className={`p-3 rounded-md duration-500 hover:duration-300 hover:opacity-[0.6] hover:scale-[0.95] cursor-pointer`}
                            >
                                <item.icon
                                    className={`${item.active ? 'opacity-100' : 'opacity-100'}`}
                                    color={theme.colors.bg.alt2}
                                />
                            </div>
                        </Tooltip>
                    ))
                }
            </Flex>
        </div>
    )
}
export default Left