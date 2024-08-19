'use client'

import Button from "@components/button/button"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { FaImage } from "react-icons/fa6"
import Images from "./images"
import { useContext, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { imageUploadContext } from "@/context/imageUpload"

export type imagesType = {
    url : string,
    name : string,
    fullFile : File
}

const Controls = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {images, setImages} = useContext(imageUploadContext)

    const inputClicked = () => {
        inputRef.current?.click()
    }

    const onFileSelected = (e : FileList | null) => {
        if(e){ 
            const imageUrl = URL.createObjectURL(e[0]);
            setImages(prev => [...prev, {url : imageUrl, name : e[0].name,  fullFile : e[0]}])
            const x = e[0]
            console.log(imageUrl)
        }
    }

    useEffect(()=>{
        if(inputRef.current?.value?.length && inputRef.current?.value?.length > 0){
            inputRef.current.value = ''
        }
    }), [images]

    return (
        <div  className="fixed items-end right-[82px] gap-2 w-[150px] flex flex-col h-[100vh] py-4">
            <input 
                ref={inputRef}
                type="file" 
                multiple
                onChange={e=>onFileSelected(e.target.files)}
                className="hidden"
            />
            <Button
                text="Upload +"
                icon={<FaImage className="mt-[-1px]"/>}
                onClick={inputClicked}
            />
            <Images />
        </div>
    )
}
export default Controls