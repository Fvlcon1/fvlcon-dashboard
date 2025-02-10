'use client'

import Divider from "@components/divider/divider"
import OverlayWindow from "@components/window/overlayWindow"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Fragment, useContext, useEffect, useRef, useState } from "react"
import List from "../components/list"
import Container from "../components/container"
import Image from "next/image"
import ZoomImage from "@components/zoomImage/zoomImage"
import getDate from "@/utils/getDate"
import { FaDownload, FaPrint } from "react-icons/fa6"
import ClickableTab from "@components/clickable/clickabletab"
import { message, Tooltip } from "antd"
import { componentToPdfDownload } from "@/utils/componentToPdfDownload"
import { FvlconizationLogsTypes } from "@/app/activityLog/fvlconizationLogs/components/fvlconizationLogs.types"
import { useReactToPrint } from "react-to-print"
import NiaDownloadableRecord from "./niaDownloadableRecord"
import Link from "next/link"
import { HomeContext } from "@/app/dashboard/home/context/homeContext"
import Modal from "@components/modal/modal"
import Input from "@components/input/input"

const NiaRecord = ({
    visible,
    setVisible,
    data,
    faceId,
    croppedImage,
    boundedImage
} : {
    visible : boolean,
    setVisible : React.Dispatch<React.SetStateAction<boolean>>
    data? : any,
    faceId? : string
    croppedImage : string
    boundedImage : string
}) => {
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

    const statelessFilename = `${personDetails[1][1]}${personDetails[0][1]}${(new Date()).toISOString()}`
    
    const [showDownloadableComponent, setShowDownloadableComponent] = useState(false);
    const [showDownloadableComponentToPrint, setShowDownloadableComponentToPrint] = useState(false);
    const { FvlconizationlogId } = useContext(HomeContext)
    const refobj = useRef<HTMLDivElement>(null);
    const [showFilenameContainer, setShowFilenameContainer] = useState(false)
    const [filename, setFilename] = useState(statelessFilename)

    const reactToPrintFn = useReactToPrint({
        contentRef : refobj,
        documentTitle: "Fvlconization-log",
        onAfterPrint: () => {
            setShowDownloadableComponentToPrint(false);
        },
        onPrintError: (error : any) => {
            setShowDownloadableComponentToPrint(false);
            message.error(error.message);
        },
        onBeforePrint : async ()=> setShowDownloadableComponentToPrint(false)
    });

    const handlePdfDownload = () => {
        setFilename(statelessFilename)
        window.open(`/printable/fvlconizationResult/${FvlconizationlogId}?faceId=${faceId}&action=download&filename=${filename}`, "_blank")
    };

    const handlePrint = () => {
        setShowDownloadableComponentToPrint(true);
    };

    const downloadPdf = async () => {
        try {
            setTimeout(async () => {
            await componentToPdfDownload(refobj, 1);
            setShowDownloadableComponent(false);
            }, 2000);
        } catch (error) {
            console.log({ error });
            setShowDownloadableComponent(false);
        }
    };

    useEffect(() => {
        if (showDownloadableComponent) {
            downloadPdf();
        }
    }, [showDownloadableComponent]);

    useEffect(() => {
        if (showDownloadableComponentToPrint) {
            setTimeout(() => {
                try {
                    reactToPrintFn();
                } catch (error: any) {
                    console.log({ error });
                    message.error(error.message);
                }
            }, 2000);
        }
    }, [showDownloadableComponentToPrint]);
    
    return (
        <OverlayWindow
            title="NIA record, Ghana"
            display={visible}
            setDisplay={setVisible}
            windowStyle="!h-[90%] !w-[40%] !min-w-[700px]"
            icons={[
                <Tooltip 
                    key='Download'
                    title="Download"
                >
                    <ClickableTab>
                        <FaDownload
                            color={theme.colors.text.primary}
                            size={12}
                            className="hover:scale-125 duration-200 opacity-50 hover:opacity-100"
                            onClick={()=>setShowFilenameContainer(true)}
                        />
                    </ClickableTab>
                </Tooltip>,
                <Tooltip 
                    key='Print' 
                    title="Print"
                >
                    <Link
                        href={`/printable/fvlconizationResult/${FvlconizationlogId}?faceId=${faceId}`}
                        target="_blank"
                    >
                        <ClickableTab>
                            <FaPrint
                                color={theme.colors.text.primary}
                                size={12}
                                className="hover:scale-125 duration-200 opacity-50 hover:opacity-100"
                            />
                        </ClickableTab>
                    </Link>
                </Tooltip>
            ]}
        >
            {
                <Modal 
                    display={showFilenameContainer}
                    setDisplay={setShowFilenameContainer}
                    onOkayClick={handlePdfDownload}
                    onCancel={()=>setFilename(statelessFilename)}
                    okayButtonText="Download"
                    title="Enter filename"
                >
                    <Input 
                        content={filename}
                        setContent={setFilename}
                        className="!rounded-md"
                        placeholder={`${personDetails[1][1]}${personDetails[0][1]}${(new Date()).toISOString()}`}
                        autofocus
                        required
                        autoSelect
                    />
                </Modal>
            }
            {(showDownloadableComponent || showDownloadableComponentToPrint) &&
                <NiaDownloadableRecord 
                    ref={refobj} 
                    data={data}
                    croppedImage={croppedImage}
                    boundedImage={boundedImage}
                />
            }
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={zoomImage} 
            />
            <div className="fixed top-0 left-0 w-full flex h-full justify-center items-center opacity-[0.02] pointer-events-none">
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
                <div className="w-full p-8 flex flex-col gap-6">
                    <div className="w-full flex justify-between gap-2 items-center">
                        <div className="flex gap-3 items-center">
                            <div className="h-[100px] w-[100px] rounded-full bg-bg-quantinary relative overflow-hidden">
                                <Image
                                    alt="img"
                                    fill
                                    className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                    src={imageUrl ?? ''}
                                    onClick={()=>{
                                        setZoomImage(imageUrl)
                                        setZoom(prev => !prev)
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-0">
                                <Text
                                    size={TypographySize.HM}
                                    textColor={theme.colors.text.primary}
                                >
                                    {`${personDetes.surname} ${personDetes.forenames}`}
                                </Text>
                                <Text>
                                    {`${RAdress?.zipPostalCode ?? ''}`}
                                </Text>
                                <Text>
                                    {`${RAdress?.communityAreaName ? `${RAdress?.communityAreaName},` : ''} ${RAdress?.villageTown ?? ''}`}
                                </Text>
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
                    <Container 
                        title="Application Details"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={applicationDetails}
                                evenBg={theme.colors.bg.secondary}
                            />
                        </div>
                    </Container>

                    <Container 
                        title="Personal Details"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={personDetails}
                                evenBg={theme.colors.bg.secondary}
                                first={4}
                            />
                            <List 
                                data={personDetails}
                                evenBg={theme.colors.bg.secondary}
                                last={4}
                            />
                        </div>
                    </Container>

                    <Container 
                        title="Birth Details"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={birthDetails}
                                evenBg={theme.colors.bg.secondary}
                                first={3}
                            />
                            <List 
                                data={birthDetails}
                                evenBg={theme.colors.bg.secondary}
                                last={3}
                            />
                        </div>
                        <Divider />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Place of birth
                            </Text>
                            <div className="w-full flex gap-2">
                                <List 
                                    data={placeOfBirth}
                                    evenBg={theme.colors.bg.secondary}
                                    first={2}
                                />
                                <List 
                                    data={placeOfBirth}
                                    evenBg={theme.colors.bg.secondary}
                                    last={2}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                Hometown
                            </Text>
                            <div className="w-full flex gap-2">
                                <List 
                                    data={hometown}
                                    evenBg={theme.colors.bg.secondary}
                                    first={2}
                                />
                                <List 
                                    data={hometown}
                                    evenBg={theme.colors.bg.secondary}
                                    last={2}
                                />
                            </div>
                        </div>
                    </Container>

                    <Container 
                        title="Occupation"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={occupation}
                                evenBg={theme.colors.bg.secondary}
                            />
                        </div>
                    </Container>

                    <Container 
                        title="Residential Address"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={residentialAddress}
                                evenBg={theme.colors.bg.secondary}
                                first={3}
                            />
                            <List 
                                data={residentialAddress}
                                evenBg={theme.colors.bg.secondary}
                                last={3}
                            />
                        </div>
                    </Container>

                    <Container 
                        title="Applicants Parentage"
                    >
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {"Father's details"}
                            </Text>
                            <div className="w-full flex gap-2">
                                <List 
                                    data={fatherDetails}
                                    evenBg={theme.colors.bg.secondary}
                                    first={2}
                                />
                                <List 
                                    data={fatherDetails}
                                    evenBg={theme.colors.bg.secondary}
                                    last={2}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {"Father's hometown"}
                            </Text>
                            <div className="w-full flex gap-2">
                                <List 
                                    data={fathersHometown}
                                    evenBg={theme.colors.bg.secondary}
                                    first={2}
                                />
                                <List 
                                    data={fathersHometown}
                                    evenBg={theme.colors.bg.secondary}
                                    last={2}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {"Mother's details"}
                            </Text>
                            <div className="w-full flex gap-2">
                                <List 
                                    data={motherDetails}
                                    evenBg={theme.colors.bg.secondary}
                                    first={2}
                                />
                                <List 
                                    data={motherDetails}
                                    evenBg={theme.colors.bg.secondary}
                                    last={2}
                                />
                            </div>
                        </div>
                        <Divider />
                        <div className="w-full p-4 flex flex-col gap-2">
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {"Mother's hometown"}
                            </Text>
                            <div className="w-full flex gap-2">
                                <List 
                                    data={mothersHometown}
                                    evenBg={theme.colors.bg.secondary}
                                    first={2}
                                />
                                <List 
                                    data={mothersHometown}
                                    evenBg={theme.colors.bg.secondary}
                                    last={2}
                                />
                            </div>
                        </div>
                    </Container>

                    <Container 
                        title="Next of kin"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={NextOfKin}
                                evenBg={theme.colors.bg.secondary}
                            />
                        </div>
                    </Container>

                    <Container 
                        title="Verification document"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={verificationDocument}
                                evenBg={theme.colors.bg.secondary}
                                first={2}
                            />
                            <List 
                                data={verificationDocument}
                                evenBg={theme.colors.bg.secondary}
                                last={2}
                            />
                        </div>
                    </Container>

                    <Container 
                        title="Contact"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={contact}
                                evenBg={theme.colors.bg.secondary}
                            />
                        </div>
                    </Container>

                    <Container 
                        title="Instituitional Ids"
                    >
                        <div className="w-full p-4 flex gap-2">
                            <List 
                                data={institutionalIds}
                                evenBg={theme.colors.bg.secondary}
                            />
                        </div>
                    </Container>

                    {
                        criminalRecord.length &&
                        <Container 
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
                                                <List 
                                                    data={record}
                                                    evenBg={theme.colors.bg.secondary}
                                                    first={3}
                                                />
                                                <List 
                                                    data={record}
                                                    evenBg={theme.colors.bg.secondary}
                                                    last={3}
                                                />
                                            </div>
                                        </div>
                                        <Divider />
                                    </Fragment>
                                ))
                            }
                        </Container>
                    }
                </div>
            }
        </OverlayWindow>
    )
}
export default NiaRecord