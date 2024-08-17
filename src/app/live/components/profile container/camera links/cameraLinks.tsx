'use client'

import ClickableTab from "@components/clickable/clickabletab"
import Searchbar from "@components/search/search"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Fragment, useState } from "react"
import { FaSortAlphaDown } from "react-icons/fa"
import { FiSearch } from "react-icons/fi"
import { AnimatePresence, motion } from 'framer-motion';
import { HiVideoCamera } from "react-icons/hi"

const Cameralinks = () => {
    const [showSearch, setShowSearch] = useState(false)

    return (
        <div className="w-full flex flex-col gap-2 bg-bg-secondary rounded-xl p-2">
            <Flex
                direction="column"
                gap={0}
            >
                <Flex
                    padding="0 0 0 8px"
                    align="center"
                    justify="space-between"
                >
                    <Flex
                        align="center"
                        width='fit-content'
                    >
                        <HiVideoCamera
                            color={theme.colors.text.primary}
                        />
                        <AppTypography
                            textColor={theme.colors.text.primary}
                        >
                            Cam links
                        </AppTypography>
                    </Flex>
                    <Flex
                        width="fit-content"
                        gap={0}
                    >
                        <ClickableTab
                            className="hover:!bg-bg-primary"
                            onClick={()=>setShowSearch(!showSearch)}
                        >
                            <FiSearch 
                                color={theme.colors.text.secondary}
                            />
                        </ClickableTab>
                        <ClickableTab
                            className="hover:!bg-bg-primary"
                        >
                            <FaSortAlphaDown 
                                color={theme.colors.text.secondary}
                            />
                        </ClickableTab>
                    </Flex>
                </Flex>

                <AnimatePresence>
                    {
                        showSearch &&
                        <motion.div 
                            initial={{
                                opacity : 0,
                                y : 5
                            }}
                            animate={{
                                opacity : 1,
                                y : 0
                            }}
                        >
                            <Flex>
                                <Searchbar 
                                    inputStyle="!bg-bg-tetiary"
                                />
                            </Flex>
                        </motion.div>
                    }
                </AnimatePresence>

                <Flex
                    direction="column"
                    padding="8px"
                >
                    {
                        [1,2,3].map((item, index:number) => (
                            <Fragment
                                key={index}
                            >
                                <Flex
                                    direction="column"
                                    gap={0}
                                >
                                    <AppTypography
                                        textColor={theme.colors.text.secondary}
                                    >
                                        Accra City Camera 01
                                    </AppTypography>
                                    <AppTypography
                                        size={TypographySize.xs}
                                        textColor={theme.colors.text.tetiary}
                                    >
                                        Accra City
                                    </AppTypography>
                                </Flex>
                                {
                                    index < 2 &&
                                    <div className="w-full h-[1px] bg-bg-quantinary"></div>
                                }
                            </Fragment>
                        ))
                    }
                </Flex>
            </Flex>
        </div>
    )
}
export default Cameralinks