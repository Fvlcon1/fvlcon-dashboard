'use client'

import Flex from "@styles/components/flex"
import { useState } from "react"
import DBlist from "./dblist"
import Search from "./search"
import Head from "./head"

const Databases = () => {
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className="w-full flex flex-col gap-2 bg-bg-secondary rounded-xl p-2">
            <Flex
                direction="column"
                gap={0}
            >
                <Head />
                <Search />
                <DBlist />
            </Flex>
        </div>
    )
}
export default Databases