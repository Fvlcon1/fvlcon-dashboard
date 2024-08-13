'use client'

import Dropdown from "@components/input/dropown"
import Input from "@components/input/input"
import theme from "@styles/theme"
import { useState } from "react"
import { LuSearch } from "react-icons/lu"

const Searchbar = ({
    className
} : {
    className? : string
}) => {

    const [searchValue, setSearchValue] = useState('')
    const [dropdownValue, setDropdownValue] = useState('')

    return (
        <div className={`flex w-[250px] ${className}`}>
            <Input 
                placeholder="Search anything"
                content={searchValue}
                setContent={setSearchValue}
                className="!w-full !px-3 !py-[10px]"
                PreIcon={<LuSearch className="mt-[-2px]" color={theme.colors.text.secondary}/>}
            />
        </div>
    )
}
export default Searchbar