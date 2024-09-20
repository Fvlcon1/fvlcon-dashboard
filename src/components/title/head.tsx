import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"

const Head = ({
    title
} : {
    title : string
}) => {
    return (
        <Flex
            width="fit-content"
            align="center"
        >
            {/* <div className="w-[7px] h-[25px] bg-bg-alt1 rounded-full"></div> */}
            <AppTypography
                textColor={theme.colors.text.primary}
                size={TypographySize.HM}
            >
                {title}
            </AppTypography>
        </Flex>
    )
}
export default Head