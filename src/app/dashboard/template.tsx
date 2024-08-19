import { ReactNode } from "react"
import Left2 from "@components/sidebar/left2"

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    return (
        <div className="w-full max-w-[1500px]">
            <Left2 />
            <div className="w-full pl-[208px] py-4 pr-[85px]">
                {children}
            </div>
        </div>
    )
}
export default Template