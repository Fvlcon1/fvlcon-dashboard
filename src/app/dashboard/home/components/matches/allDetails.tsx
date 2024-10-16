'use client'

import { checkFaceDetails } from "@/utils/@types"
import Popover from "@components/popover/popover"
import AppTypography from "@styles/components/appTypography"
import theme from "@styles/theme"
import { FaLocationArrow, FaRegFileLines } from "react-icons/fa6"
import { HiUserCircle } from "react-icons/hi"
import CriminalRecord from "./criminalRecord"
import { useState } from "react"

const AllDetails = ({
    details
} : {
    details? : checkFaceDetails
}) => {
    const [showCriminalRecords, setShowCriminalRecords] = useState(false)
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                    <HiUserCircle size={12} color={theme.colors.text.primary}/>
                    <AppTypography textColor={theme.colors.text.primary}>
                        Persoanl information
                    </AppTypography>
                </div>
                <div className="flex flex-col p-2 px-3 bg-bg-secondary rounded-md gap-1">
                    <div className="flex gap-1">
                        <AppTypography>
                            First name :
                        </AppTypography>
                        <AppTypography
                            textColor={details?.FirstName && theme.colors.text.primary}
                        >
                            {details?.FirstName || 'N/A'}
                        </AppTypography>
                    </div>
                    <div className="flex gap-1">
                        <AppTypography>
                            Middle name :
                        </AppTypography>
                        <AppTypography
                            textColor={details?.MiddleName && theme.colors.text.primary}
                        >
                            {details?.MiddleName || 'N/A'}
                        </AppTypography>
                    </div>
                    <div className="flex gap-1">
                        <AppTypography>
                            Last name :
                        </AppTypography>
                        <AppTypography
                            textColor={details?.LastName && theme.colors.text.primary}
                        >
                            {details?.LastName || 'N/A'}
                        </AppTypography>
                    </div>
                    <div className="flex gap-1">
                        <AppTypography>
                            Date of birth :
                        </AppTypography>
                        <AppTypography
                            textColor={details?.DateOfBirth && theme.colors.text.primary}
                        >
                            {details?.DateOfBirth || 'N/A'}
                        </AppTypography>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                    <FaLocationArrow size={10} color={theme.colors.text.primary}/>
                    <AppTypography textColor={theme.colors.text.primary}>
                        Location information
                    </AppTypography>
                </div>
                <div className="flex flex-col p-2 px-3 bg-bg-secondary rounded-md gap-1">
                    <div className="flex gap-1">
                        <AppTypography>
                            Address :
                        </AppTypography>
                        <AppTypography
                            textColor={details?.Address && theme.colors.text.primary}
                        >
                            {details?.Address || 'N/A'}
                        </AppTypography>
                    </div>
                    <div className="flex gap-1">
                        <AppTypography>
                            Digital address :
                        </AppTypography>
                        <AppTypography
                            textColor={details?.DigitalAddress && theme.colors.text.primary}
                        >
                            {details?.DigitalAddress || 'N/A'}
                        </AppTypography>
                    </div>
                    <div className="flex gap-1">
                        <AppTypography>
                            Place of birth :
                        </AppTypography>
                        <AppTypography
                            textColor={details?.PlaceOfBirth && theme.colors.text.primary}
                        >
                            {details?.PlaceOfBirth || 'N/A'}
                        </AppTypography>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                    <FaRegFileLines size={10} color={theme.colors.text.primary}/>
                    <AppTypography textColor={theme.colors.text.primary}>
                        Legal information
                    </AppTypography>
                </div>
                <div className="flex flex-col p-2 px-3 bg-bg-secondary rounded-md gap-1">
                    <div className="flex gap-1">
                        <AppTypography>
                            Citizenship :
                        </AppTypography>
                        <AppTypography
                            textColor={details?.Citizenship && theme.colors.text.primary}
                        >
                            {details?.Citizenship || 'N/A'}
                        </AppTypography>
                    </div>
                    <div className="flex gap-1">
                        <AppTypography>
                            Criminal record :
                        </AppTypography>
                        {
                            details?.CriminalRecord ?
                            <Popover
                                show={showCriminalRecords}
                                close={() => setShowCriminalRecords(false)}
                                content={ <CriminalRecord 
                                    isVisible={showCriminalRecords}
                                    setIsVisible={setShowCriminalRecords}
                                    data={details.CriminalRecord}
                                /> }
                                style="!border-none !bg-transparent"
                                position="top"
                            >
                                <div onClick={()=>setShowCriminalRecords(prev => !prev)} className="top-[-8px]">
                                    <AppTypography
                                        textColor="royalblue"
                                        className="hover:!underline !cursor-pointer hover:!opacity-70"
                                    >
                                        View
                                    </AppTypography>
                                </div>
                            </Popover>
                            :
                            <AppTypography>
                                N/A
                            </AppTypography>
                        }
                    </div>
                    <div className="flex gap-1">
                        <AppTypography>
                            Has criminal record :
                        </AppTypography>
                        <AppTypography
                            textColor={theme.colors.text.primary}
                        >
                            {details?.HasCriminalRecord ? 'Yes' : 'No'}
                        </AppTypography>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllDetails