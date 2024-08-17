import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Fragment } from "react"

const Cameras = () => {
    return (
        <Flex
            direction="column"
            padding="8px"
        >
            {
                [1,2,3].map((item, index:number) => (
                    <Fragment
                        key={index}
                    >
                        <Flex
                            direction="column"
                            gap={0}
                        >
                            <AppTypography
                                textColor={theme.colors.text.secondary}
                            >
                                Accra City Camera 01
                            </AppTypography>
                            <AppTypography
                                size={TypographySize.xs}
                                textColor={theme.colors.text.tetiary}
                            >
                                Accra City
                            </AppTypography>
                        </Flex>
                        {
                            index < 2 &&
                            <div className="w-full h-[1px] bg-bg-quantinary"></div>
                        }
                    </Fragment>
                ))
            }
        </Flex>
    )
}

export default Cameras