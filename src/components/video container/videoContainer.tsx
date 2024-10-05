'use client'

import Flex from "@styles/components/flex"
import Image from "next/image"
import AppTypography from '@styles/components/appTypography';
import theme from "@styles/theme";
import { imagesType } from "@/app/dashboard/home/components/images/controls";
import Player from 'next-video/player';
import Slidein from "@styles/components/slidein";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { fvlconizedFaceType, logsType } from "@/utils/@types";

const VideoContainer = ({
    video,
    logs,
    setVideoTimestamp,
    onPlay,
    onPause,
    occurances,
    fvlconizing,
    videoTimestamp
} : {
    video?: imagesType
    logs : logsType[],
    setVideoTimestamp: Dispatch<SetStateAction<number>>
    onPlay?: () => void
    onPause?: () => void
    fvlconizing : boolean
    videoTimestamp : number
    occurances?: {
        index: number;
        content: fvlconizedFaceType[];
    }
}) => {
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const [duration, setDuration] = useState(0);
    const [seekBlocks, setSeekBlocks] = useState<(fvlconizedFaceType | undefined)[]>([]);
    const [seekBlockWidth, setSeekBlockWidth] = useState(0);
    const [videoContainerWidth, setVideoContainerWidth] = useState(0);
    const videoContainerWidthRef = useRef<HTMLDivElement>(null);

    const updateDivWidth = () => {
        if (videoContainerWidthRef.current) {
            const containerWidth = videoContainerWidthRef.current.offsetWidth;
            setSeekBlockWidth(containerWidth / seekBlocks.length);
            setVideoContainerWidth(containerWidth);
        }
    };

    useEffect(() => {
        updateDivWidth();
        window.addEventListener('resize', updateDivWidth);
        return () => {
            window.removeEventListener('resize', updateDivWidth);
        };
    }, [seekBlocks]);

    const setStamps = () => {
        let stamps = occurances?.content;
        let localSeekBlock: (fvlconizedFaceType | undefined)[] = [];
        for (let i = 0; i < duration * 2; i++) {
            if (stamps) {
                let face: fvlconizedFaceType | undefined = undefined;
                if (stamps[0]?.Timestamp <= 0.5 * i * 1000) {
                    face = stamps[0];
                    stamps = stamps.filter((_, index) => index !== 0);
                }
                localSeekBlock.push(face);
            }
        }
        setSeekBlocks(localSeekBlock);
    };

    const handleSetPlayerTimestamp = (time : number) => {
        if(playerRef.current){
            const playerTime = playerRef.current.currentTime
            if(playerTime === time){
                playerRef.current.currentTime = time + 0.001
            } else {
                playerRef.current.currentTime = time
            }
        }
    }

    let timeUpdateTimeout: NodeJS.Timeout;
    const handleTimeUpdate = () => {
        if (timeUpdateTimeout) clearTimeout(timeUpdateTimeout);
        timeUpdateTimeout = setTimeout(() => {
            if (playerRef.current) {
                const updatedTime = playerRef.current.currentTime;
                setVideoTimestamp(updatedTime);
            }
        }, 100); // Adjust debounce time as needed
    };

    useEffect(() => {
        setStamps();
        updateDivWidth();
    }, [occurances]);

    useEffect(() => {
        if (video) {
            const videoElement = document.createElement('video');
            videoElement.src = video.url;
            videoElement.addEventListener('loadedmetadata', () => {
                setDuration(videoElement.duration);
            });
        }
    }, [video]);

    return (
        <Slidein className="!w-full">
            <div className="w-full flex flex-1 h-fit rounded-xl bg-gradient-border p-[1px]">
                <div className="w-full flex flex-col gap-2 h-full bg-bg-secondary rounded-xl p-[15px]">
                    <div 
                        className="w-full flex h-[350px] bg-bg-primary rounded-lg p-[1px] justify-center items-center relative overflow-hidden"
                        ref={videoContainerWidthRef}
                    >
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
                                            Drag and drop a Video / click a Video to start
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
                                        style={{ height: '100%' }}
                                        accentColor={theme.colors.bg.secondary}
                                        onPlay={onPlay}
                                        onPause={onPause}
                                        playbackRates={[0.2, 0.5, 0.7, 1, 1.2, 1.5, 1.7, 2]}
                                        onTimeUpdate={handleTimeUpdate}
                                    />
                                </Flex>
                        }
                    </div>
                    <div className="flex w-full rounded-md">
                        {
                            fvlconizing ?
                            <div className="bg-bg-quantinary w-full h-8 animate-pulse rounded-md flex justify-center items-center">
                                <AppTypography>
                                    {logs[logs.length - 1]?.log.content}
                                </AppTypography>
                            </div>
                            :
                            seekBlocks.map((item, index) => (
                                item ?
                                    <div 
                                        className={`flex h-[30px] bg-bg-alt1 hover:opacity-50 cursor-pointer ${index === 0 && 'rounded-l-md'} ${!seekBlocks[index - 1] && 'rounded-l-md'} ${!seekBlocks[index + 1] && 'rounded-r-md'} ${index === seekBlocks.length - 1 && 'rounded-r-md'}`}
                                        style={{ width: `${seekBlockWidth}px` }}
                                        key={index}
                                        onClick={() => {
                                            const update = item.Timestamp / 1000
                                            handleSetPlayerTimestamp(update)
                                        }}
                                    />
                                    :
                                    <div 
                                        className={`flex h-[30px]`}
                                        style={{ width: `${seekBlockWidth}px` }}
                                        key={index}
                                    />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Slidein>
    );
};

export default VideoContainer;
