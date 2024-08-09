import { ReactNode } from "react";
import { AnimatePresence, motion } from 'framer-motion';

const Overlay = ({
    children,
    onClick
}: {
    children?: ReactNode;
    onClick?: () => void;
}) => {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{ 
                opacity: 0
            }}
            className="fixed flex justify-center items-center top-0 left-0 z-[100] w-full h-full bg-[#00000000] backdrop-filter backdrop-blur-lg"
        >
            <div className="fixed flex top-0 left-0 z-[-1] w-full h-full"
                onClick={onClick}
            >
            
            </div>
            {children}
        </motion.div>
    );
};

export default Overlay;
