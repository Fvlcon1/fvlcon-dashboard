'use client'

import Divider from "@components/divider/divider"
import OverlayWindow from "@components/window/overlayWindow"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { forwardRef, Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image"
import ZoomImage from "@components/zoomImage/zoomImage"
import getDate from "@/utils/getDate"
import DownloadableList from "./downloadableList"
import DownloadbleContainer from "./downloadableContainer"
import { componentToPdfDownload } from "@/utils/componentToPdfDownload"
import { formatTime } from "@/utils/formatTime"

const PrintableFvlconizationResult = (
    { 
        data, 
        croppedImageUrl, 
        uploadedImageUrl,
        action,
        filename,
        fvlconizationResultsDetails
        // boundedImage
     }: 
    { 
        data?: any
        croppedImageUrl : string
        uploadedImageUrl : string
        action?: string
        filename? : string
        fvlconizationResultsDetails : {
            date : string
            timeElapsed : number
            status : string
            type : string
            accuracy : number
        }
        // boundedImage : string
    }, 
) => {
    const [zoom, setZoom] = useState(false)
    const [zoomImage, setZoomImage] = useState('')
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const refobj = useRef<HTMLDivElement>(null);
    const {date, timeElapsed, status, type, accuracy } = fvlconizationResultsDetails
    
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
        imageUrl,
        criminalRecord : Crec
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
    const criminalRecord : any[] = Crec?.map((record : any)=>{
        return [
            ["Arrest Date",  (new Date(record?.arrestDate)).toDateString()],
            ["Arresting Officer",  record?.arrestingOfficer],
            ["Criminal Record Id",  record?.criminalRecordId],
            ["Offence Type",  record?.offenceTypee],
            ["Person Id",  record?.personId],
            ["Sentence Length (months)",  record?.sentenceLengthMonths],
        ]
    })
    const fvlcoinzationResultsDetes = [
        ["Date", date],
        ["Time Elapsed", `${formatTime(timeElapsed)}`],
        ["Status", status],
        ["Type", type],
        ["Accuracy", `${accuracy.toFixed(4)}%`]
    ]

    if(criminalRecord){
        criminalRecord.length = 1
    }

    const waitForAllImagesToLoad = () => {
        const images = document.querySelectorAll("img");
        let loadedCount = 0;
    
        if (images.length === 0) {
          setImagesLoaded(true); // No images, so we're ready
          return;
        }
    
        images.forEach((img) => {
          if (img.complete) {
            loadedCount++;
          } else {
            img.onload = () => {
              loadedCount++;
              if (loadedCount === images.length) {
                setImagesLoaded(true);
              }
            };
          }
        });
    }

    const downloadPdf = async () => {
        try {
            setTimeout(async () => {
            await componentToPdfDownload(refobj, 1, filename);
            }, 2000);
        } catch (error) {
            console.log({ error });
        }
    };

    useEffect(()=>{
        waitForAllImagesToLoad()
    },[])

    useEffect(() => {
        if (imagesLoaded){
            if(action==='download'){
                downloadPdf()
            } else {
                window.print()
            }
        }
    }, [imagesLoaded]);
    return (
        <div ref={refobj} className="rounded-lg overflow-hidden">
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
                                    src={uploadedImageUrl ?? ''}
                                    crossOrigin="anonymous"
                                />
                            </div>
                            <div className="h-[100px] w-[100px] rounded-lg bg-bg-quantinary relative overflow-hidden">
                                <Image
                                    alt="img"
                                    fill
                                    className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                    src={croppedImageUrl ?? ''}
                                    crossOrigin="anonymous"
                                />
                            </div>
                            <div className="h-[100px] w-[100px] rounded-lg bg-bg-quantinary relative overflow-hidden">
                                <Image
                                    alt="img"
                                    fill
                                    className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                    src={imageUrl ?? ''}
                                    crossOrigin="anonymous"
                                />
                            </div>
                        </div>
                        <div className="flex gapx-4 items-center">
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
                        title="Fvlconization Details"
                    >
                        <div className="w-full px-4 flex gap-2">
                            <DownloadableList 
                                data={fvlcoinzationResultsDetes}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer
                        title="Application Details"
                    >
                        <div className="w-full px-4 flex gap-2">
                            <DownloadableList 
                                data={applicationDetails}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Personal Details"
                    >
                        <div className="w-full px-4 flex gap-2">
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
                        <div className="w-full px-4 flex gap-2 pb-1">
                            <DownloadableList 
                                data={birthDetails}
                                first={3}
                            />
                            <DownloadableList 
                                data={birthDetails}
                                last={3}
                            />
                        </div>
                        <Divider className="!border-b-bgLight-tetiary border-b-[1px] border-b-solid" />
                        <div className="w-full px-4 flex flex-col py-2">
                            <Text
                                textColor={theme.colors.textLight.tetiary}
                                size={TypographySize.xs}
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
                        <Divider className="!border-b-bgLight-tetiary border-b-[1px] border-b-solid" />
                        <div className="w-full px-4 flex flex-col py-2">
                            <Text
                                textColor={theme.colors.textLight.tetiary}
                                size={TypographySize.xs}
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
                        <div className="w-full px-4 flex gap-2">
                            <DownloadableList 
                                data={occupation}
                            />
                        </div>
                    </DownloadbleContainer>

                    <div className="page-break">
                        <DownloadbleContainer 
                            title="Residential Address"
                        >
                            <div className="w-full px-4 flex gap-2">
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
                    </div>

                    <DownloadbleContainer 
                        title="Applicants Parentage"
                    >
                        <div className="w-full px-4 flex flex-col">
                            <Text
                                textColor={theme.colors.textLight.tetiary}
                                size={TypographySize.xs}
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
                        <Divider className="!border-b-bgLight-tetiary border-b-[1px] border-b-solid" />
                        <div className="w-full px-4 flex flex-col py-2">
                            <Text
                                textColor={theme.colors.textLight.tetiary}
                                size={TypographySize.xs}
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
                        <Divider className="!border-b-bgLight-tetiary border-b-[1px] border-b-solid" />
                        <div className="w-full px-4 flex flex-col py-2">
                            <Text
                                textColor={theme.colors.textLight.tetiary}
                                size={TypographySize.xs}
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
                        <Divider className="!border-b-bgLight-tetiary border-b-[1px] border-b-solid" />
                        <div className="w-full px-4 flex flex-col py-2">
                            <Text
                                textColor={theme.colors.textLight.tetiary}
                                size={TypographySize.xs}
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
                        <div className="w-full px-4 flex gap-2">
                            <DownloadableList 
                                data={NextOfKin}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Verification document"
                    >
                        <div className="w-full px-4 flex gap-2">
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
                        <div className="w-full px-4 flex gap-2">
                            <DownloadableList 
                                data={contact}
                            />
                        </div>
                    </DownloadbleContainer>

                    <DownloadbleContainer 
                        title="Instituitional Ids"
                    >
                        <div className="w-full px-4 flex gap-2">
                            <DownloadableList 
                                data={institutionalIds}
                            />
                        </div>
                    </DownloadbleContainer>

                    {
                        criminalRecord.length &&
                        <div className="page-break">
                            <DownloadbleContainer 
                                title="Criminal Records"
                            >
                                {
                                    criminalRecord.map((record : any, index : number) => (
                                        <Fragment key={index}>
                                            <div className="w-full p-4 flex flex-col gap-2">
                                                <Text
                                                    textColor={theme.colors.text.tetiary}
                                                >
                                                    {`#${index}`}
                                                </Text>
                                                <div className="w-full flex gap-2">
                                                    <DownloadableList 
                                                        data={record}
                                                        evenBg={theme.colors.bg.secondary}
                                                        first={3}
                                                    />
                                                    <DownloadableList 
                                                        data={record}
                                                        evenBg={theme.colors.bg.secondary}
                                                        last={3}
                                                    />
                                                </div>
                                            </div>
                                            {
                                                index !== criminalRecord.length -1 &&
                                                <Divider className="!border-b-bgLight-tetiary border-b-[1px] border-b-solid" />
                                            }
                                        </Fragment>
                                    ))
                                }
                            </DownloadbleContainer>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
export default PrintableFvlconizationResult