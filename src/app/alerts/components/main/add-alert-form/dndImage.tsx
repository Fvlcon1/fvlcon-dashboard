'use client'

import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useEffect, useRef, useState } from "react"
import { IoImage, IoClose } from "react-icons/io5"
import Image from "next/image"
import Button from "@components/button/button"
import ClickableTab from "@components/clickable/clickabletab"

const DndImage = () => {
    const [isDragOver, setIsDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState("")

    const inputClicked = () => {
        inputRef.current?.click()
    }

    const onFileSelected = (e: FileList | null) => {
        if (e) {
            for (let file of e) {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result as string;
                    setImageUrl(base64String);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const clearInput = () => {
        if(inputRef.current?.value?.length && inputRef.current?.value?.length > 0){
            inputRef.current.value = ''
        }
    }

    const handleDeleteImage = () => {
        setImageUrl("");
        clearInput();
    }

    useEffect(()=>{
        clearInput()
    }, [imageUrl])

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        setIsDragOver(false);
    
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                setImageUrl(base64String);
            };
            reader.readAsDataURL(file)
        }
    };

    const handleDragOver = (e:any) => {
        e.preventDefault()
        setIsDragOver(true)
    }
    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Only show dropzone when no image is uploaded */}
            {!imageUrl && (
                <div 
                    className="w-full rounded-lg h-[150px] border-[2px] border-dotted justify-center items-center duration-500 flex cursor-pointer"
                    onDragOver={e=>handleDragOver(e)}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={inputClicked}
                    style={{
                        borderColor : isDragOver ? 'white' : '#b1b1b170',
                        backgroundColor : isDragOver ? theme.colors.bg.tetiary : theme.colors.bg.secondary
                    }}
                >
                    <input 
                        ref={inputRef}
                        type="file"
                        onChange={e=>onFileSelected(e.target.files)}
                        className="hidden"
                        accept="image/*"
                    />
                    <div className="flex flex-col gap-2 items-center max-w-[200px]">
                        {isDragOver ? (
                            <></>
                        ) : (
                            <IoImage
                                color={theme.colors.text.tetiary}
                                size={25}
                            />
                        )}
                        <Text 
                            textAlign="center"
                            textColor={theme.colors.text.tetiary}
                            size={TypographySize.xs}
                        >
                            {isDragOver ? 'Drop Image' : 'Drop Image / click to upload image of a person'}
                        </Text>
                    </div>
                </div>
            )}

            {/* Image Preview Section */}
            {imageUrl && (
                <div className="w-full flex flex-col gap-2">
                    <div className="w-fit relative">
                        <Image
                            src={imageUrl}
                            alt="Uploaded preview"
                            width={200}
                            height={200}
                            className="rounded-lg"
                        />
                        <ClickableTab
                            onClick={handleDeleteImage}
                            className="absolute top-[-7px] right-[-7px] !p-1 !rounded-full !bg-red-500"
                        >
                            <IoClose 
                                color="white"
                                size={16}
                            />
                        </ClickableTab>
                    </div>
                    <Text
                        textColor={theme.colors.text.secondary}
                        size={TypographySize.xs}
                        className="text-center"
                    >
                        Click the X button to remove this image
                    </Text>
                </div>
            )}
        </div>
    )
}
export default DndImage