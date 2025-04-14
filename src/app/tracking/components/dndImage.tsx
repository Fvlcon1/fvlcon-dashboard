'use client'

import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useContext, useEffect, useRef, useState } from "react"
import { IoImage } from "react-icons/io5"
import { trackingContext } from "../context/trackingContext"

const DndImage = () => {
    const [isDragOver, setIsDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {imageUrl, setImageUrl} = useContext(trackingContext)

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
                setImageUrl('')
            }
        }
    };

    const clearInput = () => {
        if(inputRef.current?.value?.length && inputRef.current?.value?.length > 0){
            inputRef.current.value = ''
        }
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
        console.log({e})
        setIsDragOver(true)
    }
    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    return (
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
            />
            <div className="flex flex-col gap-2 items-center max-w-[200px]">
                {
                    isDragOver ?
                    <></>
                    :
                    <IoImage
                        color={theme.colors.text.tetiary}
                        size={25}
                    />
                }
                {
                    isDragOver ?
                    <Text
                        textAlign="center"
                        textColor={theme.colors.text.tetiary}
                        size={TypographySize.xs}
                    >
                        Drop Image
                    </Text>
                    :
                    <Text 
                        textAlign="center"
                        textColor={theme.colors.text.tetiary}
                        size={TypographySize.xs}
                    >
                        Drop Image / click to upload image of a person
                    </Text>
                }
            </div>
        </div>
    )
}
export default DndImage