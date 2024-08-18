'use client'

import Button from "@components/button/button"
import ClickableTab from "@components/clickable/clickabletab"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { FaGear } from "react-icons/fa6"
import { IoMdArrowDropdown } from "react-icons/io"
import { IoVideocam } from "react-icons/io5"
import { MdViewQuilt } from "react-icons/md"
import AddCam from "./add cam/addCam"
import { useState } from "react"

const Controls = () => {
    const [showAddCam, setShowAddCam] = useState(false)
    return (
        <Flex
            width="fit-content"
            align="center"
            gap={0}
        >
            <ClickableTab>
                <Flex
                    width="fit-content"
                    align='center'
                >
                    <MdViewQuilt
                        color={theme.colors.text.secondary}
                        size={20}
                    />
                    <IoMdArrowDropdown
                        color={theme.colors.text.secondary}
                    />
                </Flex>
            </ClickableTab>
            <ClickableTab>
                <Flex
                    width="fit-content"
                    align='center'
                >
                    <FaGear
                        color={theme.colors.text.secondary}
                        size={17}
                    />
                    <IoMdArrowDropdown
                        color={theme.colors.text.secondary}
                    />
                </Flex>
            </ClickableTab>
            <Button 
                text="Add Cam +"
                onClick={()=>setShowAddCam(true)}
            />
            <AddCam 
                display={showAddCam}
                setDisplay={setShowAddCam}
            />
        </Flex>
    )
}
export default Controls