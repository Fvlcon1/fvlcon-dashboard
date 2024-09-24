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
                    <div className="flex items-center gap-2 w-full bg-bg-tetiary px-3 py-2 rounded-md">
                        <TbListDetails
                            color={theme.colors.text.primary}
                        />
                        <AppTypography
                            textColor={theme.colors.text.primary}
                        >
                            Details
                        </AppTypography>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1">
                            <AppTypography>
                                Firstname :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.FirstName && theme.colors.text.primary}
                            >
                                {match.details?.FirstName || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                Lastname :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.LastName && theme.colors.text.primary}
                            >
                                {match.details?.LastName || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                Address :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.Address && theme.colors.text.primary}
                            >
                                {match.details?.Address || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                Citizenship :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.Citizenship && theme.colors.text.primary}
                            >
                                {match.details?.Citizenship || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                CriminalRecord :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.CriminalRecord && theme.colors.text.primary}
                            >
                                {match.details?.CriminalRecord || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                DateOfBirth :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.DateOfBirth && theme.colors.text.primary}
                            >
                                {match.details?.DateOfBirth || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                DigitalAddress :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.DigitalAddress && theme.colors.text.primary}
                            >
                                {match.details?.DigitalAddress || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                ExternalImageId :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.ExternalImageId && theme.colors.text.primary}
                            >
                                {match.details?.ExternalImageId || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                FaceId :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.FaceId && theme.colors.text.primary}
                            >
                                {match.details?.FaceId || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                HasCriminalRecord :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.HasCriminalRecord && theme.colors.text.primary}
                            >
                                {match.details?.HasCriminalRecord || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                MiddleName :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.MiddleName && theme.colors.text.primary}
                            >
                                {match.details?.MiddleName || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                PersonId :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.PersonId && theme.colors.text.primary}
                            >
                                {match.details?.PersonId || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                PlaceOfBirth :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.PlaceOfBirth && theme.colors.text.primary}
                            >
                                {match.details?.PlaceOfBirth || 'N/A'}
                            </AppTypography>
                        </div>
                        <div className="flex gap-1">
                            <AppTypography>
                                S3Key :
                            </AppTypography>
                            <AppTypography
                                textColor={match.details?.S3Key && theme.colors.text.primary}
                            >
                                {match.details?.S3Key || 'N/A'}
                            </AppTypography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpandMatchComponent