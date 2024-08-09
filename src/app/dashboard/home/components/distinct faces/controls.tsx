import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Dispatch, SetStateAction } from "react"
import { MdFullscreen } from "react-icons/md"

const Controls = ({
    setDisplayWindow
} : {
    setDisplayWindow: Dispatch<SetStateAction<boolean>>
}) => {
    return (
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
                gap={15}
            >
                <ClickableTab
                    className="hover:!bg-bg-quantinary"
                >
                    <AppTypography
                        textColor={theme.colors.text.primary}
                    >
                        Analyze all ➜
                    </AppTypography>
                </ClickableTab>
                <AppTypography>
                    |
                </AppTypography>
                <ClickableTab
                    className="hover:!bg-bg-quantinary"
                    onClick={()=>setDisplayWindow(true)}
                >
                    <AppTypography
                        textColor={theme.colors.text.primary}
                        size={TypographySize.HL}
                    >
                        <MdFullscreen />
                    </AppTypography>
                </ClickableTab>
            </Flex>
        </Flex>
    )
}
export default Controls