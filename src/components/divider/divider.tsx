const Divider = ({
    className
} : {
    className? : string
}) => {
    return (
        <div className={`w-full h-[1px] bg-bg-quantinary ${className}`}></div>
    )
}
export default Divider