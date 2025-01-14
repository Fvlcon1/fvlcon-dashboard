'use client'

import Input from "@components/input/input"
import theme from "@styles/theme"
import { Tooltip } from "antd"
import { Dispatch, SetStateAction, useState } from "react"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"

const Pagination = ({
    setPageSize,
    pageSize,
    setPageNumber,
    pageNumber
} : {
    setPageSize: Dispatch<SetStateAction<number>>
    pageSize: number
    setPageNumber: Dispatch<SetStateAction<number>>
    pageNumber: number
}) => {
    const handleNextPageClick = () => {
        setPageNumber(prev => prev + 1)
    }

    const hanldePreviousPageClick = () => {
        setPageNumber(prev => {
            if(prev === 1){
                return prev
            } else {
                return prev - 1
            }
        })
    }

    return (
        <div className="flex">
            <Tooltip title="Previous page">
                <div 
                    className={`h-[33px] min-w-[33px] flex items-center justify-center rounded-l-md border-[1px] border-solid border-bg-quantinary ${pageNumber === 1 ? 'cursor-not-allowed' : 'cursor-pointer'} hover:bg-bg-secondary duration-200`}
                    onClick={hanldePreviousPageClick}
                >
                    <FaAngleLeft
                        color={theme.colors.text.secondary}
                        size={14}
                    />
                </div>
            </Tooltip>
            <Tooltip title="Limit">
                <div className="h-[33px] min-w-[33px] flex items-center justify-center border-l-[0] border-[1px] border-solid border-bg-quantinary cursor-pointer hover:bg-bg-secondary duration-200">
                    <Input
                        content={pageSize}
                        setContent={setPageSize}
                        className="!h-fit !bg-transparent !justify-center !p-0 border-none"
                        inputClassName="!w-[33px] !text-center"
                        placeholder="20"
                    />
                </div>
            </Tooltip>
            <Tooltip title="Page number">
                <div className="h-[33px] min-w-[33px] flex items-center justify-center border-l-[0] border-r-[0] border-[1px] border-solid border-bg-quantinary cursor-pointer hover:bg-bg-secondary duration-200">
                    <Input
                        content={pageNumber}
                        setContent={setPageNumber}
                        className="!h-fit !bg-transparent !justify-center !p-0 border-none"
                        inputClassName="!w-[33px] !text-center"
                        placeholder="20"
                    />
                </div>
            </Tooltip>
            <Tooltip title="Next page">
                <div 
                    className="h-[33px] min-w-[33px] flex items-center justify-center rounded-r-md border-[1px] border-solid border-bg-quantinary cursor-pointer hover:bg-bg-secondary duration-200"
                    onClick={handleNextPageClick}    
                >
                    <FaAngleRight
                        color={theme.colors.text.secondary}
                        size={14}
                    />
                </div>
            </Tooltip>
        </div>
    )
}
export default Pagination