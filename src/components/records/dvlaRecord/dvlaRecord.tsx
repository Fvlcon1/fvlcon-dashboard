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
                imageURL={require('@/assets/dev/image1.png')} 
            />
            <div className="w-full p-8 flex flex-col gap-6">
                <div className="w-full flex justify-between gap-2 items-center">
                    <div className="flex gap-3 items-center">
                        <div className="h-[100px] w-[100px] rounded-full bg-bg-quantinary relative overflow-hidden">
                            <Image
                                alt="img"
                                fill
                                className="hover:scale-[1.3] duration-300 object-cover cursor-pointer"
                                src={require('@/assets/dev/image1.png')}
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
                    <div className="flex gap-2 items-center">
                        <div className="h-[70px] w-[70px] rounded-full bg-bg-quantinary">

                        </div>
                        <div className="h-[70px] w-[70px] rounded-full bg-bg-quantinary">

                        </div>
                    </div>
                </div>
                <Divider />
                <List data={data}/>
                <Container 
                    title="Particulars of authorized agent"
                >
                    <div className="w-full p-4 flex gap-2">
                        <div className="w-[150px] h-[150px] bg-bg-secondary rounded-lg">

                        </div>
                        <List 
                            data={data}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>

                <Container 
                    title="Particulars of authorized agent (According to manufacture's specification)"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={data}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={data}
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
                            data={data}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>

                <Container 
                    title="Filled by licensing authority"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={lessData}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={lessData}
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
                            data={lessData}
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
                                data={lessData}
                                evenBg={theme.colors.bg.secondary}
                            />
                            <List 
                                data={lessData}
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
                            data={lessData}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={lessData}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>

                <Container 
                    title="Customs"
                >
                    <div className="w-full p-4 flex gap-2">
                        <List 
                            data={lessData}
                            evenBg={theme.colors.bg.secondary}
                        />
                        <List 
                            data={lessData}
                            evenBg={theme.colors.bg.secondary}
                        />
                    </div>
                </Container>
            </div>
        </OverlayWindow>
    )
}
export default DvlaRecord