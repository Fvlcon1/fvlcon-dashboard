'use state'

import DropdownContainer from "@components/container/dropdownContainer"
import AppTypography from "@styles/components/appTypography"
import { Dispatch, SetStateAction, useState } from "react"

const Dropdown = ({
    className,
    inputClassName,
    dropdownClassName,
    state,
    showDropdown,
    setShowDropdown,
    setState,
    placeholder,
} : {
    className? : string,
    inputClassName? : string,
    dropdownClassName? : string,
    showDropdown : boolean
    setShowDropdown? : Dispatch<SetStateAction<boolean>>
    state : string,
    setState : Dispatch<SetStateAction<string>>,
    placeholder? : string
}) => {
    const handleItemClick = (course : number) => {
        setState(`Course ${course}`)
        setShowDropdown && setShowDropdown(false)
    }

    const handleClickAway = () => {
        setShowDropdown && setShowDropdown(false)
    }
    return (
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
                                className="px-[10px] py-[4px] duration-200 hover:bg-bg-tetiary rounded-[5px] w-full cursor-pointer "
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
    )
}
export default Dropdown