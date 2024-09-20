import { baseProps } from "@/utils/@types"
import AppTypography from "@styles/components/appTypography"
import { TypographySize } from "@styles/style.types"

interface badgeProps extends baseProps {
    text : string,
    showBadge : boolean,
    active? : boolean
}

const Badge = ({
    children,
    className,
    active,
    text,
    showBadge,
    onClick
} : badgeProps) => {
    return (
        <div 
            className={`Badge flex flex-col relative ${text.length ? 'mt-[-10px]' : 'mt-[-4px]'} ${className}`}
            onClick={onClick}
        >
            {
                showBadge &&
                <div className={`flex flex-1 justify-end relative top-[10px] ${text.length ? 'right-[-5px]' : 'right-[0]'}`}>
                    <div className={`Actual-badge flex z-10 max-h-[20px] min-h-[5px] min-w-[5px] justify-center items-center w-fit rounded-full ${text.length ? 'px-[5px] py-[1px]' : 'p-[4px]'} bg-theme-colors-main-primary`}>
                        <AppTypography
                            textColor="white"
                            size={TypographySize.body}
                        >
                            {text}
                        </AppTypography>
                    </div>
                </div>
            }
            <div className={`Children ${active ? 'text-theme-colors-main-primary' : 'text-theme-colors-main-text-body'}`}>
                {children}
            </div>
        </div>
    )
}
export default Badge