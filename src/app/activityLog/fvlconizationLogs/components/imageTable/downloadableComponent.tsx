import Chip from '@components/chip/chip';
import Text from '@styles/components/text';
import theme from '@styles/theme';
import Image from 'next/image';
import React, { forwardRef } from 'react';
import MatchContainer from './matchContainer';
import { TypographyBold } from '@styles/style.types';
import { motion } from 'framer-motion';
import letterhead from '@/assets/prod/letterhead.png';
import logo from '@/assets/prod/fvlcon-logo-thick.png';
import image1 from '@/assets/dev/image1.png';
import { FvlconizationLogsTypes } from '../fvlconizationLogs.types';
import { getTime } from '@/utils/getDate';

const DownloadableComponent = forwardRef<HTMLDivElement, { data: FvlconizationLogsTypes }>(({ data }, ref) => {
    console.log({data})
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 1 }}
        >
            <div className="absolute w-full h-full top-0 left-0 z-10 pointer-events-none">
                <div className="w-full h-full absolute top-0 left-0 flex justify-center items-center pointer-events-none">
                    <div ref={ref} className="w-[700px] rounded-xl h-[90%] bg-white relative overflow-hidden flex flex-col gap-4">
                        {/* Header with Letterhead */}
                        <div className="w-full absolute flex justify-end">
                            <Image 
                                src={letterhead}
                                alt="Letterhead"
                                width={700}
                                height={700}
                                layout="intrinsic"
                            />
                        </div>

                        <div className="flex flex-col gap-6 px-6">
                            {/* Logo and Date */}
                            <div className="w-fit mt-[45px] flex flex-col gap-0">
                                <Image 
                                    src={logo}
                                    alt="Fvlcon logo"
                                    width={30}
                                    height={30}
                                    layout="intrinsic"
                                />
                                <Text textColor={theme.colors.main.primary}>Fvlcon</Text>
                                <Text>{new Date().toDateString()} | {getTime(new Date())}</Text>
                            </div>

                            {/* Uploaded Image Section */}
                            <div className="flex flex-col gap-2 w-[150px]">
                                <div className="px-2 border-l-4 border-main-primary">
                                    <Text
                                        textColor={theme.colors.main.primary}
                                        bold={TypographyBold.sm2}
                                    >
                                        Uploaded Image
                                    </Text>
                                </div>
                                <div className="w-full relative h-[150px] overflow-hidden rounded-lg bg-[#d7d7d747]">
                                    <Image 
                                        src={data.uploadedImageUrl}
                                        alt="Uploaded sample image"
                                        className="object-cover"
                                        fill
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Text lineHeight={1.2}>{new Date(data.date).toDateString()}</Text>
                                    <Text>{getTime(new Date(data.date))}</Text>
                                </div>
                            </div>

                            {/* Identified People Section */}
                            <div className="flex flex-col gap-2">
                                <div className="px-2 border-l-4 border-main-primary">
                                    <Text
                                        textColor={theme.colors.main.primary}
                                        bold={TypographyBold.sm2}
                                    >
                                        Identified People
                                    </Text>
                                </div>
                                <div className="flex gap-4 flex-wrap">
                                    {data.identifiedPeopleDetails?.map((item, index) => (
                                        <MatchContainer
                                            key={`match-${index}`}
                                            originalImageUrl={data.uploadedImageUrl}
                                            capturedImageUrl={item.segmentedImageUrl}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

export default DownloadableComponent;
