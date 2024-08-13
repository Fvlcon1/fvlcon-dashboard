import { ReactNode } from "react"
import Left from "./components/left"

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    return (
        <div className="w-full relative h-full">
            <div className="w-full pl-[80px] py-4 pr-[65px]">
                {children}
            </div>
            <Left />
        </div>
    )
}
export default Template