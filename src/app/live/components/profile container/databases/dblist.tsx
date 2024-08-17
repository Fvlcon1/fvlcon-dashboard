import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { Fragment } from "react"
import { MdLocalPolice } from "react-icons/md"

const DBlist = () => {
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
                            align="center"
                        >
                            <MdLocalPolice
                                color={theme.colors.text.secondary}
                            />
                            <AppTypography
                                textColor={theme.colors.text.secondary}
                            >
                                Ghana Police Service
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
export default DBlist