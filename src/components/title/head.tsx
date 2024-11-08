import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { AppTypographyProps, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"

const Head = ({
    title,
    typographyProps
} : {
    title : string
    typographyProps? : AppTypographyProps
}) => {
    return (
        <Flex
            width="fit-content"
            align="center"
        >
            {/* <div className="w-[7px] h-[25px] bg-bg-alt1 rounded-full"></div> */}
            <AppTypography
                textColor={theme.colors.main.primary}
                size={TypographySize.HM}
                {...typographyProps}
            >
                {title}
            </AppTypography>
        </Flex>
    )
}
export default Head