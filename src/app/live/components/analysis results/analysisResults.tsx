'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { MdDelete } from "react-icons/md"

const AnalysisResults = () => {
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
                    info here
                </AppTypography>
                <Flex
                    width="fit-content"
                >
                    <MdDelete 
                        color={theme.colors.text.secondary} 
                        className="hover:scale-[0.9] cursor-pointer duration-300"
                    />
                </Flex>
            </Flex>
            <div className="w-full h-[100px] rounded-lg bg-bg-quantinary p-2 cursor-pointer">
                <div 
                    className="w-full h-full relative flex justify-center items-center rounded-md bg-bg-primary overflow-hidden"
                >

                </div>
            </div>
            <AppTypography
                ellipsis
                maxLines={3}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit
            </AppTypography>
        </div>
    )
}
export default AnalysisResults