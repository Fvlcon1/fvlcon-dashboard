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
import { HiVideoCamera } from "react-icons/hi"
import Cameras from "./cameras"
import Head from "./head"
import Search from "./search"

const Cameralinks = () => {
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className="w-full flex flex-col gap-2 bg-bg-secondary rounded-xl p-2">
            <Flex
                direction="column"
                gap={0}
            >
                <Head 
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                />
                <Search
                    showSearch={showSearch}
                />
                <Cameras />
            </Flex>
        </div>
    )
}
export default Cameralinks