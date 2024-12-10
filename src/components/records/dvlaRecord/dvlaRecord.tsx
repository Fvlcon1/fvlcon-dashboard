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

const DvlaRecord = () => {
    const [zoom, setZoom] = useState(false)
    const [display, setDisplay] = useState(true)
    const personDetails = [
        ["Telephone number", "059134990"],
        ["Email", "princenedjoh5@gmail.com"],
        ["TIN", "4490"],
        ["Driver License/Passport No", "990242344"],
        ["Occupation", "Investor"],
        ["Owner's signature", "kjdflkgjdf"],
    ]
    const agentDetails = [
        ["Full name of agent(s)", "Abigail Botwe"],
        ["Postal address", "P.O. Box 123, Accra, Ghana"],
        ["Residential/Postal address", "No. 45 Independence Avenue, Accra, Ghana"],
        ["Telephone number", "+233 24 123 4567"],
        ["Email", "abbotwe883@example.com"],
        ["TIN", "GHTIN123456789"],
        ["Driver License/Passport number", "GHA-P12345678"],
        ["Occupation", "Real Estate Investor"],
    ]  
    const particularsOfVehicle1 = [
        ["Chasis number",  "1HGCM82633A123456"],
        ["Vehicle maker or builder",  "Mercedes"],
        ["Body type (or style)",  "Coupe"],
        ["Number of axies",  "4"],
        ["Number of tyres (Excluding spares)",  "4"],
    ]  
    const particularsOfVehicle2 = [
        ["Year of manufacture",  "2020"],
        ["Model name / number",  "C350"],
        ["Color(s)",  "Black"],
        ["Country of importation",  "USA"],
        ["Vehicle use",  "Private"],
    ]  
    const measurement = [
        ["Length",  "2490"],
        ["width",  "1340"],
        ["height",  "1900"],
    ]  
    const filledByLicensingAuthority1 = [
        ["Gross vehicle weight (kg)",  "1HGCM82633A123456"],
        ["Net vehicle weight (kg)",  "Mercedes"],
    ]  
    const filledByLicensingAuthority2 = [
        ["Permissible loading capacity (kg)",  "2020"],
    ]
    const permissibleAxleLoad = [
        ["Front",  "2490"],
        ["Middle",  "1340"],
        ["Rear",  "1900"],
    ]
    const engine1 = [
        ["Make",  "24RIKJ86FHJ"],
        ["Number of cylinders",  "2"],
        ["Fuel type",  "Diesel"],
    ]
    const engine2 = [
        ["Engine number",  "2490"],
        ["Horse power",  "4000"],
    ]
    const other1 = [
        ["Vehicle classification code",  "1HGCM82633A123456"],
        ["Signiature",  "sds9ugasdgjh03r__ege"],
    ]
    const other2 = [
        ["Date",  (new Date('9-30-22')).toDateString()],
    ]
    const customs1 = [
        ["Customs declaration number",  "1HGCM82633A123456"],
        ["Date",  (new Date('9-30-22')).toDateString()],
    ]
    const customs2 = [
        ["Receipt number",  "SSDG6787686"],
        ["Date",  (new Date('9-30-22')).toDateString()],
        ["Amount (GHS)",  "500"],
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
            display={display}
            setDisplay={setDisplay}
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
                                src={require('@/assets/dev/mahama.png')}
                                onClick={()=>setZoom(prev => !prev)}
                            />
                        </div>
                        <div className="flex flex-col gap-0">
                            <Text
                                size={TypographySize.HM}
                                textColor={theme.colors.text.primary}
                            >
                                John Dramani Mahama
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
                        <div className="h-[70px] w-[73px] relative mt-[5px]">
                            <Image
                                alt="img"
                                fill
                                className="duration-300 object-cover cursor-pointer"
                                src={require('@/assets/dev/dvla-logo.png')}
                            />
                        </div>
                    </div>
                </div>
                <Divider />
                <List data={personDetails}/>
                <Container 
                    title="Particulars of authorized agent"
                >
                    <div className="w-full p-4 flex gap-2">
                        <div className="h-[190px] w-[190px] rounded-lg bg-bg-quantinary relative overflow-hidden">
                            <Image
                                alt="img"
                                fill
                                className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                src={require('@/assets/dev/agent.png')}
                                onClick={()=>setZoom(prev => !prev)}
                            />
                        </div>
                        <List 
                            data={agentDetails}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>

                <Container 
                    title="Particulars of vehicle (According to manufacture's specification)"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={particularsOfVehicle1}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={particularsOfVehicle2}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                    <Divider />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            Measurement (cm)
                        </Text>
                        <List 
                            data={measurement}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>

                <Container 
                    title="Filled by licensing authority"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={filledByLicensingAuthority1}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={filledByLicensingAuthority2}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                    <Divider />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            Permissible axle load (kg)
                        </Text>
                        <List 
                            data={permissibleAxleLoad}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                    <Divider />
                    <div className="w-full p-4 flex flex-col gap-2">
                        <Text
                            textColor={theme.colors.text.primary}
                        >
                            Engine
                        </Text>
                        <div className="w-full flex gap-2">
                            <List 
                                data={engine1}
                                evenBg={theme.colors.bg.secondary}
                            />
                            <List 
                                data={engine2}
                                evenBg={theme.colors.bg.secondary}
                            />
                        </div>
                    </div>
                </Container>

                <Container 
                    title="Other"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={other1}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={other2}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>

                <Container 
                    title="Customs"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={customs1}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={customs2}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>
            </div>
        </OverlayWindow>
    )
}
export default DvlaRecord