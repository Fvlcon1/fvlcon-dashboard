import Button from "@components/button/button"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import { MdOutlineHistory } from "react-icons/md"

const Top = () => {
    return (
        <Flex
            justify="space-between"
            align="center"
        >
            <Flex
                width="fit-content"
                align="center"
                gap={3}
            >
                <MdOutlineHistory
                    color={theme.colors.text.secondary}
                    className="mt-[-1px]"
                />
                <AppTypography
                    bold={TypographyBold.md}
                >
                    Recents
                </AppTypography>
            </Flex>
            <Button
                text="View All"
            />
        </Flex>
    )
}
export default Top