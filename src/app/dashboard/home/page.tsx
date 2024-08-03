import Left from "@/app/components/sidebar/left"
import Left2 from "@/app/components/sidebar/left2"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"

const Home = () => {
    return (
        <div className="flex gap-4">
            <Flex
                width="fit-content"
                gap={0}
            >
                <Left />
                <Left2 />
            </Flex>
        </div>
    )
}
export default Home