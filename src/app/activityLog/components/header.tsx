'use client'

import Searchbar from "@components/search/search"
import Head from "@components/title/head"
import theme from "@styles/theme"
import { useState } from "react"
import { IoLogoBuffer } from "react-icons/io5"

const Header = () => {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="flex items-center gap-4">
            <div className="gap-1 items-center flex">
                <IoLogoBuffer
                    color={theme.colors.main.primary}
                />
                <Head title="Activity log"/>
            </div>
            <Searchbar
                className="!w-[350px]"
                setSearchValue={setSearchValue}
                searchValue={searchValue}
            />
        </div>
    )
}
export default Header