import Divider from "@components/divider/divider"
import Overlay from "@components/overlay/overlay"
import Window from "@components/window/window"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { AnimatePresence } from "framer-motion"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import Required from "./required"
import Input from "@components/input/input"
import CamInput from "./camInput"
import Header from "./header"
import FormItem from "./formItem"
import Button from "@components/button/button"
import { liveContext } from "@/context/live"

const AddCam = ({
    display, 
    setDisplay
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
}) => {
    const [camURL, setCamURL] = useState('')
    const [cameraName, setCameraName] = useState('')
    const [cameraIP, setCameraIP] = useState('')
    const [port, setPort] = useState('')
    const [locationName, setLocationName] = useState('')
    const [resolution, setResolution] = useState('')
    const [streamType, setStreamType] = useState('')
    const [bitrate, setBitrate] = useState('')
    const [protocol, setProtocol] = useState('')
    const [fps, setFps] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [manufaturer, setManufacturer] = useState('')
    const [cameraModel, setCameraModel] = useState('')
    const [firmwareVersion, setFirmwareVersion] = useState('')
    const {
        activeCameras, 
        setActiveCameras,
        folders,
        setFolders
    } = useContext(liveContext)

    const handleSubmit = () => {
        setDisplay(false)
        setActiveCameras(prev => [...prev, 1])
    }
    return (
        <AnimatePresence>
            {
                display &&
                    <Overlay
                        onClick={()=>setDisplay(false)}
                    >
                        <Window
                            open={display}
                            setOpen={setDisplay}
                            title="Add Cam"
                        >
                            <Flex
                                padding="20px"
                                direction="column"
                                gap={20}
                            >
                                <Header
                                    title="Add Camera"
                                    description="Camera addition and configuration"
                                />
                                <Flex
                                    padding="0 8px 0 0"
                                >
                                    <div className="w-full flex gap-2 bg-[#3279a80c] py-4 p-4 rounded-lg items-center border-[1px] border-solid border-[#3279a82a]">
                                        <AppTypography>
                                            Areas marked as
                                        </AppTypography>
                                        <Required />
                                        <AppTypography>
                                            should be filled
                                        </AppTypography>
                                    </div>
                                </Flex>
                                <Flex
                                    padding="8px"
                                    direction="column"
                                    gap={20}
                                >
                                    <FormItem 
                                        title="Camera URL"
                                        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                        value={camURL}
                                        setValue={setCamURL}
                                        placeholder="Input camera url Eg: rtsp://192.168.1.7:554/Streaming/Channel/1"
                                        required
                                    />
                                    <FormItem 
                                        title="Camera Name"
                                        value={cameraName}
                                        setValue={setCameraName}
                                    />
                                    <FormItem 
                                        title="Camera Public IP"
                                        value={cameraIP}
                                        setValue={setCameraIP}
                                        required
                                    />
                                    <FormItem 
                                        title="Port"
                                        value={port}
                                        setValue={setPort}
                                        required
                                    />
                                    <FormItem 
                                        title="Location Name"
                                        value={locationName}
                                        setValue={setLocationName}
                                    />
                                </Flex>

                                <Header 
                                    title="Media Stream Attributes"
                                    description="Enter parameters for configuring the media stream"
                                />
                                <Flex
                                    padding="8px"
                                    direction="column"
                                    gap={20}
                                >
                                    <FormItem 
                                        title="Resolution"
                                        value={resolution}
                                        setValue={setResolution}
                                    />
                                    <FormItem 
                                        title="Stream Type"
                                        value={streamType}
                                        setValue={setStreamType}
                                    />
                                    <FormItem 
                                        title="Bitrate"
                                        value={bitrate}
                                        setValue={setBitrate}
                                    />
                                    <FormItem 
                                        title="Propocol"
                                        value={protocol}
                                        setValue={setProtocol}
                                    />
                                    <FormItem 
                                        title="Frames per second"
                                        value={fps}
                                        setValue={setFps}
                                    />
                                </Flex>

                                <Header 
                                    title="Credentials"
                                    description="Enter your login details"
                                />
                                <Flex
                                    padding="8px"
                                    direction="column"
                                    gap={20}
                                >
                                    <FormItem 
                                        title="Username"
                                        value={username}
                                        setValue={setUsername}
                                        required
                                    />
                                    <FormItem 
                                        title="Password"
                                        value={password}
                                        setValue={setPassword}
                                        required
                                    />
                                </Flex>

                                <Header 
                                    title="Camera Details"
                                />
                                <Flex
                                    padding="8px"
                                    direction="column"
                                    gap={20}
                                >
                                    <FormItem 
                                        title="Manufacturer"
                                        value={manufaturer}
                                        setValue={setManufacturer}
                                    />
                                    <FormItem 
                                        title="Camera Model"
                                        value={cameraModel}
                                        setValue={setCameraModel}
                                    />
                                    <FormItem 
                                        title="Firmware Version"
                                        value={firmwareVersion}
                                        setValue={setFirmwareVersion}
                                    />
                                </Flex>

                                <Flex
                                    justify="flex-end"
                                >
                                    <Button
                                        text="Add Camera"
                                        onClick={handleSubmit}
                                        className="!bg-bg-quantinary hover:!bg-bg-alt1"
                                    />
                                </Flex>
                            </Flex>
                        </Window>
                    </Overlay>
            }
        </AnimatePresence>
    )
}
export default AddCam