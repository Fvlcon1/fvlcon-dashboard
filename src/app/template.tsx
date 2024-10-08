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
            height="100%"
        >
            <div className="w-full h-full flex justify-center">
                <Left />
                {children}
                <Right />
            </div>
        </Flex>
    )
}
export default Template     