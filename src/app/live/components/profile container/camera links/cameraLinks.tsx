'use client'

import Flex from "@styles/components/flex"
import { useEffect, useState } from "react"
import Cameras from "./cameras"
import Head from "./head"
import Search from "./search"
import { protectedAPI } from "@/utils/api/api"

const privateApi = new protectedAPI()

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