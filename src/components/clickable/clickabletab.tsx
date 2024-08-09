'use client'

import { baseProps } from "@/utils/@types"
import { useState } from "react"

const ClickableTab = ({
    children,
    className,
    onClick
} : baseProps) => {

    const [onHover, setOnHover] = useState<boolean>(false)
    const [onPress, setOnPress] = useState<boolean>(false)

    return (
        <div 
            className={`flex p-[7px] px-[10px] h-fit rounded-lg hover:opacity-[0.9] duration-200 hover:bg-bg-tetiary ${onPress ? 'scale-[0.95]' : 'scale-1'} cursor-pointer ${className}`}
            onClick={onClick}
            onMouseOver={()=>setOnHover(true)}
            onMouseLeave={()=>setOnHover(false)}
            onMouseDown={()=>setOnPress(true)}
            onMouseUp={()=>setOnPress(false)}
        >
            {children}
        </div>
    )
}
export default ClickableTab