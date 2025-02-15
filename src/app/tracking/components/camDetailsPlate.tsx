'use client'

import { getRelativeTime } from "@/utils/getDate"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaLocationArrow, FaVideo } from "react-icons/fa6"
import { IoPin } from "react-icons/io5"
import { MdOutlineShareLocation } from "react-icons/md"
import { ICamDetailsPlate, ICamDetilasPersonDataType } from "./types"
import Pressable from "@components/button/pressable"
import DvlaRecord from "@components/records/dvlaRecord/dvlaRecord"
import { useEffect, useState } from "react"
import { protectedAPI } from "@/utils/api/api"

const privateApi = new protectedAPI()

const CamDetailsPlate = ({
    plateData
} : {
    plateData? : ICamDetailsPlate
}) => {
    const [showDvlaRecord, setShowDvlaRecord] = useState(false)
    const [dvlaRecord, setDvlaRecord] = useState<{state?:'loading', data?:any}>()

    const fetchDvlaRecord = async () => {
        if(plateData?.numberPlate){
            setDvlaRecord({state:'loading'})
            const getRecord = await privateApi.get("/dvlarecords/getDvlaRecord", {plateNumber:plateData?.numberPlate})
            const record = getRecord?.data
            setDvlaRecord({data:record, state:undefined})
        }
    }

    useEffect(()=>{
        fetchDvlaRecord()
    },[plateData])
    return (
        <>
            <DvlaRecord 
                display={showDvlaRecord}
                setDisplay={setShowDvlaRecord}
                loading={dvlaRecord?.state==='loading' ? true : false}
                data={dvlaRecord?.data}
            />
            <div className="flex flex-col gap-0 rounded-lg overflow-auto border-solid border-[1px] border-bg-secondary py-2 px-3 bg-gradient-container-md">
                <div className="w-fit ">
                    <Pressable
                        onClick={()=>setShowDvlaRecord(true)}
                    >
                        <Text
                            textColor={theme.colors.main.primary}
                            className="hover:!underline !opacity-[1] hover:!opacity-[.5] duration-200 cursor-pointer"
                        >
                            See Dvla Details...
                        </Text>
                    </Pressable>
                </div>
                <table className="w-full">
                    <tbody>
                        <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                            <td className="py-1"><Text>Number Plate:</Text></td>
                            <td>
                                <Text textColor={theme.colors.text.primary}>
                                {plateData?.numberPlate}
                                </Text>
                            </td>
                        </tr>
                        <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                            <td className="py-1"><Text>Last seen:</Text></td>
                            <td>
                                <Text textColor={theme.colors.text.primary}>
                                {plateData?.time &&
                                    getRelativeTime(plateData.time).charAt(0).toUpperCase() +
                                    getRelativeTime(plateData.time).slice(1)}
                                </Text>
                            </td>
                        </tr>
                        <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                            <td className="py-1"><Text>Location:</Text></td>
                            <td>
                                <Text textColor={theme.colors.text.primary}>
                                {plateData?.lastSeen}
                                </Text>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1"><Text>Coordinates:</Text></td>
                            <td>
                                <Text textColor={theme.colors.text.primary}>
                                {plateData?.coordinates &&
                                    `${plateData.coordinates[0]}, ${plateData.coordinates[1]}`}
                                </Text>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* <div className="w-full py-2 px-3 gap-2 bg-gradient-container-md flex flex-col">
                    <div className="flex gap-1 items-center">
                        <Text>
                            Number Plate
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;{plateData?.numberPlate}
                            </Text>
                        </Text>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Text>
                            Last seen •
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;{plateData?.time && getRelativeTime(plateData?.time).charAt(0).toUpperCase() + getRelativeTime(plateData.time).slice(1)}
                            </Text>
                        </Text>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Text>
                            Location •
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;{plateData?.lastSeen}
                            </Text>
                        </Text>
                    </div>
                    <div className="flex gap-1 items-center">
                        <Text>
                            Coordinates •
                            <Text textColor={theme.colors.text.primary}>
                                &nbsp;{plateData?.coordinates && `${plateData.coordinates[0]}, ${plateData.coordinates[1]}`}
                            </Text>
                        </Text>
                    </div>
                </div> */}
            </div>
        </>
    )
}
export default CamDetailsPlate