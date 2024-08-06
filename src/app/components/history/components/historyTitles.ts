import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaCircleUser, FaImage } from "react-icons/fa6";
import { GrAction } from "react-icons/gr";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { SiBaremetrics } from "react-icons/si";

export const historyTitles = [
    {
        title : 'Type',
        icon : FaImage 
    },
    {
        title : 'Samples',
        icon : AiOutlineAppstoreAdd 
    },
    {
        title : 'Identity',
        icon : FaCircleUser 
    },
    {
        title : 'Date',
        icon : BsFillCalendarDateFill 
    },
    {
        title : 'Performance',
        icon : SiBaremetrics 
    },
    {
        title : 'Status',
        icon : HiOutlineStatusOnline 
    },
    {
        title : 'Actions',
        icon : GrAction 
    },
]