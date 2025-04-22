import { getRelativeTime } from "@/utils/getDate"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { ICamDetilasPersonDataType } from "./types"
import NiaRecord from "@components/records/NIA record/niaRecord"
import { protectedAPI } from "@/utils/api/api"
import { useMutation } from "@tanstack/react-query"
import { getSingleFace } from "@/utils/model/getSingleFace"
import { useEffect, useState } from "react"
import Pressable from "@components/button/pressable"

const privateApi = new protectedAPI()

const CamDetailsPerson = ({
    personData
} : {
    personData : ICamDetilasPersonDataType
}) => {
    const [isNiaVisible, setIsNiaVisible] = useState(false)
    
    return (
        <>
            <NiaRecord 
                data={personData.niaDetails}
                visible={isNiaVisible}
                setVisible={setIsNiaVisible}
                croppedImage=""
                boundedImage=""
            />
            <div className="flex flex-col gap-0 rounded-lg overflow-auto border-solid border-[1px] border-bg-secondary py-2 px-3 bg-gradient-container-md">
                {
                    personData.niaDetails ?
                    <div className="w-fit ">
                        <Pressable
                            onClick={()=>setIsNiaVisible(true)}
                        >
                            <Text
                                textColor={theme.colors.main.primary}
                                className="hover:!underline !opacity-[1] hover:!opacity-[.5] duration-200 cursor-pointer"
                            >
                                See NIA Details...
                            </Text>
                        </Pressable>
                    </div>
                    :
                    <></>
                }
                <table className="w-full">
                    <tbody>
                        <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                            <td className="py-1"><Text>Stream Name:</Text></td>
                            <td>
                                <Text textColor={theme.colors.text.primary}>
                                    {personData?.streamName}
                                </Text>
                            </td>
                        </tr>
                        <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                            <td className="py-1"><Text>Last seen:</Text></td>
                            <td>
                                <Text textColor={theme.colors.text.primary}>
                                    &nbsp;{personData?.time && getRelativeTime(personData?.time).charAt(0).toUpperCase() + getRelativeTime(personData.time).slice(1)}
                                </Text>
                            </td>
                        </tr>
                        <tr className="border-b-solid border-b-[1px] border-b-bg-quantinary">
                            <td className="py-1"><Text>Location:</Text></td>
                            <td>
                                <Text textColor={theme.colors.text.primary}>
                                    {personData?.lastSeen}
                                </Text>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-1"><Text>Coordinates:</Text></td>
                            <td>
                                <Text textColor={theme.colors.text.primary}>
                                    &nbsp;{personData?.coordinates && `${personData.coordinates[0]}, ${personData.coordinates[1]}`}
                                </Text>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default CamDetailsPerson