import { FaCircleUser, FaFileContract, FaFolderClosed } from "react-icons/fa6";
import { IoFileTrayFull, IoSettings } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";

export const bottomPagesData = [
    {
        name : 'Profile',
        icon : FaCircleUser,
        active : true
    },
    {
        name : 'Settings',
        icon : IoSettings,
        active : false
    },
]

export const rightPages = [
    {
        name : 'Profile',
        icon : FaCircleUser,
        active : true
    },
    {
        name : 'Folder',
        icon : FaFolderClosed,
        active : false
    },
]

export const pagesData =[
    {
        name : 'Dashboard',
        icon : MdDashboard,
        active : true
    },
    {
        name : 'Live',
        icon : RiLiveFill,
        active : false
    },
    {
        name : 'File',
        icon : FaFileContract,
        active : false
    },
    {
        name : 'Report',
        icon : IoFileTrayFull,
        active : false
    },
]