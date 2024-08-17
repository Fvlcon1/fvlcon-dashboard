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
import Button from "@components/button/button"
import { MdLocalPolice } from "react-icons/md"
import { HiVideoCamera } from "react-icons/hi"
import { AiFillDatabase } from "react-icons/ai"

const Databases = () => {
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
                        <AiFillDatabase
                            color={theme.colors.text.primary}
                        />
                        <AppTypography
                            textColor={theme.colors.text.primary}
                        >
                            Databases
                        </AppTypography>
                    </Flex>
                    <Flex
                        width="fit-content"
                        gap={0}
                    >
                        <Button
                            text='Add +'
                        />
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
                                    align="center"
                                >
                                    <MdLocalPolice 
                                        color={theme.colors.text.secondary}
                                    />
                                    <AppTypography
                                        textColor={theme.colors.text.secondary}
                                    >
                                        Ghana Police Service
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
export default Databases