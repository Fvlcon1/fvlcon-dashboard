import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { MdCancel } from "react-icons/md"
import { motion } from "framer-motion"
import Controls from "./controls"
import { IPosition } from "@/utils/@types"

const Window = ({
    open,
    setOpen,
    children,
    title,
    className,
    direction
} : {
    open : boolean
    setOpen : Dispatch<SetStateAction<boolean>>
    children? : ReactNode
    title? : string
    className? : string
    direction? : IPosition
}) => {
    return (
        <motion.div
            initial={{ 
            opacity: 0, 
            y : direction === 'top'
                    ? 20
                    : direction === 'bottom'
                    ? -20
                    : 20,
            x : direction === 'left'
                    ? 20
                    : direction === 'right'
                    ? -20
                    : 0
        }}
            animate={{
                opacity : open ? 1 : 0,
                y : 0
            }} 
            exit={{
                opacity : 0,
                y : -50
            }} 
            className={`max-w-[1000px] w-[70%] shadow-custom-shadow border-solid border-[1px] border-bg-quantinary overflow-x-hidden overflow-y-auto relative h-[600px] bg-bg-secondary rounded-xl ${className}`}
        >
            <Controls 
                open={open}
                setOpen={setOpen}
                title={title}
            />
            {children}
        </motion.div>
    )
}
export default Window