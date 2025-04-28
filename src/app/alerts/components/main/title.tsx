import Head from "@components/title/head"
import theme from "@styles/theme"
import { HiBellAlert } from "react-icons/hi2"

const Title = () => {
    return (
        <div className="flex items-center gap-2">
            <HiBellAlert
                color={theme.colors.main.primary}
                className="mt-[2px]"
            />
            <Head
                typographyProps={{
                    ellipsis : true,
                    maxLines : 1,
                    whiteSpace : 'nowrap'
                }}
                title="Alerts"
            />
        </div>
    )
}
export default Title