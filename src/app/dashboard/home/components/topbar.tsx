'use client'

import Databases from "@/app/live/components/profile container/databases/databases"
import ClickableTab from "@components/clickable/clickabletab"
import Popover from "@components/popover/popover"
import Searchbar from "@components/search/search"
import Head from "@components/title/head"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useState } from "react"
import { AiFillDatabase } from "react-icons/ai"
import { FaCircleUser } from "react-icons/fa6"
import { IoMdArrowDropdown } from "react-icons/io"
import { MdPermMedia } from "react-icons/md"

const Topbar = () => {
    const [showDatabase, setShowDatabase] = useState(false)
    return (
        <div className="flex w-full items-center justify-between px-1">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <MdPermMedia 
                        color={theme.colors.text.primary}
                        className="mt-[2px]"
                    />
                    <Head
                        typographyProps={{
                            ellipsis : true,
                            maxLines : 1,
                            whiteSpace : 'nowrap'
                        }}
                        title="Fvlcon Media Lab"
                    />
                </div>
                <Searchbar className="!w-[350px]"/>
            </div>
            <Flex
                width="fit-content"
                align="center"
                gap={20}
            >
                <Popover
                    show={showDatabase}
                    close={() => setShowDatabase(false)}
                    content={ <Databases /> }
                    style="w-[200px]"
                    position="left"
                >
                    <ClickableTab
                        onClick={()=>setShowDatabase(true)}
                    >
                        <div className="flex items-center gap-1">
                            <AiFillDatabase
                                color={theme.colors.text.primary}
                            />
                            <IoMdArrowDropdown color={theme.colors.text.secondary} />
                        </div>
                    </ClickableTab>
                </Popover>
            </Flex>
        </div>
    )
}
export default Topbar