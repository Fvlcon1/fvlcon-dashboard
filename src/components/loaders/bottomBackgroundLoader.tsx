import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { Spin } from "antd"

const BottomBackgroundLoader = ({
    spinSize,
    title
} : {
    spinSize? : "small" | "default" | "large" | undefined,
    title? : string
}) => {
    return (
        <div className="fixed z-30 bottom-3 right-3 flex justify-center items-center rounded-lg bg-bg-tetiary p-2">
            <Flex
                width="fit-content"
                align="center"
            >
                <Spin size={spinSize ?? 'small'}></Spin>
                <AppTypography
                    textColor={theme.colors.text.primary}
                >
                    {title}
                </AppTypography>
            </Flex>
        </div>
    )
}

export default BottomBackgroundLoader
