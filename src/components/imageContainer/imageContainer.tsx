'use client'

import Flex from "@styles/components/flex"
import Image from "next/image"
import AppTypography from '@styles/components/appTypography';
import theme from "@styles/theme";
import { imagesType } from "@/app/dashboard/home/components/images/controls";
import Slidein from "@styles/components/slidein";
import { useContext, useState } from "react";
import { hexOpacity } from "@/utils/hexOpacity";
import { FaImage } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { imageUploadContext } from "@/context/imageUpload";

const ImageContainer = ({
    image
} : {
    image ? : imagesType
}) => {
    const [isDragOver, setIsDragOver] = useState<boolean>(false)
    const {
        selectedImage,
        setSelectedImage
    } = useContext(imageUploadContext)

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragOver(false);
        console.log('drop')

        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage({ 
                    url: reader.result as string,
                    name : file.name,
                    fullFile : file
                 });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Slidein className="!w-full">
            <div className="w-full flex flex-1 h-[350px] rounded-xl bg-gradient-border p-[1px]">
                <div 
                    className="w-full flex h-full rounded-xl p-[15px] duration-500"
                    style={{
                        backgroundColor : isDragOver ? `${theme.colors.main.primary}${hexOpacity(10)}` : theme.colors.bg.secondary
                    }}
                >
                    <div 
                        className="w-full flex h-full bg-bg-primary rounded-lg p-[1px] justify-center items-center overflow-hidden"
                        onDragOver={(e)=>{
                            e.preventDefault()
                            setIsDragOver(true)
                        }}
                        onDragLeave={(e)=>{
                            e.preventDefault()
                            setIsDragOver(false)
                        }}
                        onDrop={handleDrop}
                    >
                        { 
                            isDragOver ? 
                            <motion.div 
                                className="flex flex-col gap-1 items-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <FaImage 
                                    color={theme.colors.text.secondary}
                                    size={20}
                                />
                                <AppTypography
                                    textAlign="center"
                                    textColor={theme.colors.text.tetiary}
                                >
                                    Drop media file
                                </AppTypography>
                            </motion.div>
                            :
                            image ?
                            <motion.div className="flex w-fit h-full flex-col items-center">
                                <Image 
                                    src={image.url}
                                    alt="Selected Image"
                                    width={0}
                                    height={0}
                                    style={{
                                        width : 'fit-content',
                                        height : '100%',
                                    }}
                                    className="hover:scale-[1.05] duration-300"
                                />
                            </motion.div>
                            :
                            <div className="flex w-fit flex-col items-center">
                                <Image 
                                    alt="logo"
                                    width={100}
                                    height={100}
                                    src={require('@/assets/logo.png')}
                                />
                                <Flex
                                    width="200px"
                                    margin="-20px 0 0 0"
                                >
                                    <AppTypography
                                        textAlign="center"
                                        textColor={theme.colors.text.tetiary}
                                    >
                                        Drag and drop a media file / click a media file to start
                                    </AppTypography>
                                </Flex>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Slidein>
    )
}
export default ImageContainer