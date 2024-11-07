'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import Image from "next/image"
import { FaCamera, FaCaretDown, FaLocationArrow, FaMapLocationDot } from "react-icons/fa6"
import { IoIosVideocam } from "react-icons/io"
import { IoPin } from "react-icons/io5"
import { MdOutlineShareLocation } from "react-icons/md"
import CamDetails from "./camDetails"
import { LuHistory } from "react-icons/lu"
import { PiDetectiveFill } from "react-icons/pi";
import TableHead from "./tableHead"
import TableBody from "./tableBody"
import { RiArrowDropDownLine } from "react-icons/ri"
import BottomHead from "./bottomHead"
import BottomControls from "./bottomControls"
import Table from "./table"

const Bottom = () => {
    return (
        <div className="flex flex-1 gap-4 max-h-[40%]">
            <CamDetails />
            <div className="bg-gradient-container px-3 py-2 gap-2 flex flex-col flex-1 overflow-x-auto rounded-lg">
                <div className="min-w-[500px] justify-between flex items-center">
                    <BottomHead />
                    <BottomControls />
                </div>
                <Table />
            </div>
        </div>
    )
}
export default Bottom