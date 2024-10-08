'use client'

import Text from "@styles/components/text"
import theme from "@styles/theme"
import { useState } from "react"
import { IoImage } from "react-icons/io5"

const DndImage = () => {
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDragOver = (e:any) => {
        console.log({e})
        setIsDragOver(true)
    }
    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    return (
        <div 
            className="w-full rounded-lg h-[150px] border-[2px] border-dotted justify-center items-center duration-500 flex"
            onDragOver={e=>handleDragOver(e)}
            onDragLeave={handleDragLeave}
            style={{
                borderColor : isDragOver ? 'white' : '#b1b1b170',
                backgroundColor : isDragOver ? theme.colors.bg.tetiary : theme.colors.bg.secondary
            }}
        >
            <div className="flex flex-col gap-2 items-center max-w-[200px]">
                {
                    isDragOver ?
                    <></>
                    :
                    <IoImage
                        color={theme.colors.text.tetiary}
                        size={30}
                    />
                }
                {
                    isDragOver ?
                    <Text
                        textAlign="center"
                        textColor={theme.colors.text.tetiary}
                    >
                        Drop Image
                    </Text>
                    :
                    <Text 
                        textAlign="center"
                        textColor={theme.colors.text.tetiary}
                    >
                        Drop Image / click to upload image of person or numbe plate
                    </Text>
                }
            </div>
        </div>
    )
}
export default DndImage