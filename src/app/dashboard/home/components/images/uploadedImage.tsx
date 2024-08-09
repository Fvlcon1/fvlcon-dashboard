'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useContext } from "react"
import { MdDelete } from "react-icons/md"
import { imagesType } from "./controls"
import { imageUploadContext } from "@/context/imageUpload"

const UploadedImage = ({
    image,
    setImages
} : {
    image : imagesType,
    setImages: Dispatch<SetStateAction<imagesType[]>>
}) => {
    const {
        selectedImage,
        setSelectedImage
    } = useContext(imageUploadContext)
    
    const imageSplit = image.name.split('.')
    const filename = imageSplit[0]
    const fileExtension = imageSplit[1] 
    
    const handleDelete = () => {
        setImages(prev => prev.filter((item, i) => item.url !== image.url))
    }

    const handleSelectedImage = () => {
        setSelectedImage(image)
    }
    return (
        <div 
            className="p-3 py-2 flex flex-col gap-1 rounded-lg bg-gradient-container"
            onClick={handleSelectedImage}
        >
            <Flex
                justify="space-between"
            >
                <AppTypography
                    ellipsis
                    maxLines={1}
                >
                    {image.name}
                </AppTypography>
                <Flex
                    width="fit-content"
                >
                    <MdDelete 
                        color={theme.colors.text.secondary} 
                        className="hover:scale-[0.9] cursor-pointer duration-300"
                        onClick={handleDelete}
                    />
                </Flex>
            </Flex>
            <div className="w-full h-[100px] rounded-lg bg-bg-quantinary p-2 cursor-pointer">
                <div className="w-full h-full rounded-md bg-bg-primary overflow-hidden">
                    <Image 
                        src={image.url}
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
        </div>
    )
}
export default UploadedImage