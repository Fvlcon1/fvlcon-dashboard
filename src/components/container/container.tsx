import { baseProps } from "@/utils/@types"

const Container = ({
    children,
    className,
    onClick
} : baseProps) => {
    return (
        <div 
            className={`flex p-[10px] rounded-[10px] bg-theme-colors-main-bg border-[1px] border-solid border-theme-colors-main-borderColorExtraLight lg:border-theme-colors-main-borderColor ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
export default Container