import { ReactNode } from "react"
import Left from "./components/left"

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    return (
        <div className="w-full h-full">
            <Left />
            <div className="w-full pl-[350px] py-4 pr-[75px]">
                {children}
            </div>
        </div>
    )
}
export default Template