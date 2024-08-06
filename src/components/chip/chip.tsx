import { baseProps } from "@/utils/@types"

const Chip = ({
    children,
    className,
    onClick
} : baseProps) => {
    return (
        <div 
            className={`Chip w-fit flex px-[12px] h-fit py-[5px] rounded-full justify-center items-center duration-200 bg-theme-colors-main-bg cursor-pointer hover:bg-theme-colors-main-bg2 border-solid border-[1px] border-theme-colors-main-borderColor ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
export default Chip