import Left from "@components/sidebar/left"
import Left2 from "@components/sidebar/left2"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import Main from "./components/main"
import Controls from "./components/images/controls"
import Right from "@components/sidebar/right"
import Topbar from "./components/topbar"

const Home = () => {
    return (
        <div className="flex flex-col gap-3 py-2 w-full pl-[208px] pr-[250px]">
            <Flex
                width="fit-content"
                gap={0}
            >
                <Left />
                <Left2 />
            </Flex>
            <Topbar />
            <Main />
            <Controls />
            <Right />
        </div>
    )
}
export default Home