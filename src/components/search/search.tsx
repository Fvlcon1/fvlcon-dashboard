'use client'

import Dropdown from "@components/input/dropown"
import Input from "@components/input/input"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useState } from "react"
import { LuSearch } from "react-icons/lu"

const Searchbar = ({
    className,
    inputStyle,
    placeholder,
    searchValue,
    setSearchValue
} : {
    className? : string
    inputStyle? : string
    placeholder? : string
    setSearchValue: Dispatch<SetStateAction<string>>
    searchValue: string
}) => {
    const [dropdownValue, setDropdownValue] = useState('')

    return (
        <div className={`flex w-[250px] ${className}`}>
            <Input 
                placeholder={placeholder ?? "Search anything"}
                content={searchValue}
                setContent={setSearchValue}
                className={`!w-full !h-[40px] !px-3 !py-[10px] ${inputStyle}`}
                PreIcon={<LuSearch className="mt-[-2px]" color={theme.colors.text.secondary}/>}
            />
        </div>
    )
}
export default Searchbar