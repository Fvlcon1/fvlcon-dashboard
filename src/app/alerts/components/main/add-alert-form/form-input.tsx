'use client'

import Input from "@components/input/input"
import { Dispatch, ReactNode, SetStateAction, useState } from "react"

const FormInput = ({
    className,
    placeholder,
    type,
    content,
    setContent,
    PreIcon,
    PostIcon,
    onClick
} : {
    className? : string,
    onClick? : ()=>void,
    placeholder? : string,
    type? : string,
    content : string,
    PreIcon? : ReactNode,
    PostIcon? : ReactNode,
    setContent : Dispatch<SetStateAction<string>>
}) => {
    return (
        <Input
            placeholder={placeholder}
            content={content}
            setContent={setContent}
            onClick={onClick}
            PreIcon={PreIcon}
            PostIcon={PostIcon}
            className={`!bg-bg-tetiary !border-bg-quantinary rounded-lg ${className}`}
        />
    )
}
export default FormInput