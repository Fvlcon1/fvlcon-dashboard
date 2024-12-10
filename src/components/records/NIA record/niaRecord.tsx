import Divider from "@components/divider/divider"
import OverlayWindow from "@components/window/overlayWindow"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useState } from "react"
import List from "../components/list"
import Container from "../components/container"
import Image from "next/image"
import ZoomImage from "@components/zoomImage/zoomImage"

const NiaRecord = ({
    visible,
    setVisible
} : {
    visible : boolean,
    setVisible : React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [zoom, setZoom] = useState(false)
    const applicationDetails = [
        ["Type of application", "Citizen"],
        ["Type of Request", "Issuance"],
        ["Date of Application", (new Date("09-09-24")).toDateString()],
        ["Interviewer NID number", "GHA-712172562-7"],
        ["Registration centre number", "030432001"]
    ]
    const personDetails1 = [
        ["Surname", "Nedjoh"],
        ["Forenames", "Prince Edem"],
        ["Maiden or previous names", ""],
        ["Height", "172"],
    ]
    const personDetails2 = [
        ["Colour of eyes", "Brown"],
        ["Colour of hair", "Black"],
        ["Disability code", "001"],
        ["Level of education", "Tetiary"],
    ]
    const birthDetails1 = [
        ["Birth Certificate number", "040701-2236-2023"],
        ["Date issued", (new Date(11-8-23)).toDateString()],
        ["Date of birth", (new Date(6-5-2002)).toDateString()],
    ]
    const birthDetails2 = [
        ["Nationality at birth", "GHA"],
        ["Current nationality", "GHA"],
    ]
    const placeOfBirth = [
        ["Village/town", "Kpando"],
        ["Region code", "004"],
        ["District/State", "441"]
    ]
    const hometown = [
        ["Village/town", "Kpando"],
        ["Region code", "004"],
        ["District/State", "441"]
    ]
    const occupation = [
        ["Occupation", "9002"]
    ]
    const residentialAddress1 = [
        ["Village/town", "Lebanon"],
        ["Region/Country", "003"],
        ["District/State", "303"],
    ]
    const residentialAddress2 = [
        ["Community area name", "Zone 3"],
        ["ZIP/Postal code", "GB 065"],
        ["Digital Address", "GB-089-3782"]
    ]
    const fatherDetails = [
        ["Full name of father", "Nedjoh Christopher"],
        ["Nationality", "GHA"],
        ["Is father alive", "Yes"]
    ]
    const fathersHometown = [
        ["Village/town", "Anfoega"],
        ["Region/code", "004"],
        ["District/State", "441"],
    ]
    const motherDetails = [
        ["Full name of father", "Grace Christopher"],
        ["Nationality", "GHA"],
        ["Is Mother alive", "Yes"]
    ]
    const mothersHometown = [
        ["Village/town", "Kpando"],
        ["Region/code", "004"],
        ["District/State", "441"],
    ]
    const NextOfKin = [
        ["Next of kin", "Nedjoh Christopher (Father)"],
        ["Address", "0203398484, Ashiaman"]
    ]
    const verificationDocument = [
        ["type",  "Birth certificate"],
        ["Document number / NID",  "04070-2236-2023"],
        ["Date issued",  (new Date("7-18-20")).toDateString()],
    ]
    const contact = [
        ["Local phone number",  "0204459845"],
    ] 
    const institutionalIds = [
        ["Voter's Id number",  "2481010394"],
        ["Date issued",  (new Date("7-18-20")).toDateString()],
    ]
    return (
        <OverlayWindow
            title="NIA record, Ghana"
            display={visible}
            setDisplay={setVisible}
            windowStyle="!h-[90%]"
        >
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={require('@/assets/dev/mahama.png')} 
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
            <div className="w-full p-8 flex flex-col gap-6">
                <div className="w-full flex justify-between gap-2 items-center">
                    <div className="flex gap-3 items-center">
                        <div className="h-[100px] w-[100px] rounded-full bg-bg-quantinary relative overflow-hidden">
                            <Image
                                alt="img"
                                fill
                                className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                src={require('@/assets/dev/profile1.jpg')}
                                onClick={()=>setZoom(prev => !prev)}
                            />
                        </div>
                        <div className="flex flex-col gap-0">
                            <Text
                                size={TypographySize.HM}
                                textColor={theme.colors.text.primary}
                            >
                                Prince Edem Nedjoh
                            </Text>
                            <Text>
                                P.O. Box 2990
                            </Text>
                            <Text>
                                North Canashie, Accra
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
                    title="Person Details"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={personDetails1}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={personDetails2}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>

                <Container 
                    title="Birth Details"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={birthDetails1}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={birthDetails2}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                    <Divider />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            Place of birth
                        </Text>
                        <List 
                            data={placeOfBirth}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                    <Divider />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            Hometown
                        </Text>
                        <List 
                            data={hometown}
                            evenBg={theme.colors.bg.secondary}
                        />
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
                            data={residentialAddress1}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={residentialAddress2}
                            evenBg={theme.colors.bg.secondary}
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
                        <List 
                            data={fatherDetails}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                    <Divider />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            {"Father's hometown"}
                        </Text>
                        <List 
                            data={fathersHometown}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                    <Divider />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            {"Mother's details"}
                        </Text>
                        <List 
                            data={motherDetails}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                    <Divider />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            {"Mother's hometown"}
                        </Text>
                        <List 
                            data={mothersHometown}
                            evenBg={theme.colors.bg.secondary}
                        />
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
            </div>
        </OverlayWindow>
    )
}
export default NiaRecord