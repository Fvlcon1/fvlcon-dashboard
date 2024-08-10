import { ReactNode } from "react"
import Topbar from "./dashboard/home/components/topbar"
import Left from "@components/sidebar/left"
import Right from "@components/sidebar/right"

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    return (
        <div>
            <Left />
            {children}
            <Right />
        </div>
    )
}
export default Template     