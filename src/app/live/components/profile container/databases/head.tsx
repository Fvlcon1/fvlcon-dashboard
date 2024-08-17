import Button from "@components/button/button"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { AiFillDatabase } from "react-icons/ai"

const Head = () => {
    return (
        <Flex
            padding="0 0 0 8px"
            align="center"
            justify="space-between"
        >
            <Flex
                align="center"
                width='fit-content'
            >
                <AiFillDatabase
                    color={theme.colors.text.primary}
                />
                <AppTypography
                    textColor={theme.colors.text.primary}
                >
                    Databases
                </AppTypography>
            </Flex>
            <Flex
                width="fit-content"
                gap={0}
            >
                <Button
                    text='Add +'
                />
            </Flex>
        </Flex>
    )
}
export default Head