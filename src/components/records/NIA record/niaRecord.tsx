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
    const personDetails = [
        ["Surname", "Nedjoh"],
        ["Forenames", "Prince Edem"],
        ["Maiden or previous names", ""],
        ["Height", "172"],
        ["Colour of eyes", "Brown"],
        ["Colour of hair", "Black"],
        ["Disability code", "001"],
        ["Level of education", "Tetiary"],
    ]
    const birthDetails = [
        ["Birth Certificate number", "040701-2236-2023"],
        ["Date issued", (new Date(11-8-23)).toDateString()],
        ["Date of birth", (new Date(6-5-2002)).toDateString()],
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
    const ocupation = [
        ["Occupation", "9002"]
    ]
    const residentialAddress = [
        ["Village/town", "Lebanon"],
        ["Region/Country", "003"],
        ["District/State", "303"],
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
        ["Nedjoh Christopher"],
        ["Address", "0203398484, Ashiaman"]
    ]

    const data = [
        ["Telephone number", "059134990"],
        ["Email", "princenedjoh5@gmail.com"],
        ["TIN", "4490"],
        ["Driver License/Passport No", "990242344"],
        ["Occupation", "Investor"],
        ["Owner's signature", "kjdflkgjdf"],
    ]
    const lessData = [
        ["Telephone number", "059134990"],
        ["Email", "princenedjoh5@gmail.com"],
        ["TIN", "4490"],
    ]
    return (
        <OverlayWindow
            title="DVLA record, Ghana"
            display={visible}
            setDisplay={setVisible}
            windowStyle="!h-[90%]"
        >
            <div className="w-full p-8 flex flex-col gap-6">
                <div className="w-full flex justify-center">
                    <div className="h-[100px] w-[100px] rounded-full bg-bg-quantinary relative overflow-hidden">
                        <Image
                            alt="img"
                            fill
                            className="hover:scale-[1.3] duration-300 object-cover cursor-pointer"
                            src={require('@/assets/dev/image1.png')}
                            onClick={()=>setZoom(prev => !prev)}
                        />
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
                            data={personDetails}
                            evenBg={theme.colors.bg.secondary}
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
            </div>
        </OverlayWindow>
    )
}
export default NiaRecord