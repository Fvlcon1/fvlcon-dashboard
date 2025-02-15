import Divider from "@components/divider/divider"
import OverlayWindow from "@components/window/overlayWindow"
import Text from "@styles/components/text"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { Dispatch, SetStateAction, useState } from "react"
import List from "../components/list"
import Container from "../components/container"
import Image from "next/image"
import ZoomImage from "@components/zoomImage/zoomImage"
import NoData from "@components/NoData/noData"
import InfinityLoader from "@components/loaders/infinityLoader"

const DvlaRecord = ({
    display, 
    setDisplay,
    data,
    loading
} : {
    display : boolean, 
    setDisplay : Dispatch<SetStateAction<boolean>>
    data? : any,
    loading? : boolean
}) => {
    const [zoom, setZoom] = useState(false)
    const {
        axleLoad : aload,
        customs : cust, 
        engine : eng, 
        licensingAuth : lauth, 
        other : oth, 
        particularsOfAgent : poagent, 
        particularsOfVehicle : povehicle,
        peronelDetails : personDetes,
        vehicleMeasurement : vmeasurement,
        agentImageUrl,
        driverImageUrl
    } = data ?? {}
    const personDetails = [
        ["Telephone number", personDetes?.phone],
        ["Email", personDetes?.email],
        ["TIN", personDetes?.TIN],
        ["Driver License/Passport No", personDetes?.licenseOrPassportNumber],
        ["Occupation", personDetes?.occupation],
    ]
    const agentDetails = [
        ["Full name of agent(s)", poagent?.fullname],
        ["Postal address", poagent?.address],
        ["Residential/Postal address", poagent?.residentialAddress],
        ["Telephone number", poagent?.phone],
        ["Email", poagent?.email],
        ["TIN", poagent?.tin],
        ["Driver License/Passport number", poagent?.licenseOrPassportNumber],
        ["Occupation", poagent?.occupation],
    ]  
    const particularsOfVehicle1 = [
        ["Chasis number",  povehicle?.chasisNumber],
        ["Vehicle maker or builder",  povehicle?.vehicleMakerOrBuilder],
        ["Body type (or style)",  povehicle?.bodyType],
        ["Number of axies",  povehicle?.numberOfAxies],
        ["Number of tyres (Excluding spares)",  povehicle?.numberOfTyres],
    ]  
    const particularsOfVehicle2 = [
        ["Year of manufacture",  povehicle?.yearOfManufacture],
        ["Model name / number",  povehicle?.modelNameOrNumber],
        ["Color(s)",  povehicle?.colors],
        ["Country of importation",  povehicle?.countryOfImportation],
        ["Vehicle use",  povehicle?.vehicleUse],
    ]  
    const measurement = [
        ["length",  vmeasurement?.length],
        ["width",  vmeasurement?.width],
        ["height",  vmeasurement?.height],
    ]  
    const filledByLicensingAuthority1 = [
        ["Gross vehicle weight (kg)",  lauth?.grossVehicleWeight],
        ["Net vehicle weight (kg)",  lauth?.grossVehicleWeight],
    ]  
    const filledByLicensingAuthority2 = [
        ["Permissible loading capacity (kg)",  lauth?.permissibleLoadingCapacity],
    ]
    const permissibleAxleLoad = [
        ["Front",  aload?.front],
        ["Middle",  aload?.middle],
        ["Rear",  aload?.rear],
    ]
    const engine1 = [
        ["Make",  eng?.make],
        ["Number of cylinders",  eng?.numberOfCylinders],
        ["Fuel type",  eng?.fuelType],
    ]
    const engine2 = [
        ["Engine number",  eng?.engineNumber],
        ["Horse power",  eng?.horsePower],
    ]
    const other1 = [
        ["Vehicle classification code",  oth?.vehicleClassification],
    ]
    const other2 = [
        ["Date",  (new Date(oth?.vehicleClassification)).toDateString()],
    ]
    const customs1 = [
        ["Customs declaration number",  cust?.customsDeclarationNumber],
        ["Date",  (new Date(cust?.date)).toDateString()],
    ]
    const customs2 = [
        ["Receipt number",  cust?.receiptNumber],
        ["Date",  (new Date(cust?.receiptDate)).toDateString()],
        ["Amount (GHS)",  cust?.amount],
    ]
    return (
        <OverlayWindow
            title="DVLA record, Ghana"
            display={display}
            setDisplay={setDisplay}
            windowStyle="!h-[90%] !w-[40%] !min-w-[700px]"
        >
            <ZoomImage
                setShow={setZoom}
                show={zoom}
                imageURL={require('@/assets/dev/mahama.png')} 
            />
            {
                data && Object.keys(data).length &&
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
            }
            {
                data && Object.keys(data).length ?
                <div className="w-full p-8 flex flex-col gap-6">
                    <div className="w-full flex justify-between gap-2 items-center">
                        <div className="flex gap-3 items-center">
                            <div className="h-[100px] w-[100px] rounded-full bg-bg-quantinary relative overflow-hidden">
                                <Image
                                    alt="img"
                                    fill
                                    className="hoverscale-[1.3] duration-300 object-cover cursor-pointer"
                                    src={driverImageUrl}
                                    onClick={()=>setZoom(prev => !prev)}
                                />
                            </div>
                            <div className="flex flex-col gap-0">
                                <Text
                                    size={TypographySize.HM}
                                    textColor={theme.colors.text.primary}
                                >
                                    {personDetes?.fullname}
                                </Text>
                                <Text>
                                    {personDetes?.pobox}
                                </Text>
                                <Text>
                                    {personDetes?.address}
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
                                    src={agentImageUrl}
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
                : loading?
                <div className="w-full h-full flex justify-center items-center">
                    <InfinityLoader />
                </div>
                :
                <div className="w-full h-full flex justify-center items-center">
                    <NoData />
                </div>
            }
        </OverlayWindow>
    )
}
export default DvlaRecord