import { ReactNode } from "react"
import Left2 from "@components/sidebar/left2"
import BottomBackgroundLoader from "@components/loaders/bottomBackgroundLoader"

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    return (
        <div className="w-full">
            <Left2 />
            <div className="w-full pl-[208px] py-4 pr-[85px]">
                {children}
            </div>
        </div>
    )
}
export default Template