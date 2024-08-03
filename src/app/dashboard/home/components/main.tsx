import ImageContainer from "@/app/components/imageContainer/imageContainer"
import Flex from "@styles/components/flex"

const Main = () => {
    return (
        <div  className="w-[500px] flex flex-1 h-[100vh] py-4">
            <div className="w-full bg-gradient-container h-[500px] rounded-lg p-4">
                <Flex
                    gap={15}
                >
                    <ImageContainer />
                    <ImageContainer />
                </Flex>
            </div>
        </div>
    )
}
export default Main