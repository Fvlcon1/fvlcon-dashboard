'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import Image from "next/image"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import { imagesType } from "./controls"
import { imageUploadContext } from "@/context/imageUpload"
import Video from 'next-video'
import generateVideoThumbnail from "@/utils/generateVideoThumbnail"
import { FaVideo } from "react-icons/fa6"
import { isImageFile, isVideoFile } from "@/utils/getFileType"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const UploadedFile = ({
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

    const [thumbnail, setThumbnail] = useState<string>()
    
    const imageSplit = image.name.split('.')
    const filename = imageSplit[0]
    const fileEx = imageSplit[imageSplit.length - 1] 
    
    const handleDelete = () => {
        setImages(prev => prev.filter((item, i) => item.url !== image.url))
    }

    const handleSelectedImage = () => {
        setSelectedImage(image)
    }

    const getThumbnail = async () => {
        if(isVideoFile(fileEx)){
            const thumbnail = await generateVideoThumbnail(image.url)
            setThumbnail(thumbnail)
        } else if(isImageFile(fileEx)){
            setThumbnail(image.url)
        }
    }

    useEffect(()=>{
        getThumbnail()
    },[image])
    return (
        <div 
            className="p-3 py-2 flex flex-col gap-1 rounded-lg bg-gradient-container"
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
                <div 
                    className="w-full h-full relative flex justify-center items-center rounded-md bg-bg-primary overflow-hidden"
                    onClick={handleSelectedImage}
                >
                    {
                        thumbnail ?
                        <Image 
                            src={thumbnail}
                            alt="Uploaded Image"
                            fill
                            className="hover:scale-[1.3] duration-300 object-cover"
                        />
                        :
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                    }
                    {
                        isVideoFile(fileEx) &&
                        <div className="w-full h-full absolute bg-[#0000008b] flex justify-center items-center rounded-md hover:scale-[1.3] duration-300">
                            <FaVideo 
                                color={theme.colors.text.secondary}
                                size={30}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default UploadedFile