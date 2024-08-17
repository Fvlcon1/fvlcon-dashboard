import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import User from "./components/user"
import Controls from "./components/controls"
import LiveView from "./components/liveView"
import Left from "./components/right"

const Live = () => {
    return (
        <div className="relative w-full flex flex-col pr-[190px] gap-4">
            <Flex
                justify="space-between"
                align="center"
            >
                <User />
                <Controls />
            </Flex>
            <div className="flex relative w-full">
                <LiveView />
            </div>
        </div>
    )
}
export default Live