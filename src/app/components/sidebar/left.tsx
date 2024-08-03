'use client'

import { logo } from "@/assets"
import AppTypography from "@styles/components/appTypography"
import Image from "next/image"
import Logo from "../logo/logo"
import Flex from "@styles/components/flex"
import { useState } from "react"
import { MdDashboard } from "react-icons/md"

const Left = () => {
    const [pages, setPages] = useState([
        {
            name : 'Dashboard',
            icon : MdDashboard,
            active : true
        },
        {
            name : 'Dashboard',
            icon : MdDashboard,
            active : false
        },
        {
            name : 'Dashboard',
            icon : MdDashboard,
            active : false
        },
        {
            name : 'Dashboard',
            icon : MdDashboard,
            active : false
        },
    ])
    
    const setActive = (index : number) => {
        setPages(prev =>
            prev.map((item, i) => 
              i === index ? { ...item, active: true } : { ...item, active: false }
            )
          );
          
    }
    return (
        <div
            className="flex flex-col w-[70px] h-[100vh] bg-bg-secondary p-2 py-6 gap-3 items-center justify-between"
        >
            <Logo />
            <Flex
                width="fit-content"
                direction="column"
            >
                {
                    pages.map((item, index : number) => (
                        <item.icon 
                            key={index}
                            className={`${item.active ? 'opacity-100' : 'opacity-100'}`}
                            onClick={()=>setActive(index)}
                        />
                    ))
                }
            </Flex>
            <Flex
                width="fit-content"
                direction="column"
            >
                <div className="w-full h-[1px] bg-bg-quantinary rounded-full"></div>
                <Logo />
            </Flex>
        </div>
    )
}
export default Left