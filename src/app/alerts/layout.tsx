import { hexOpacity } from "@/utils/hexOpacity"
import theme from "@styles/theme"
import { ConfigProvider } from "antd"
import { ReactNode } from "react"

const Layout = ({
    children
} : {
    children : ReactNode
}) => {
    return (
        <ConfigProvider
            theme={{
                components : {
                    DatePicker : {
                        activeBg : 'transparent',
                        colorBgContainer : theme.colors.bg.quantinary,
                        hoverBg : 'transparent',
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    )
}
export default Layout