import { flexProps } from "@styles/flexProps"

const Flex = ({
    children,
    direction,
    gap,
    className,
    padding,
    margin,
    justify,
    flex,
    align,
    width,
    height,
    maxWidth,
    maxHeight,
    minHeight,
    minWidth,
    textColor,
    flexWrap,
    opacity,
    rounded,
    background,
    cursor,
    shadow,
    z,
    position,
    overflow,
    overflowX,
    overflowY,
    scrollbarWidth
} : flexProps) => {
    return (
        <div
            className={`flex flex-${direction === 'column' ? 'col' : 'row'} ${className}`}
            style={{
                padding,
                margin,
                justifyContent : justify,
                alignItems : align,
                width : width ?? '100%',
                gap : gap ?? 8,
                flex,
                height : height ?? 'fit-content',
                minHeight,
                minWidth,
                maxWidth,
                maxHeight,
                color : textColor,
                flexWrap : flexWrap ? 'wrap' : 'nowrap',
                opacity,
                borderRadius : rounded,
                background,
                cursor,
                boxShadow : shadow,
                zIndex :z,
                position,
                overflowX,
                overflowY,
                overflow,
                scrollbarWidth,
            }}
        >
            {children}
        </div>
    )
}

export default Flex