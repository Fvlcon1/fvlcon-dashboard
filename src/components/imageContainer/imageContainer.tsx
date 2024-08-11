'use client'

import Flex from "@styles/components/flex"
import Image from "next/image"
import AppTypography from '@styles/components/appTypography';
import theme from "@styles/theme";
import { imagesType } from "@/app/dashboard/home/components/images/controls";
import Slidein from "@styles/components/slidein";

const ImageContainer = ({
    image
} : {
    image ? : imagesType
}) => {
    return (
        <Slidein className="!w-full">
            <div className="w-full flex flex-1 h-[350px] rounded-xl bg-gradient-border p-[1px]">
                <div className="w-full flex h-full bg-bg-secondary rounded-xl p-[15px]">
                    <div className="w-full flex h-full bg-bg-primary rounded-lg p-[1px] justify-center items-center overflow-hidden">
                        {
                            !image ?
                            <Flex
                                width="fit-content"
                                direction="column"
                                align='center'
                                gap={0}
                            >
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
                                        Drag and drop and image / click an image to start
                                    </AppTypography>
                                </Flex>
                            </Flex>
                            :
                            <Flex
                                width="fit-content"
                                direction="column"
                                align='center'
                                gap={0}
                            >
                                <Image 
                                    src={image.url}
                                    alt="Selected Image"
                                    width={0}
                                    height={0}
                                    style={{
                                        width : '100%',
                                        height : '100%'
                                    }}
                                    className="hover:scale-[1.05] duration-300"
                                />
                            </Flex>
                        }
                    </div>
                </div>
            </div>
        </Slidein>
    )
}
export default ImageContainer