import { ClickAwayListener } from "@mui/base"
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from "react";

const Popover = ({
    show,
    setShow,
    children
} : {
    show : boolean
    setShow : ()=>void
    children? : ReactNode
}) => {
    return (
        <AnimatePresence>
            {
                show &&
                <ClickAwayListener onClickAway={setShow}>
                    <motion.div 
                        className="bg-bg-tetiary border-solid border-[1px] border-bg-quantinary absolute right-[-80px] z-10 top-0 rounded-lg"
                        initial={{
                            opacity : 0
                        }}
                        animate={{
                            opacity : 1
                        }}
                    >
                        {children}
                    </motion.div>
                </ClickAwayListener>
            }
        </AnimatePresence>
    )
}
export default Popover