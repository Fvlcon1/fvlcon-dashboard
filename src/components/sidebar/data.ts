import { FaCircleUser, FaFileContract, FaFolderClosed, FaMap } from "react-icons/fa6";
import { IoFileTrayFull, IoSettings } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";
import ProfilePopup from "./components/profilePopup";

export const bottomPagesData = [
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
        component : ProfilePopup,
        showTootip : false,
        active : true,
        url : '/profile'
    },
    {
        name : 'Directory',
        icon : FaFolderClosed,
        active : false,
        url : '/directory'
    },
    {
        name : 'Report',
        icon : IoFileTrayFull,
        active : false,
        url : '/report'
    },
]

export const pagesData =[
    {
        name : 'Media Lab',
        icon : MdDashboard,
        active : false,
        url : '/dashboard/home'
    },
    {
        name : 'Live Vision',
        icon : RiLiveFill,
        active : false,
        url : '/live'
    },
    {
        name : 'Tracking',
        icon : FaMap,
        active : false,
        url : '/tracking'
    },
    {
        name : 'Activity Log',
        icon : FaFileContract,
        active : false,
        url : '/activityLog/fvlconizationLogs'
    },
]