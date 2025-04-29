import Header from "./header"
import Required from "@/app/live/components/add cam/required"
import Overlay from "@components/overlay/overlay"
import OverlayWindow from "@components/window/overlayWindow"
import Window from "@components/window/window"
import Text from "@styles/components/text"
import { Radio } from "antd"
import { AnimatePresence } from "framer-motion"
import { Dispatch, SetStateAction, useState } from "react"
import AddWantedPeople from "./add-wanted-people"
import { CheckboxGroupProps } from "antd/es/checkbox"
import theme from "@styles/theme"
import AddWantedVehicle from "./add-wanted-vehicle"

export type Sections = "people" | "vehicle" | "suspicious activity"

const AddAlert = ({
    display, 
    setDisplay
} : {
    display : boolean,
    setDisplay : Dispatch<SetStateAction<boolean>>
}) => {
    const [section, setSection] = useState<Sections>("people")

    const handleSectionChange = (section : Sections) => {
        setSection(section)
    }

    const options: CheckboxGroupProps<Sections>['options'] = [
        { label: <Text textColor={section === "people" ? theme.colors.text.primary : ""}>People</Text>, value: 'people' },
        { label: <Text textColor={section === "vehicle" ? theme.colors.text.primary : ""}>Vehicle</Text>, value: 'vehicle' },
        { label: <Text textColor={section === "suspicious activity" ? theme.colors.text.primary : ""}>Suspicious Activity</Text>, value: 'suspicious activity' },
    ];
    
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
                            title="Add Alert"
                            className="!max-w-[800px] !h-fit !max-h-[90%]"
                        >
                            <div className="flex flex-col gap-6 p-6">
                                <Header
                                    title="Add Alert"
                                    description="Add an alert for people, vehicles and suspicious activities"
                                />
                                <div className="w-full flex gap-2 bg-[#3279a80c] py-4 p-4 rounded-lg items-center border-[1px] border-solid border-[#3279a82a]">
                                    <Text>
                                        Areas marked as
                                    </Text>
                                    <Required />
                                    <Text>
                                        should be filled
                                    </Text>
                                </div>
                                <Radio.Group
                                    block
                                    options={options}
                                    onChange={(e)=>handleSectionChange(e.target.value)}
                                    defaultValue={section}
                                    optionType="button"
                                    buttonStyle="solid"
                                    className="[&_.ant-radio-button-wrapper-checked]:!bg-main-primary"
                                />
                                {
                                    section === "people" ?
                                    <AddWantedPeople />
                                    :
                                    section === "vehicle" ?
                                    <AddWantedVehicle />
                                    : <></>
                                }
                            </div>
                        </Window>
                    </Overlay>
            }
        </AnimatePresence>
    )
}
export default AddAlert