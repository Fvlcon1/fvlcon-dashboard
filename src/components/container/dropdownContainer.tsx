import { baseProps } from "@/utils/@types"
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from "react";

interface dropdownProps extends baseProps {
    show : boolean,
    setShow : Dispatch<SetStateAction<boolean>>
}

const DropdownContainer = ({
    children,
    className,
    onClick,
    show
} : dropdownProps) => {
    return (
        <AnimatePresence>
            {
                show &&
                <motion.div
                    className={`flex p-[5px] flex-1 rounded-[10px] bg-white border-[1px] border-solid border-theme-colors-main-borderColorLight shadow-lg shadow-theme-colors-main-shadowLight ${className}`}
                    initial={{
                        opacity : 0,
                        y : -4,
                    }}
                    animate={{
                        opacity : 1,
                        y : 1,
                        transition: { duration: 0.2 },
                    }}
                    exit={{
                        opacity: 0,
                        y : -4,
                        transition: { duration: 0.2 },
                    }}
                    onClick={onClick}
                >
                    {children}
                </motion.div>
            }
        </AnimatePresence>
    )
}
export default DropdownContainer