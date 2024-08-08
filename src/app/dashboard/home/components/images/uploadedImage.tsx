'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction } from "react"
import { MdDelete } from "react-icons/md"

const UploadedImage = ({
    image,
    setImages
} : {
    image : string,
    setImages: Dispatch<SetStateAction<string[]>>
}) => {
    const handleDelete = () => {
        setImages(prev => prev.filter((item, i) => item !== image))
    }
    return (
        <div className="p-3 flex flex-col gap-1 rounded-lg bg-gradient-container">
            <Flex
                justify="space-between"
            >
                <AppTypography>
                    • Profile 1
                </AppTypography>
                <MdDelete 
                    color={theme.colors.text.secondary} 
                    className="hover:scale-[0.9] cursor-pointer duration-300"
                    onClick={handleDelete}
                />
            </Flex>
            <div className="w-full h-[100px] rounded-lg bg-bg-quantinary p-2 cursor-pointer">
                <div className="w-full h-full rounded-md bg-bg-quantinary overflow-hidden">
                    <Image 
                        src={image}
                        alt="Uploaded Image"
                        width={0}
                        height={0}
                        style={{
                            width : '100%',
                            height : 'auto'
                        }}
                        className="hover:scale-[1.3] duration-300"
                    />
                </div>    
            </div>
            <AppTypography
                ellipsis
                maxLines={2}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </AppTypography>
        </div>
    )
}
export default UploadedImage