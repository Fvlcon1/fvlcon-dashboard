import { ReactNode } from "react"
import Topbar from "./dashboard/home/components/topbar"
import Left from "@components/sidebar/left"
import Right from "@components/sidebar/right"
import Flex from "@styles/components/flex"

const Template = ({
    children
} : {
    children ? : ReactNode
}) => {
    return (
        <Flex
            justify="center"
        >
            <div className="max-w-[1500px] w-full">
                <Left />
                {children}
                <Right />
            </div>
        </Flex>
    )
}
export default Template     