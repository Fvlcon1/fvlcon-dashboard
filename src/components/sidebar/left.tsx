'use client'

import { logo } from "@/assets"
import AppTypography from "@styles/components/appTypography"
import Image from "next/image"
import Logo from "../logo/logo"
import Flex from "@styles/components/flex"
import { useEffect, useState } from "react"
import { MdDashboard } from "react-icons/md"
import theme from "@styles/theme"
import { bottomPagesData, pagesData } from "./data"
import { Tooltip } from 'antd'
import Link from "next/link"
import { usePathname } from "next/navigation"

const Left = () => {
    const [pages, setPages] = useState(pagesData)
    const [bottomPages, setBottomPages] = useState(bottomPagesData)
    const pathname = usePathname()
    
    useEffect(()=>{
        setPages(prev =>
            prev.map((item, i) => 
              item.url.split('/')[1] === pathname.split('/')[1] ? { ...item, active: true } : { ...item, active: false }
            )
          );
    },[pathname])

    return (
        <div
            className="fixed top-0 left-0 flex flex-col w-[70px] h-[100vh] bg-bg-secondary py-6 gap-3 items-center justify-between"
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
                            <Link
                                href={item.url}
                                className={`w-full flex relative items-center justify-center cursor-pointer`}
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
                            </Link> 
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