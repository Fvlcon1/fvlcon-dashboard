import theme from "@styles/theme"
import Skeleton from "react-loading-skeleton"

const CamDetailsLoader = () => {
    return (
        <div className="w-[35%]">
            <Skeleton
                height={200}
                baseColor={theme.colors.bg.tetiary}
                highlightColor={theme.colors.bg.alt1}
            />
            <>
                <Skeleton
                    height={20}
                    baseColor={theme.colors.bg.tetiary}
                    highlightColor={theme.colors.bg.alt1}
                />
                <Skeleton
                    height={20}
                    baseColor={theme.colors.bg.tetiary}
                    highlightColor={theme.colors.bg.alt1}
                />
                <Skeleton
                    height={20}
                    width={'80%'}
                    baseColor={theme.colors.bg.tetiary}
                    highlightColor={theme.colors.bg.alt1}
                />
                <Skeleton
                    height={20}
                    width={'40%'}
                    baseColor={theme.colors.bg.tetiary}
                    highlightColor={theme.colors.bg.alt1}
                />
            </>
        </div>
    )
}
export default CamDetailsLoader