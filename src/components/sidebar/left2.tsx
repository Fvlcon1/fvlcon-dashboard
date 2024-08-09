'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useState } from "react"
import { RiHome6Fill } from "react-icons/ri"
import { TbHistoryToggle } from "react-icons/tb"

const Left2 = () => {
    const [pages, setPages] = useState([
        {
            name : 'Home',
            icon : RiHome6Fill,
            active : true
        },
        {
            name : 'History',
            icon : TbHistoryToggle,
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
            className="fixed top-0 left-[70px] flex flex-col w-[120px] h-[100vh] bg-bg-tetiary p-2 py-6 gap-3 items-center"
        >
            {
                pages.map((item, index : number) => (
                    <div 
                        className={`p-2 px-4 ${item.active ? 'bg-bg-quantinary' : 'bg-none'} rounded-full cursor-pointer duration-500 hover:duration-300 hover:opacity-[0.6] hover:scale-[0.95]`}
                        key={index}
                        onClick={()=>setActive(index)}
                    >
                        <Flex
                            width="fit-content"
                            gap={4}
                        >
                            <item.icon 
                                color={item.active ? theme.colors.text.primary : theme.colors.text.secondary}
                            />
                            <AppTypography
                                textColor={item.active ? theme.colors.text.primary : theme.colors.text.secondary}
                                bold={item.active ? TypographyBold.sm : TypographyBold.sm}
                                className="duration-500"
                                size={TypographySize.body}
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