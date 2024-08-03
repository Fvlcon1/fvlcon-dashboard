import Left from "@/app/components/sidebar/left"
import Left2 from "@/app/components/sidebar/left2"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import Main from "./components/main"
import Images from "./components/images"
import Right from "@/app/components/sidebar/right"

const Home = () => {
    return (
        <div className="flex gap-4 w-full">
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