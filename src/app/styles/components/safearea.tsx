import { ReactNode } from "react"

const Safearea = ({
    children
} : {
    children? : ReactNode
}) => {
    return (
        <div className="SafeArea w-full px-[15px] flex justify-center">
            <div className='Area w-full lg:w-minimumWidth'>
                {children}
            </div>
        </div>
    )
}
export default Safearea