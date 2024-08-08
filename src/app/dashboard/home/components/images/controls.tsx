'use client'

import Button from "@components/button/button"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { FaImage } from "react-icons/fa6"
import Images from "./images"
import { useRef, useState } from "react"
import Image from "next/image"

const Controls = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<string[]>([])

    const inputClicked = () => {
        inputRef.current?.click()
    }

    const onFileSelected = (e : FileList | null) => {
        if(e){ 
            const imageUrl = URL.createObjectURL(e[0]);
            setImages(prev => [...prev, imageUrl])
            console.log(imageUrl)
        }
    }

    return (
        <div  className="fixed right-[82px] gap-2 w-[150px] flex flex-col h-[100vh] py-4">
            <Flex
                align="center"
                justify="space-between"
            >
                <AppTypography>
                    4 items
                </AppTypography>
                <input 
                    ref={inputRef}
                    type="file" 
                    onChange={e=>onFileSelected(e.target.files)}
                    className="hidden"
                />
                <Button
                    text="Upload +"
                    icon={<FaImage className="mt-[-1px]"/>}
                    onClick={inputClicked}
                />
            </Flex>
            <Images 
                images={images}
                setImages={setImages}
            />
        </div>
    )
}
export default Controls