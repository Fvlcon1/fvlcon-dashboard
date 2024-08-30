'use client'

import Flex from "@styles/components/flex"
import Image from "next/image"
import AppTypography from '@styles/components/appTypography';
import theme from "@styles/theme";
import { imagesType } from "@/app/dashboard/home/components/images/controls";
import Player from 'next-video/player';
import Slidein from "@styles/components/slidein";
import { Dispatch, SetStateAction, useRef } from "react";

const VideoContainer = ({
    video,
    setVideoTimestamp,
    onPlay,
    onPause
} : {
    video ? : imagesType
    setVideoTimestamp : Dispatch<SetStateAction<number>>
    onPlay? : ()=>void
    onPause? : ()=>void
}) => {
    const playerRef = useRef<any | null>(null);
    return (
        <Slidein className="!w-full">
            <div className="w-full flex flex-1 h-[350px] rounded-xl bg-gradient-border p-[1px]">
                <div className="w-full flex h-full bg-bg-secondary rounded-xl p-[15px]">
                    <div className="w-full flex h-full bg-bg-primary rounded-lg p-[1px] justify-center items-center relative overflow-hidden">
                        <div id="imageDetectionCanvas" className="absolute top-0 w-[560px] h-[320px] pointer-events-none z-10"></div>
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
                                    ref={playerRef}
                                    controls
                                    style={{
                                        height : '100%'
                                    }}
                                    accentColor={theme.colors.bg.secondary}
                                    onTimeUpdate={(time)=>setVideoTimestamp(playerRef.current.currentTime)}
                                    onPlay={onPlay}
                                    onPause={onPause}
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