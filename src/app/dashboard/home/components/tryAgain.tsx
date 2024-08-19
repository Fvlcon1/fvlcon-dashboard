import Button from "@components/button/button"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"

const TryAgain = ({
    title,
    description,
    onTryAgain,
    CTAtext
} : {
    title? : string,
    description? : string,
    CTAtext? : string
    onTryAgain : ()=>void
}) => {
    return (
        <div className='w-full min-h-[100px] flex justify-center items-center px-2'>
            <Flex
                width="fit-content"
                direction="column"
                align="center"
            >
                <Flex
                    direction="column"
                    align="center"
                    gap={0}
                >
                    <AppTypography
                        textColor={theme.colors.text.primary}
                        size={TypographySize.HM}
                    >
                        {title}
                    </AppTypography>
                    <div className="max-w-[300px]">
                        <AppTypography>
                            {description}
                        </AppTypography>
                    </div>
                </Flex>
                <Button
                    text={CTAtext ?? "Try Again ↻"}
                    onClick={onTryAgain}
                />
            </Flex>
        </div>
    )
}

export default TryAgain