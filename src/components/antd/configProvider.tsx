import { hexOpacity } from "@/utils/hexOpacity"
import { theme } from "@styles/theme"
import { ConfigProvider } from "antd"
import { ReactNode } from "react"

const AntdConfigProvider = ({
    children
} : {
    children? : ReactNode
}) => {
    return (
        <ConfigProvider
            theme={{
                components : {
                    DatePicker : {
                        activeBg : 'transparent',
                        colorBgContainer : 'transparent',
                        fontSize : 12,
                        controlHeight : 36,
                        activeBorderColor : `${theme.colors.main.primary}${hexOpacity(40)}`,
                        hoverBg : 'transparent',
                        cellActiveWithRangeBg : theme.colors.bg.tetiary,
                        hoverBorderColor : `${theme.colors.main.primary}${hexOpacity(40)}`,
                        cellHoverBg : theme.colors.bg.quantinary
                    },
                    Switch: {
                        colorPrimary: theme.colors.main.primary,
                      },
                    Checkbox: {
                        colorPrimary: theme.colors.main.primary,
                        controlItemBgActive: theme.colors.main.primary,
                        colorBgContainer: theme.colors.bg.alt1,
                    },
                },
                token : {
                    colorBgContainer : theme.colors.bg.secondary,
                    colorBorder : theme.colors.bg.quantinary,
                    colorText : theme.colors.text.secondary,
                    colorTextPlaceholder : theme.colors.text.secondary,
                    controlOutline : theme.colors.bg.quantinary,
                    colorPrimary : theme.colors.text.tetiary,
                    colorPrimaryHover : theme.colors.text.primary,
                    colorBgElevated : theme.colors.bg.tetiary,
                    colorSplit : theme.colors.bg.quantinary,
                    colorBgTextActive : theme.colors.main.primary,
                    controlItemBgHover : theme.colors.bg.quantinary,
                }
            }}
        >
            {children}
        </ConfigProvider>
    )
}
export default AntdConfigProvider