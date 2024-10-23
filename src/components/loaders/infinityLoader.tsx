const InfinityLoader = ({
    size
} : {
    size? : number
}) => {
    return (
        <div 
            className={``}
            style={{
                width : size ? `${size}px` : '50px',
                height : size ? `${size}px` : '50px'
            }}
        >
            <img src="/assets/prod/infinityLoader.svg" />
        </div>
    )
}
export default InfinityLoader