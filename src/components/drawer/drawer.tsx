import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { motion } from 'framer-motion';
import Link from "next/link";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import theme, { colors } from "@styles/theme";

const Drawer = ({
    showdrawer,
    setShowdrawer,
    children,
    head
} : {
    showdrawer : boolean,
    setShowdrawer : Dispatch<SetStateAction<boolean>>,
    children? : ReactNode,
    head? : ReactNode
}) => {

    return (
        <motion.div
            initial = {{
                x : showdrawer ? 0 : 100,
                opacity : showdrawer ? 1 : 0,
            }}
            animate = {{
                x : showdrawer ? 0 : '100%',
                opacity : showdrawer ? 1 : 0,
            }}
            className="fixed top-0 left-0 z-10 w-[140vw] h-[120vh] bg-white overflow-y-scroll"
        >
            <div
                className="py-0 px-[20px] flex justify-between items-center w-[100vw] my-[10px] "
            >
                {
                    head ?
                    head
                    :
                    <Link
                        href={'/'}
                    >
                        <div className="flex bg-colors-dark-9 relative justify-center items-center w-[25px] h-[25px] rounded-[5px] overflow-hidden">
                            <Image
                                src={require('@/app/favicon.ico')}
                                alt={'default image'}
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                    </Link>
                }
                <IoCloseSharp
                    color={theme.colors.text.secondary}
                    size={30}
                    onClick={()=>setShowdrawer(prev => !prev)}
                />
            </div>
            <div className="Children w-[100vw]">
                {children}
            </div>
        </motion.div>
    )
}

export default Drawer