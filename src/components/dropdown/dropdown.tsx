"use client";

import { useState, useRef, ReactNode } from "react";
import { useClickAway } from "react-use";
import Text from "@styles/components/text";
import Link from "next/link";
import { DropdownItem } from "@/utils/@types";
import { AnimatePresence, motion } from 'framer-motion';

const Dropdown = (
    { 
        children,
        menuItems,
        className,
        display,
        outterContainerClassName,
        component,
        onClick
    }: { 
        children?: ReactNode;
        menuItems?: DropdownItem[];
        className?: string;
        display?: boolean;
        outterContainerClassName? : string
        component? : ReactNode
        onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    }
) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useClickAway(menuRef, () => {
        if (display === undefined) setIsOpen(false);
    });

    return (
        <div className={`relative inline-block ${outterContainerClassName}`} ref={menuRef}>

            {/* Toggle Button */}
            <div
                onClick={(e) => {
                    if (display === undefined) setIsOpen((prev) => !prev);
                    onClick && onClick(e)
                }}
                className="w-full h-full"
            >
                {children}
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {(display ?? isOpen) && (
                    <motion.div
                        initial={{ opacity: 0, y : -10 }}
                        animate={{ opacity: 1, y : 0 }}
                        exit={{ opacity: 0, y : -10 }}
                        className={`absolute overflow-y-auto top-[110%] right-0 min-w-[150px] max-h-[300px] w-full bg-bg-secondary border border-bg-quantinary rounded-lg shadow-lg shadow-[#ffffff08] z-50 py-1 ${className}`}
                    >
                        {
                            menuItems &&
                            <div className="flex flex-col">
                                {menuItems.map((item) =>
                                    item.type === "divider" ? (
                                        <div key={item.key} className="border-t border-bg-quantinary my-1" />
                                    ) 
                                    : item.type === "loading" ? (
                                        <div key={item.key} className="pl-2 h-5 overflow-hidden"><div className="normal-loader !w-5" /></div>
                                    )
                                    : (
                                        <div
                                            key={item.key}
                                            className={` ${item.type === "title" ? "px-3" : "px-1"} gap-2 ${
                                                item.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                                            }`}
                                            onClick={() => {
                                                if (!item.disabled) {
                                                    if (display === undefined) setIsOpen(false); // Close only if display is not externally controlled
                                                }
                                                if (item.onClick) item.onClick();
                                            }}
                                        >
                                            {item.type === "link" ? (
                                                <Link href={item.href ?? "#"}>
                                                    <div
                                                        className={`${
                                                            !item.disabled ? "hover:bg-bg-quantinary px-2 py-[3px] rounded-md flex gap-[6px] items-center" : "flex"
                                                        }`}
                                                    >
                                                        {item.icon && <span>{item.icon}</span>}
                                                        {typeof item.label === "string" ? <Text whiteSpace="nowrap" ellipsis className="!overflow-hidden !w-[100px]">{item.label}</Text> : item.label}
                                                    </div>
                                                </Link>
                                            ) 
                                            : typeof item.label === "string" ? 
                                                (
                                                    <div
                                                        className={`${
                                                            !item.disabled ? "hover:bg-bg-quantinary px-2 py-[3px] rounded-md flex gap-[6px] items-center" : "flex"
                                                        }`}
                                                    >
                                                        {item.icon && <span>{item.icon}</span>}
                                                        {<Text ellipsis>{item.label}</Text>}
                                                    </div>
                                                )
                                            : (
                                                <div
                                                    className={`${
                                                        !item.disabled ? "hover:bg-bg-quantinary rounded-md flex gap-[6px] items-center" : "flex"
                                                    }`}
                                                >
                                                    {item.icon && <span>{item.icon}</span>}
                                                    {item.label}
                                                </div>
                                            )
                                            }
                                        </div>
                                    )
                                )}
                            </div>
                        }
                        { component }
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;
