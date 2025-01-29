'use client'

import Divider from "@components/divider/divider"
import OverlayWindow from "@components/window/overlayWindow"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { forwardRef, useEffect, useState } from "react"
import Image from "next/image"
import ZoomImage from "@components/zoomImage/zoomImage"
import getDate from "@/utils/getDate"
import DownloadableList from "../components/downloadableList"
import DownloadbleContainer from "../components/downloadableContainer"

const NiaDownloadableRecord = forwardRef(
    (
      { data, croppedImage, boundedImage }: 
      { 
        data?: any
        croppedImage : string
        boundedImage : string
      }, 
      ref: React.Ref<HTMLDivElement>
    ) => {
    const [zoom, setZoom] = useState(false)
    const [zoomImage, setZoomImage] = useState('')
    const {
        applicationDetails : appDetes,
        personDetails : personDetes, 
        birthDetails : birthDetes, 
        placeOfBirth : POB, 
        hometown : htown, 
        occupation : occup, 
        residentialAddress : RAdress, 
        fatherDetails : fatherDetes,
        fathersHometown : fatherHtown,
        mothersDetails : motherDetes,
        mothersHometown : motherHtown,
        nextOfKin : NOK,
        verificationDocument : verificationDoc,
        contact : cont,
        institutionalIds : IIds,
        imageUrl
    } = data ?? {}
    const applicationDetails = [
        ["Type of application", appDetes?.typeOfApplication],
        ["Type of Request", appDetes?.typeOfRequest],
        ["Date of Application", appDetes?.dateOfApplication],
        ["Interviewer NID number", appDetes?.interviewerNidNumber],
        ["Registration centre number", appDetes?.registrationCentreNumber]
    ]
    const personDetails = [
        ["Surname", personDetes?.surname],
        ["Forenames", personDetes?.forenames],
        ["Height", personDetes?.height],
        ["Colour of eyes", personDetes?.colourOfEyes],
        ["Colour of hair", personDetes?.colourOfHair],
        ["Disability code", personDetes?.disabilityCode],
        ["Level of education", personDetes?.levelOfEducation],
    ]
    const birthDetails = [
        ["Birth Certificate number", birthDetes?.birthCertificateNumber],
        ["Date issued",  birthDetes?.dateIssued],
        ["Date of birth", birthDetes?.dateOfBirth],
        ["Nationality at birth", birthDetes?.nationalityAtBirth],
        ["Current nationality", birthDetes?.currentNationality],
    ]
    const placeOfBirth = [
        ["Village/town", POB?.villageTown],
        ["Region code", POB?.regionCode],
        ["District/State", POB?.districtState]
    ]
    const hometown = [
        ["Village/town", htown?.villageTown],
        ["Region/code", htown?.regionCode],
        ["District/State", htown?.districtState]
    ]
    const occupation = [
        ["Occupation", occup?.occupation]
    ]
    const residentialAddress = [
        ["Village/town", RAdress?.villageTown],
        ["Region/Country", RAdress?.regionCode],
        ["District/State", RAdress?.districtState],
        ["Community area name", RAdress?.communityAreaName],
        ["ZIP/Postal code", RAdress?.zipPostalCode],
        ["Digital Address", RAdress?.digitalAddress]
    ]
    const fatherDetails = [
        ["Full name of father", fatherDetes?.fullNameOfFather],
        ["Nationality", fatherDetes?.nationality],
        ["Is father alive", fatherDetes?.isFatherAlive]
    ]
    const fathersHometown = [
        ["Village/town", fatherHtown?.villageTown],
        ["Region/code", fatherHtown?.regionCode],
        ["District/State", fatherHtown?.districtState],
    ]
    const motherDetails = [
        ["Full name of Mother", motherDetes?.fullNameOfMother],
        ["Nationality", motherDetes?.nationality],
        ["Is Mother alive", motherDetes?.isMotherAlive]
    ]
    const mothersHometown = [
        ["Village/town", motherHtown?.villageTown],
        ["Region/code", motherHtown?.regionCode],
        ["District/State", motherHtown?.districtState],
    ]
    const NextOfKin = [
        ["Next of kin", NOK?.nextOfKin],
        ["Address", NOK?.address]
    ]
    const verificationDocument = [
        ["type",  verificationDoc?.type],
        ["Document number / NID",  verificationDoc?.documentNumberNid],
        ["Date issued",   verificationDoc?.dateIssued],
    ]
    const contact = [
        ["Local phone number",  cont?.localPhoneNumber],
    ] 
    const institutionalIds = [
        ["Voter's Id number",  IIds?.votersIdNumber],
        ["Date issued",  IIds?.dateIssued],
    ]

    useEffect(()=>{
        console.log({data})
    },[])
    return (
        <div className="relative z-[-1]" ref={ref}>
            <div className="fixed top-0 left-0 w-full flex h-full justify-center items-center opacity-[0.05] pointer-events-none">
                <div className="h-[600px] w-[700px] z-10 relative">
                    <Image
                        alt="img"
                        fill
                        className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                        src={require('@/assets/dev/coagh.png')}
                        onClick={()=>setZoom(prev => !prev)}
                    />
                </div>
            </div>
            {
                data &&
                <div className="w-full p-8 flex flex-col gap-6 bg-white">
                    <div className="w-full flex justify-between gap-2 items-center">
                        <div className="flex gap-3 items-center">
                            <div className="h-[100px] w-[100px] rounded-lg bg-bg-quantinary relative overflow-hidden">
                                <Image
                                    alt="img"
                                    fill
                                    className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                    src={boundedImage ?? ''}
                                />
                            </div>
                            <div className="h-[100px] w-[100px] rounded-lg bg-bg-quantinary relative overflow-hidden">
                                <Image
                                    alt="img"
                                    fill
                                    className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                    src={croppedImage ?? ''}
                                />
                            </div>
                            <div className="h-[100px] w-[100px] rounded-lg bg-bg-quantinary relative overflow-hidden">
                                <Image
                                    alt="img"
                                    fill
                                    className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                    src={imageUrl ?? ''}
                                />
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className="h-[70px] w-[80px] relative">
                                <Image
                                    alt="img"
                                    fill
                                    className="duration-300 object-cover cursor-pointer"
                                    src={require('@/assets/dev/coagh.png')}
                                />
                            </div>
                            <div className="h-[65px] w-[230px] relative mt-[5px]">
                                <Image
                                    alt="img"
                                    fill
                                    className="duration-300 object-cover cursor-pointer"
                                    src={require('@/assets/dev/nia-logo.png')}
                                />
                            </div>
                        </div>
                    </div>
                    <DownloadbleContainer
                        title="Application Details"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={applicationDetails}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Personal Details"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={personDetails}
                                first={4}
                            />
                            <DownloadableList 
                                data={personDetails}
                                last={4}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Birth Details"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={birthDetails}
                                first={3}
                            />
                            <DownloadableList 
                                data={birthDetails}
                                last={3}
                            />
                        </div>
                        <Divider className="!bg-bgLight-primary" />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Place of birth
                            </Text>
                            <div className="w-full flex gap-2">
                                <DownloadableList 
                                    data={placeOfBirth}
                                    first={2}
                                />
                                <DownloadableList 
                                    data={placeOfBirth}
                                    last={2}
                                />
                            </div>
                        </div>
                        <Divider className="!bg-bgLight-primary" />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Hometown
                            </Text>
                            <div className="w-full flex gap-2">
                                <DownloadableList 
                                    data={hometown}
                                    first={2}
                                />
                                <DownloadableList 
                                    data={hometown}
                                    last={2}
                                />
                            </div>
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Occupation"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={occupation}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Residential Address"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={residentialAddress}
                                first={3}
                            />
                            <DownloadableList 
                                data={residentialAddress}
                                last={3}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Applicants Parentage"
                    >
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {"Father's details"}
                            </Text>
                            <div className="w-full flex gap-2">
                                <DownloadableList 
                                    data={fatherDetails}
                                    first={2}
                                />
                                <DownloadableList 
                                    data={fatherDetails}
                                    last={2}
                                />
                            </div>
                        </div>
                        <Divider className="!bg-bgLight-primary" />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {"Father's hometown"}
                            </Text>
                            <div className="w-full flex gap-2">
                                <DownloadableList 
                                    data={fathersHometown}
                                    first={2}
                                />
                                <DownloadableList 
                                    data={fathersHometown}
                                    last={2}
                                />
                            </div>
                        </div>
                        <Divider className="!bg-bgLight-primary" />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {"Mother's details"}
                            </Text>
                            <div className="w-full flex gap-2">
                                <DownloadableList 
                                    data={motherDetails}
                                    first={2}
                                />
                                <DownloadableList 
                                    data={motherDetails}
                                    last={2}
                                />
                            </div>
                        </div>
                        <Divider className="!bg-bgLight-primary" />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {"Mother's hometown"}
                            </Text>
                            <div className="w-full flex gap-2">
                                <DownloadableList 
                                    data={mothersHometown}
                                    first={2}
                                />
                                <DownloadableList 
                                    data={mothersHometown}
                                    last={2}
                                />
                            </div>
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Next of kin"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={NextOfKin}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Verification document"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={verificationDocument}
                                first={2}
                            />
                            <DownloadableList 
                                data={verificationDocument}
                                last={2}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Contact"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={contact}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Instituitional Ids"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <DownloadableList 
                                data={institutionalIds}
                            />
                        </div>
                    </DownloadbleContainer>
                </div>
            }
        </div>
    )
})
export default NiaDownloadableRecord