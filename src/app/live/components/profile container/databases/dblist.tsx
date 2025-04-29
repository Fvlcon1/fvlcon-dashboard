'use client'

import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { Fragment, useEffect, useState } from "react"
import { MdLocalPolice } from "react-icons/md"
import Skeleton from "react-loading-skeleton"

const DBlist = () => {
    const [databases, setDatabases] = useState(true)

    const db = [
        "National Security",
        "Ghana Immigration",
        "Ghana Prisons",
        "NIA",
        "Ghana Police Service"
    ]

    return (
        <Flex
            direction="column"
            padding="8px"
        >
            {
                databases ?
                db.map((item, index:number) => (
                    <Fragment
                        key={index}
                    >
                        <Flex
                            align="center"
                        >
                            {/* <MdLocalPolice
                                color={theme.colors.text.secondary}
                            /> */}
                            <AppTypography
                                textColor={theme.colors.text.secondary}
                            >
                                {item}
                            </AppTypography>
                        </Flex>
                        {
                            index < db.length - 1 &&
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