import { ReactNode } from "react"
import Header from "./header"

const Wrapper = ({
    children
} : {
    children? : ReactNode
}) => {
    return (
        <div className="w-full pl-[208px] py-4 pr-[85px] flex justify-center">
            <div className="w-full max-w-[1200px] flex flex-col gap-2">
                <Header />
                {children}
            </div>
        </div>
    )
}
export default Wrapper