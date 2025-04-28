import Text from "@styles/components/text"
import theme from "@styles/theme"
import { IconType } from "react-icons/lib"

const Title = ({
    Icon,
    text
} : {
    Icon : IconType
    text : string
}) => {
    return (
        <div className="flex items-center gap-1">
        <Icon
            color={theme.colors.text.primary}
            size={14}
        />
        <Text
            textColor={theme.colors.text.primary}
        >
            {text}
        </Text>
    </div>
    )
}
export default Title