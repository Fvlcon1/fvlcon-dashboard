'use client'

import Chip from "@components/chip/chip"
import DropdownContainer from "@components/container/dropdownContainer"
import Input from "@components/input/input"
import { ClickAwayListener } from "@mui/base"
import AppTypography from "@styles/components/appTypography"
import { colors } from "@styles/theme"
import { Dispatch, SetStateAction, useState } from "react"
import { FaCaretRight } from "react-icons/fa6"

const Dropdown = ({
    className,
    inputClassName,
    dropdownClassName,
    state,
    setState,
    placeholder,
} : {
    className? : string,
    inputClassName? : string,
    dropdownClassName? : string,
    state : string,
    setState : Dispatch<SetStateAction<string>>,
    placeholder? : string
}) => {

    const [showDropdown, setShowDropdown] = useState(false)
    const handleItemClick = (course : number) => {
        setState(`Course ${course}`)
        setShowDropdown(false)
    }

    const handleClickAway = () => {
        setShowDropdown(false)
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div 
                className={`Dropdown relative flex flex-col bg-theme-colors-main-bg placeholder:text-[12px] text-[16px] ${className}`}
                onClick={()=>setShowDropdown(!showDropdown)} 
            >
                <Input 
                    content={state}
                    setContent={setState}
                    placeholder={placeholder}
                    PostIcon={<FaCaretRight
                        className={`${showDropdown ? 'rotate-90' : 'rotate-0' } duration-200 `}
                        color={colors.text.secondary}
                    />}
                    className={`!bg-transparent ${inputClassName}`}
                />
                <div className="absolute mt-[45px] flex min-w-full">
                    <DropdownContainer
                        show={showDropdown}
                        setShow={setShowDropdown}
                        className={`w-[250px] ${dropdownClassName}`}
                    >
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex flex-col gap-[2px]">
                                {
                                    [1,2,3,4,5,6].map((course, index : number) => (
                                        <div 
                                            key={index}
                                            className="px-[10px] py-[4px] duration-200 hover:bg-theme-colors-main-shadowLight rounded-[5px] w-full cursor-pointer "
                                            onClick={()=>handleItemClick(course)}
                                        >
                                            <AppTypography>
                                                Course {course}
                                            </AppTypography>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </DropdownContainer>
                </div>
            </div>
        </ClickAwayListener>
    )
}
export default Dropdown