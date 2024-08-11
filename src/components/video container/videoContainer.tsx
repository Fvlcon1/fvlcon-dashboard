'use client'

import Flex from "@styles/components/flex"
import Image from "next/image"
import AppTypography from '@styles/components/appTypography';
import theme from "@styles/theme";
import { imagesType } from "@/app/dashboard/home/components/images/controls";
import Player from 'next-video/player';
import Slidein from "@styles/components/slidein";

const VideoContainer = ({
    video
} : {
    video ? : imagesType
}) => {
    return (
        <Slidein className="!w-full">
            <div className="w-full flex flex-1 h-[350px] rounded-xl bg-gradient-border p-[1px]">
                <div className="w-full flex h-full bg-bg-secondary rounded-xl p-[15px]">
                    <div className="w-full flex h-full bg-bg-primary rounded-lg p-[1px] justify-center items-center overflow-hidden">
                        {
                            !video ?
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
                                        Drag and drop and Video / click an Video to start
                                    </AppTypography>
                                </Flex>
                            </Flex>
                            :
                            <Flex
                                width="fit-content"
                                direction="column"
                                align='center'
                                height="100%"
                                gap={0}
                            >
                                <Player 
                                    src={video.url}
                                    controls
                                    style={{
                                        height : '100%'
                                    }}
                                    accentColor={theme.colors.bg.secondary}
                                />
                            </Flex>
                        }
                    </div>
                </div>
            </div>
        </Slidein>
    )
}
export default VideoContainer