import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import User from "./components/user"
import Controls from "./components/controls"
import LiveView from "./components/liveView"

const Live = () => {
    return (
        <div className="relative w-full flex flex-col gap-4">
            <Flex
                justify="space-between"
                align="center"
            >
                <User />
                <Controls />
            </Flex>
            <LiveView />
        </div>
    )
}
export default Live