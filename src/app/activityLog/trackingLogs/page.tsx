import Text from "@styles/components/text"
import theme from "@styles/theme"
import Controls from "./components/controls"
import Tables from "./components/tables"

const TrackingLogs = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full gap-2 flex justify-between items-center">
                <Text
                    textColor={theme.colors.text.secondary}
                >
                    Tracking logs
                </Text>
                <Controls />
            </div>
            <Tables />
        </div>
    )
}
export default TrackingLogs