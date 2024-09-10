'use client'

import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Fragment, useContext } from "react"
import { VscKebabVertical } from "react-icons/vsc"
import {useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Dropdown from "@components/dropdown/dropdown"
import { ClickAwayListener } from "@mui/base"
import Popover from "@components/popover/popover"
import { liveContext } from "@/context/live"
import { menuItemsTypes } from "@/utils/@types"
import MenuItems from "@components/popover/menuItems"
import { IoIosAddCircle } from "react-icons/io"
import { TiDelete } from "react-icons/ti"
import { MdDelete } from "react-icons/md"

const Cameras = () => {
    const [dropdownValue, setDropdownValue] = useState('add +')
    const {activeCameras, setActiveCameras} = useContext(liveContext)
    const [cameras, setCameras] = useState([
        {
            name : "Accra City Camera 01",
            description : "Accra City",
            hover : false,
            activeMenu : false
        },
        {
            name : "Accra City Camera 01",
            description : "Accra City",
            hover : false,
            activeMenu : false
        },
        {
            name : "Accra City Camera 01",
            description : "Accra City",
            hover : false,
            activeMenu : false
        },
    ])

    const setHover = (index : number, state? : boolean) => {
        setCameras(prev => prev.map((item, i) => ({
            ...item, 
            hover : i === index 
            ? state ?? true : state ? !state : false
        })))
    }

    const setActiveMenu = (index : number, state? : boolean) => {
        setCameras(prev => prev.map((item, i) => ({
            ...item, 
            activeMenu : i === index 
            ? state ?? true : state ? !state : false
        })))
    }

    const cameraMenuItems : menuItemsTypes[] = [
        {
            name : 'Add +',
            onClick : ()=>addCamera(),
            closeOnClick : true,
            icon : <IoIosAddCircle color={theme.colors.text.secondary} size={14}/>
        },
        {
            name : 'Delete',
            onClick : ()=>{},
            closeOnClick : true,
            icon : <MdDelete color={theme.colors.text.secondary} />
        },
    ]

    const addCamera = () => {
        setActiveCameras(prev => [...prev, 1])   
    }

    return (
        <Flex
            direction="column"
            padding="8px"
        >
            {
                cameras.map((item, index:number) => (
                    <Fragment
                        key={index}
                    >
                        <div
                            onMouseOver={()=>setHover(index)}
                            onMouseLeave={()=>setHover(index, false)}
                            className="relative"
                        >
                            <Popover
                                show={item.activeMenu}
                                close={()=>setActiveMenu(index, false)}
                                content={
                                    <MenuItems 
                                        items={cameraMenuItems}
                                    />
                                }
                            >
                                <Flex
                                    className="duration-300 hover:scale-95 cursor-pointer"
                                >
                                    <Flex
                                        direction="column"
                                        gap={0}
                                    >
                                        <AppTypography
                                            textColor={theme.colors.text.secondary}
                                        >
                                            Accra City Camera 01
                                        </AppTypography>
                                        <AppTypography
                                            size={TypographySize.xs}
                                            textColor={theme.colors.text.tetiary}
                                        >
                                            Accra City
                                        </AppTypography>
                                    </Flex>
                                    {
                                        (item.hover || item.activeMenu) &&
                                        <AnimatePresence
                                        >
                                            <ClickableTab
                                                onClick={()=>setActiveMenu(index)}
                                            >
                                                <VscKebabVertical 
                                                    color={theme.colors.text.primary}
                                                />
                                            </ClickableTab>
                                        </AnimatePresence>
                                    }
                                </Flex>
                            </Popover>
                        </div>
                        {
                            index < 2 &&
                            <div className="w-full h-[1px] bg-bg-quantinary"></div>
                        }
                    </Fragment>
                ))
            }
        </Flex>
    )
}

export default Cameras