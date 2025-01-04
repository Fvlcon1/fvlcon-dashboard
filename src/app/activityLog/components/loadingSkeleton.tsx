import theme from "@styles/theme"
import Skeleton from "react-loading-skeleton"

const LoadingSkeleton = () => {
    return (
        [1,2,3,4,5,6,7,8,9].map((item, index) =>(
            <div className="flex flex-col gpa-1" key={index}>
                <Skeleton
                    height={60}
                    baseColor={theme.colors.bg.tetiary}
                    highlightColor={theme.colors.bg.alt1}
                    borderRadius={5}
                />
                <Skeleton
                    height={30}
                    width={'70%'}
                    baseColor={theme.colors.bg.tetiary}
                    highlightColor={theme.colors.bg.alt1}
                    borderRadius={5}
                />
                <Skeleton
                    height={20}
                    width={'40%'}
                    baseColor={theme.colors.bg.tetiary}
                    highlightColor={theme.colors.bg.alt1}
                    borderRadius={5}
                />
            </div>
        ))
    )
}
export default LoadingSkeleton