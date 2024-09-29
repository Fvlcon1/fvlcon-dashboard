import { checkedFaceType } from "@/utils/@types"
import MatchCard from "./MatchCard"
import { TbListDetails } from "react-icons/tb"
import theme from "@styles/theme"
import AppTypography from "@styles/components/appTypography"
import AllDetails from "./allDetails"

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
                <div className="flex flex-col flex-1 gap-1 p-4 rounded-md bg-gradient-container-black-50 w-full">
                    <div className="flex flex-col gap-1">
                        <AllDetails 
                            details={match.details}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpandMatchComponent