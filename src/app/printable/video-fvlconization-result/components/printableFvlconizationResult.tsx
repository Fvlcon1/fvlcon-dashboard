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
import { capitalizeString } from "@/utils/capitalizeString"

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
        ["Type Of Application", capitalizeString(appDetes?.typeOfApplication)],
        ["Type Of Request", capitalizeString(appDetes?.typeOfRequest)],
        ["Date Of Application", capitalizeString(appDetes?.dateOfApplication)],
        ["Interviewer NID Number", capitalizeString(appDetes?.interviewerNidNumber)],
        ["Registration Centre Number", capitalizeString(appDetes?.registrationCentreNumber)]
      ];
      
      const personDetails = [
        ["Surname", capitalizeString(personDetes?.surname)],
        ["Forenames", capitalizeString(personDetes?.forenames)],
        ["Height", capitalizeString(personDetes?.height)],
        ["Colour Of Eyes", capitalizeString(personDetes?.colourOfEyes)],
        ["Colour Of Hair", capitalizeString(personDetes?.colourOfHair)],
        ["Disability Code", capitalizeString(personDetes?.disabilityCode)],
        ["Level Of Education", capitalizeString(personDetes?.levelOfEducation)]
      ];
      
      const birthDetails = [
        ["Birth Certificate Number", capitalizeString(birthDetes?.birthCertificateNumber)],
        ["Date Issued", capitalizeString(birthDetes?.dateIssued)],
        ["Date Of Birth", capitalizeString(birthDetes?.dateOfBirth)],
        ["Nationality At Birth", capitalizeString(birthDetes?.nationalityAtBirth)],
        ["Current Nationality", capitalizeString(birthDetes?.currentNationality)]
      ];
      
      const placeOfBirth = [
        ["Village/Town", capitalizeString(POB?.villageTown)],
        ["Region Code", capitalizeString(POB?.regionCode)],
        ["District/State", capitalizeString(POB?.districtState)]
      ];
      
      const hometown = [
        ["Village/Town", capitalizeString(htown?.villageTown)],
        ["Region/Code", capitalizeString(htown?.regionCode)],
        ["District/State", capitalizeString(htown?.districtState)]
      ];
      
      const occupation = [
        ["Occupation", capitalizeString(occup?.occupation)]
      ];
      
      const residentialAddress = [
        ["Village/Town", capitalizeString(RAdress?.villageTown)],
        ["Region/Country", capitalizeString(RAdress?.regionCode)],
        ["District/State", capitalizeString(RAdress?.districtState)],
        ["Community Area Name", capitalizeString(RAdress?.communityAreaName)],
        ["ZIP/Postal Code", capitalizeString(RAdress?.zipPostalCode)],
        ["Digital Address", capitalizeString(RAdress?.digitalAddress)]
      ];
      
      const fatherDetails = [
        ["Full Name Of Father", capitalizeString(fatherDetes?.fullNameOfFather)],
        ["Nationality", capitalizeString(fatherDetes?.nationality)],
        ["Is Father Alive", capitalizeString(fatherDetes?.isFatherAlive)]
      ];
      
      const fathersHometown = [
        ["Village/Town", capitalizeString(fatherHtown?.villageTown)],
        ["Region/Code", capitalizeString(fatherHtown?.regionCode)],
        ["District/State", capitalizeString(fatherHtown?.districtState)]
      ];
      
      const motherDetails = [
        ["Full Name Of Mother", capitalizeString(motherDetes?.fullNameOfMother)],
        ["Nationality", capitalizeString(motherDetes?.nationality)],
        ["Is Mother Alive", capitalizeString(motherDetes?.isMotherAlive)]
      ];
      
      const mothersHometown = [
        ["Village/Town", capitalizeString(motherHtown?.villageTown)],
        ["Region/Code", capitalizeString(motherHtown?.regionCode)],
        ["District/State", capitalizeString(motherHtown?.districtState)]
      ];
      
      const nextOfKin = [
        ["Next Of Kin", capitalizeString(NOK?.nextOfKin)],
        ["Address", capitalizeString(NOK?.address)]
      ];
      
      const verificationDocument = [
        ["Type", capitalizeString(verificationDoc?.type)],
        ["Document Number / NID", capitalizeString(verificationDoc?.documentNumberNid)],
        ["Date Issued", capitalizeString(verificationDoc?.dateIssued)]
      ];
      
      const contact = [
        ["Local Phone Number", capitalizeString(cont?.localPhoneNumber)]
      ];
      
      const institutionalIds = [
        ["Voter's ID Number", capitalizeString(IIds?.votersIdNumber)],
        ["Date Issued", capitalizeString(IIds?.dateIssued)]
      ];
      
      const criminalRecord: any[] = Crec?.map((record: any) => {
        return [
          ["Arrest Date", capitalizeString((new Date(record?.arrestDate)).toDateString())],
          ["Arresting Officer", capitalizeString(record?.arrestingOfficer)],
          ["Criminal Record ID", capitalizeString(record?.criminalRecordId)],
          ["Offence Type", capitalizeString(record?.offenceTypee)],
          ["Person ID", capitalizeString(record?.personId)],
          ["Sentence Length (Months)", capitalizeString(record?.sentenceLengthMonths)]
        ];
      });
      
      const fvlcoinzationResultsDetes = [
        ["Date", capitalizeString(date)],
        ["Time Elapsed", capitalizeString(`${formatTime(timeElapsed)}`)],
        ["Status", capitalizeString(status)],
        ["Type", "Video"],
        ["Accuracy", capitalizeString(`${accuracy.toFixed(4)}%`)]
      ];
      

    if(criminalRecord){
        criminalRecord.length = 1
    }

    const waitForAllImagesToLoad = () => {
        const images = document.querySelectorAll("img");
        let loadedCount = 0;
    
        if (images?.length === 0) {
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
                                data={nextOfKin}
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
                        criminalRecord?.length &&
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