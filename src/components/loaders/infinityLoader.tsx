const InfinityLoader = ({
    size
} : {
    size? : number
}) => {
    return (
        <div className={`${size ? `w-[${size}px] h-[${size}px]` : 'h-[50px] w-[50px]'}`}>
            <img src="/assets/prod/infinityLoader.svg" />
        </div>
    )
}
export default InfinityLoader