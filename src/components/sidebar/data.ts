import { FaCircleUser, FaFileContract, FaFolderClosed } from "react-icons/fa6";
import { IoFileTrayFull, IoSettings } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";

export const bottomPagesData = [
    {
        name : 'Profile',
        icon : FaCircleUser,
        active : true,
        url : '/profile'
    },
    {
        name : 'Settings',
        icon : IoSettings,
        active : false,
        url : '/settings'
    },
]

export const rightPages = [
    {
        name : 'Profile',
        icon : FaCircleUser,
        active : true,
        url : '/profile'
    },
    {
        name : 'Directory',
        icon : FaFolderClosed,
        active : false,
        url : '/directory'
    },
]

export const pagesData =[
    {
        name : 'Dashboard',
        icon : MdDashboard,
        active : false,
        url : '/dashboard/home'
    },
    {
        name : 'Live',
        icon : RiLiveFill,
        active : false,
        url : '/live'
    },
    {
        name : 'Ativity Log',
        icon : FaFileContract,
        active : false,
        url : '/log'
    },
    {
        name : 'Report',
        icon : IoFileTrayFull,
        active : false,
        url : '/report'
    },
]