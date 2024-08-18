import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { IoMdAlert } from "react-icons/io"

const Required = () => {
    return (
        <div className="w-fit py-1 rounded-full px-3 pl-[6px] border-solid border-[1px] border-bg-quantinary bg-bg-secondary flex justify-center items-center">
            <Flex
                align="center"
                width="fit-content"
                gap={6}
            >
                <IoMdAlert 
                    color={theme.colors.text.secondary}
                    size={15}
                />
                <AppTypography
                    size={TypographySize.xs}
                >
                    Required
                </AppTypography>
            </Flex>
        </div>
    )
}
export default Required