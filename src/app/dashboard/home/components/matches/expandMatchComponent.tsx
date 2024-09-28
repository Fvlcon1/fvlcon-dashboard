import { checkedFaceType } from "@/utils/@types"
import MatchCard from "./MatchCard"
import { TbListDetails } from "react-icons/tb"
import theme from "@styles/theme"
import AppTypography from "@styles/components/appTypography"

const ExpandMatchComponent = ({
    match,
    showExpand
} : {
    match : checkedFaceType
    showExpand? : boolean
}) => {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex gap-2 h-full w-full p-4 justify-between">
                <div className="flex">
                    <MatchCard
                        originalImage={match.originalImage}
                        matchedImage={match.matchedImage}
                        similarity={match.similarity}
                        description={match.matchedPerson}
                        showExpand={showExpand ?? false}
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2 p-4 rounded-md bg-gradient-container-black-50 w-full">
                    <div className="flex items-center gap-2 w-full rounded-md">
                        <AppTypography
                            textColor={theme.colors.text.primary}
                        >
                            Details
                        </AppTypography>
                    </div>
                    <div className="flex flex-col gap-1">
                        {
                            match.details &&
                            Object.entries(match.details).map(([key, value]) => (
                                key !== 'imageUrl' &&
                                <div 
                                    key={key}
                                    className="flex gap-1"
                                >
                                    <AppTypography>
                                        {key} :
                                    </AppTypography>
                                    {
                                        key === 'CriminalRecord' && value ?
                                        <AppTypography
                                            textColor='royalblue'
                                            className="cursor-pointer hover:!underline hover:!opacity-70"
                                        >
                                            View
                                        </AppTypography>
                                        :
                                        <AppTypography
                                            textColor={value && value !== 'N/A' ? theme.colors.text.primary : theme.colors.text.secondary}
                                        >
                                            {value || 'N/A'}
                                        </AppTypography>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpandMatchComponent