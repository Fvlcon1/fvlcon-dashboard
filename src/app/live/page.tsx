import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import Controls from "./components/controls/controls"
import LiveView from "./components/liveView"
import Head from "@components/title/head"
import Searchbar from "@components/search/search"

const Live = () => {
    return (
        <div className="relative w-full flex flex-col pr-[190px] gap-4">
            <Flex
                justify="space-between"
                align="center"
            >
                <div className="flex items-center gap-4">
                    <Head
                        typographyProps={{
                            ellipsis : true,
                            maxLines : 1,
                            whiteSpace : 'nowrap'
                        }}
                        title="Fvlcon Live Vision"
                    />
                    <Searchbar className="!w-[350px]"/>
                </div>
                <Controls />
            </Flex>
            <div className="flex relative w-full">
                <LiveView />
            </div>
        </div>
    )
}
export default Live