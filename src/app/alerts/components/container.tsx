import { ReactNode } from "react"

const Container = ({
    children,
    className
} : {
    children? : ReactNode
    className? : string
}) => {
    return (
        <div className={`flex-col gap-2 p-3 pr-0 flex w-full rounded-xl bg-bg-secondary border-[1px] border-bg-quantinary ${className}`}>
            {children}
        </div>
    )
}
export default Container