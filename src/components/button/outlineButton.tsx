import theme from "@styles/theme"
import Button from "./button"
import { ButtonProps } from "@/utils/@types"

const OutlineButton = (props: ButtonProps) => {
    return <Button 
        background="none"
        color={theme.colors.bg.secondary}
        hover={{
            background : `${theme.colors.bg.secondary}33`,
            opacity : 1
        }}
        {...props}
    >
        {props.children}
    </Button>
}

export default OutlineButton