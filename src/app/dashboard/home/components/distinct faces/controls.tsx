import Button from "@components/button/button"
import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Dispatch, SetStateAction } from "react"
import { BiRecycle } from "react-icons/bi"
import { IoIosCloseCircle } from "react-icons/io"
import { IoReload } from "react-icons/io5"
import { MdDeleteSweep, MdFullscreen } from "react-icons/md"

const Controls = ({
    setDisplayWindow,
    onClear,
    tryAgain,
    onClose
} : {
    setDisplayWindow: Dispatch<SetStateAction<boolean>>
    onClear? : ()=>void
    tryAgain? : ()=>void
    onClose? : ()=>void
}) => {
    return (
        <>
            <Flex
                justify="space-between"
                align="center"
            >
                <AppTypography
                    textColor={theme.colors.text.primary}
                >
                    Disticnt Faces
                </AppTypography>
                <Flex
                    width="fit-content"
                    align="center"
                    gap={4}
                >
                    <Button
                        text="Clear"
                        icon={<MdDeleteSweep />}
                        onClick={onClear}
                    />
                    <ClickableTab
                        className="hover:!bg-bg-alt1"
                        onClick={()=>setDisplayWindow(true)}
                    >
                        <AppTypography
                            textColor={theme.colors.text.primary}
                            size={TypographySize.HL}
                        >
                            <MdFullscreen />
                        </AppTypography>
                    </ClickableTab>
                    <ClickableTab
                        className="hover:!bg-bg-alt1"
                        onClick={tryAgain}
                    >
                        <AppTypography
                            textColor={theme.colors.text.primary}
                            size={TypographySize.HL}
                        >
                            <IoReload />
                        </AppTypography>
                    </ClickableTab>
                    <ClickableTab
                        className="hover:!bg-bg-alt1 !rounded-full"
                        onClick={onClose}
                    >
                        <AppTypography
                            textColor={theme.colors.text.primary}
                            size={TypographySize.HL}
                        >
                            <IoIosCloseCircle />
                        </AppTypography>
                    </ClickableTab>
                </Flex>
            </Flex>
        </>
    )
}
export default Controls