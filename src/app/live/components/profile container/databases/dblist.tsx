'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { Fragment, useEffect, useState } from "react"
import { MdLocalPolice } from "react-icons/md"
import Skeleton from "react-loading-skeleton"

const DBlist = () => {
    const [databases, setDatabases] = useState(false)

    useEffect(()=>{
        setTimeout(() => {
            setDatabases(true)
        }, 5000);
    })

    return (
        <Flex
            direction="column"
            padding="8px"
        >
            {
                databases ?
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
                :
                <Skeleton
                    count={3} 
                    baseColor={theme.colors.bg.tetiary}
                    highlightColor={theme.colors.bg.alt1}
                />
            }
        </Flex>
    )
}
export default DBlist