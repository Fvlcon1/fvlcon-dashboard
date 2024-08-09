import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { MdCancel } from "react-icons/md"
import { motion } from "framer-motion"
import Controls from "./controls"

const Window = ({
    open,
    setOpen,
    children,
    title
} : {
    open : boolean
    setOpen : Dispatch<SetStateAction<boolean>>
    children? : ReactNode
    title? : string
}) => {
    return (
        <motion.div
            initial={{
                opacity : 0,
                y : -50
            }}
            animate={{
                opacity : open ? 1 : 0,
                y : 0
            }} 
            exit={{
                opacity : 0,
                y : -50
            }} 
            className="max-w-[1000px] w-[70%] border-solid border-[1px] border-bg-quantinary overflow-x-hidden overflow-y-auto relative h-[600px] bg-bg-secondary rounded-xl"
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