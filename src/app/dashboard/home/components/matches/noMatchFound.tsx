import AppTypography from "@styles/components/appTypography"

const NoMatchFound = () => {
    return (
        <div 
            className="w-full rounded-lg bg-bg-tetiary p-2 cursor-pointer">
            <div className="w-[full] relative h-[150px] rounded-md bg-bg-primary flex justify-center items-center overflow-hidden">
                <AppTypography>
                    🚫 No match found
                </AppTypography>
            </div>
        </div>
    )
}

export default NoMatchFound