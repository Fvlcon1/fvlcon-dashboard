'use client'

import Searchbar from "@components/search/search"
import Head from "@components/title/head"
import theme from "@styles/theme"
import { useState } from "react"
import { FaMap } from "react-icons/fa6"

const Topbar = () => {
    const [searchValue, setSearchValue] = useState<string>('')

    return (
        <div className="w-full flex items-center">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <FaMap
                        color={theme.colors.main.primary}
                        className="mt-[2px]"
                    />
                    <Head
                        typographyProps={{
                            ellipsis : true,
                            maxLines : 1,
                            whiteSpace : 'nowrap'
                        }}
                        title="Tracking"
                    />
                </div>
                <Searchbar 
                    className="!w-[350px]"
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                />
            </div>
        </div>
    )
}
export default Topbar