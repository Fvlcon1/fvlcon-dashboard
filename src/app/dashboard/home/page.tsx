import Left from "@components/sidebar/left"
import Left2 from "@components/sidebar/left2"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import Main from "./components/main"
import Images from "./components/images"
import Right from "@components/sidebar/right"

const Home = () => {
    return (
        <div className="flex gap-4 w-full pl-[190px] pr-[250px]">
            <Flex
                width="fit-content"
                gap={0}
            >
                <Left />
                <Left2 />
            </Flex>
            <Main />
            <Images />
            <Right />
        </div>
    )
}
export default Home