import { ReactNode } from "react"
import Right from "./components/right"
import Profile from "./components/profile container/profile"

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    return (
        <div className="w-full relative h-full">
            <Profile />
            <div className="w-full pl-[310px] py-4 pr-[75px]">
                {children}
            </div>
            <Right />
        </div>
    )
}
export default Template