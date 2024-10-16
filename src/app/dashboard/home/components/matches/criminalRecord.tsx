import Window from "@components/window/window"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { Dispatch, SetStateAction } from "react"
import { formatString } from "../../utils/formatString"

const CriminalRecord = ({
    isVisible,
    setIsVisible,
    data
} : {
    isVisible : boolean,
    setIsVisible : Dispatch<SetStateAction<boolean>>
    data? : any
}) => {
 
    return (
        <Window
            open={isVisible}
            setOpen={setIsVisible}
            className="!w-[300px] !h-fit"
            title="Criminal Records"
        >
            <div className="w-full h-full p-2 flex flex-col gap-2">
                {
                    data &&
                    Object.keys(data).map((item, index) => (
                        <div key={index} className="flex gap-1">
                            <Text>
                                {formatString(item)}:
                            </Text>
                            <Text
                                textColor={theme.colors.text.primary}
                            >
                                {data[item] || 'N/A'}
                            </Text>
                        </div>
                    ))
                }
            </div>
        </Window>
    )
}
export default CriminalRecord