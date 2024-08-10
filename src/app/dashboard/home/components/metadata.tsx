import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import Slidein from "@styles/components/slidein"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"

const Metadata = () => {
    return (
        <Flex
            flex={1}
            maxWidth="50%"
        >
            <Slidein className="!w-full">
                <Flex
                    direction="column"
                    padding="0 5px"
                >
                    <AppTypography
                        textColor={theme.colors.text.primary}
                        size={TypographySize.HM}
                    >
                        Meta Info
                    </AppTypography>
                    <AppTypography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    </AppTypography>
                </Flex>
            </Slidein>
        </Flex>
    )
}
export default Metadata