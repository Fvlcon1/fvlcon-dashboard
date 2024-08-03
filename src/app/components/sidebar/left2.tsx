'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import { useState } from "react"

const Left2 = () => {
    const [pages, setPages] = useState([
        {
            name : 'Page 1',
            icon : <></>,
            active : true
        },
        {
            name : 'Page 2',
            icon : <></>,
            active : false
        },
        {
            name : 'Page 3',
            icon : <></>,
            active : false
        }
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
            className="flex flex-col w-[120px] h-[100vh] bg-bg-tetiary p-2 py-6 gap-3 items-center"
        >
            {
                pages.map((item, index : number) => (
                    <div 
                        className={`p-1 px-4 ${item.active ? 'bg-bg-quantinary' : 'bg-none'} rounded-full cursor-pointer duration-500`}
                        key={index}
                        onClick={()=>setActive(index)}
                    >
                        <Flex
                            width="fit-content"
                        >
                            {item.icon}
                            <AppTypography
                                textColor={item.active ? theme.colors.text.primary : theme.colors.text.secondary}
                                bold={item.active ? TypographyBold.sm : TypographyBold.sm}
                                className="duration-500"
                            >
                                {item.name}
                            </AppTypography>
                        </Flex>
                    </div>
                ))
            }
        </div>
    )
}
export default Left2