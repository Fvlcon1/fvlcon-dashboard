'use client'

import ClickableTab from "@components/clickable/clickabletab"
import Searchbar from "@components/search/search"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Fragment, useState } from "react"
import { FaSortAlphaDown } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import { AnimatePresence, motion } from 'framer-motion';
import Button from "@components/button/button"
import { MdLocalPolice } from "react-icons/md"
import { HiVideoCamera } from "react-icons/hi"
import { AiFillDatabase } from "react-icons/ai"
import DBlist from "./dblist"
import Search from "./search"

const Databases = () => {
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className="w-full flex flex-col gap-2 bg-bg-secondary rounded-xl p-2">
            <Flex
                direction="column"
                gap={0}
            >
                

                <Search />
                <DBlist />
            </Flex>
        </div>
    )
}
export default Databases