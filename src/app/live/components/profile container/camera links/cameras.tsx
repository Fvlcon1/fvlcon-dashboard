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
import { FaFolderClosed } from "react-icons/fa6";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaCaretRight } from "react-icons/fa";
import { GrStatusGoodSmall } from "react-icons/gr";
import { HiVideoCamera } from "react-icons/hi";

const Cameras = () => {
    const [dropdownValue, setDropdownValue] = useState('add +')
    const {activeCameras, setActiveCameras} = useContext(liveContext)
    type cameraFolderType = {
        type : 'folder'
        folderName : string
        cameras : cameraType[]
        open? : boolean
        hover : boolean,
    }
    type cameraType = {
        type : 'camera'
        name : string,
        description? : string,
        hover : boolean,
        activeMenu : boolean,
        active : boolean
    }
    type FolderOrCamera = cameraFolderType | cameraType;
    const [folders, setFolders] = useState<FolderOrCamera[]>([
        {
            type : 'folder',
            folderName : "Local",
            hover : false,
            cameras : [
                {
                    type : 'camera',
                    name : "Testing cam",
                    hover : false,
                    activeMenu : false,
                    active : false
                },
                {
                    type : 'camera',
                    name : "Seatle",
                    hover : false,
                    activeMenu : false,
                    active : true
                },
            ]
        },
        {
            type : 'folder',
            folderName : "hosted",
            hover : false,
            cameras : [
                {
                    type : 'camera',
                    name : "London",
                    hover : false,
                    activeMenu : false,
                    active : true
                },
                {
                    type : 'camera',
                    name : "Disney park cam",
                    hover : false,
                    activeMenu : false,
                    active : false
                },
            ]
        },
        {
            type : 'camera',
            name : "home camera",
            hover : false,
            activeMenu : false,
            active : false
        },
    ])

    const setFolderVisibility = (index : number, state? : boolean) => {
        setFolders(prev => prev.map((item, i) => (
            item.type === 'folder' ?
            {
                ...item, 
                open : i === index 
                    ? state !== undefined 
                    ? state 
                    : item.open !== undefined 
                    ? !item.open 
                    : true : item.open
            }
            : item
        )))
    }

    const setHover = (index : number, state? : boolean) => {
        // setCameras(prev => prev.map((item, i) => ({
        //     ...item, 
        //     hover : i === index 
        //     ? state ?? true : state ? !state : false
        // })))
    }

    const setActiveMenu = (index : number, state? : boolean) => {
        // setCameras(prev => prev.map((item, i) => ({
        //     ...item, 
        //     activeMenu : i === index 
        //     ? state ?? true : state ? !state : false
        // })))
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
            gap={4}
        >
            {
                folders.map((item, index : number) => (
                    <Fragment
                        key={index}
                    >
                        {
                            item.type === 'folder' &&
                            <div className="flex flex-col gap-1 overflow-y-hidden">
                                <div className="flex duration-300 w-full hover:scale-[0.97] cursor-pointer justify-between">
                                    <div 
                                        className="flex ml-[-3px] gap-2 justify-center items-center"
                                        onClick={()=>setFolderVisibility(index)}
                                    >
                                        <div className="flex gap-[4px] items-center">
                                            <FaCaretRight 
                                                color={theme.colors.text.secondary}
                                                className={`${item.open ? 'rotate-90' : 'rotate-0'} duration-300`}
                                            />
                                            {
                                                item.open ?
                                                <FaRegFolderOpen 
                                                    color={theme.colors.text.secondary}
                                                    size={13}
                                                />
                                                :
                                                <FaFolderClosed
                                                    color={theme.colors.text.secondary}
                                                    size={13}
                                                />
                                            }
                                        </div>
                                        <AppTypography>
                                            {item.folderName}
                                        </AppTypography>
                                    </div>
                                    {
                                        // (item.hover) &&
                                        <AnimatePresence
                                        >
                                            <ClickableTab
                                                onClick={()=>setActiveMenu(index)}
                                                className="hover:!bg-bg-quantinary"
                                            >
                                                <VscKebabVertical 
                                                    color={theme.colors.text.primary}
                                                    size={13}
                                                />
                                            </ClickableTab>
                                        </AnimatePresence>
                                    }
                                </div>
                                <div className={`flex ${item.open ? 'max-h-[50px]' : 'max-h-0'} duration-300 flex-col gap-1 pl-5`}>
                                    <div className="flex duration-300 flex-col gap-1 border-l-[1px] border-solid border-l-bg-quantinary pl-2">
                                        {
                                            item.cameras.map((cam, index : number) => (
                                                <div
                                                    onMouseOver={()=>setHover(index)}
                                                    onMouseLeave={()=>setHover(index, false)}
                                                    className="relative"
                                                    draggable
                                                    key={index}
                                                >
                                                    <Popover
                                                        show={cam.activeMenu}
                                                        close={()=>setActiveMenu(index, false)}
                                                        content={
                                                            <MenuItems 
                                                                items={cameraMenuItems}
                                                            />
                                                        }
                                                    >
                                                        <Flex
                                                            className="duration-300 hover:scale-[0.97] cursor-pointer justify-center items-center"
                                                        >
                                                            <HiVideoCamera 
                                                                color={cam.active ? '#a32a2a' :  theme.colors.text.tetiary}
                                                                className={`${cam.active && 'animate-pulse'}`}
                                                            />
                                                            <Flex
                                                                direction="column"
                                                                gap={0}
                                                            >
                                                                <AppTypography
                                                                    textColor={theme.colors.text.secondary}
                                                                >
                                                                    {cam.name}
                                                                </AppTypography>
                                                            </Flex>
                                                            {
                                                                (cam.hover || cam.activeMenu) &&
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
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            item.type === 'camera' &&
                            <div
                                onMouseOver={()=>setHover(index)}
                                onMouseLeave={()=>setHover(index, false)}
                                className="relative"
                                draggable
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
                                        className="duration-300 hover:scale-[0.97] cursor-pointer justify-center items-center"
                                    >
                                        <HiVideoCamera 
                                            color={theme.colors.text.secondary}
                                        />
                                        <Flex
                                            direction="column"
                                            gap={0}
                                        >
                                            <AppTypography
                                                textColor={theme.colors.text.secondary}
                                            >
                                                {item.name}
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
                        }
                    </Fragment>
                ))
            }
        </Flex>
    )
}

export default Cameras