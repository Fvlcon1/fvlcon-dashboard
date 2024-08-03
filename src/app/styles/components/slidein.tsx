'use client'

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const Slidein = ({
    children,
    width,
    direction,
} : {
    children : ReactNode,
    width? : string,
    direction? : 'top' | 'right' | 'bottom' | 'left'
}) => {
    return (
        <motion.div
            className={`${width ?? 'w-fit'}`}
            initial={{ 
                opacity: 0, 
                y : direction === 'top'
                        ? 70
                        : direction === 'bottom'
                        ? -70
                        : 70,
                x : direction === 'left'
                        ? 70
                        : direction === 'right'
                        ? -70
                        : 0
            }}
            whileInView={{ 
                opacity: 1, 
                y : 0,
                x : 0
            }}
            transition={{
                delay : 0,
                type: "spring", 
                stiffness: 200
            }}
        >
            {children}
        </motion.div>
    )
}

export default Slidein