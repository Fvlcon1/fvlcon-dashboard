import Divider from "@components/divider/divider"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"

const Header = ({
    title,
    description
} : {
    title : string,
    description? : string
}) => {
    return (
        <Flex
            direction="column"
        >
            <Flex
                direction="column"
                padding="0 10px"
                gap={2}
            >
                <AppTypography
                    size={TypographySize.HL}
                    textColor={theme.colors.text.primary}
                >
                    {title}
                </AppTypography>
                <AppTypography>
                    {description}
                </AppTypography>
            </Flex>
            <Divider className="!bg-bg-quantinary" />
        </Flex>
    )
}
export default Header