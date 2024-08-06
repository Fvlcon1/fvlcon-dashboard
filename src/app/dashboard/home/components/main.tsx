import History from "@/app/components/history/history"
import ImageContainer from "@/app/components/imageContainer/imageContainer"
import Button from "@components/button/button"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { RiOrganizationChart } from "react-icons/ri"

const Main = () => {
    return (
        <div  className="w-full items-center flex flex-col flex-1 h-[100vh] pb-4 gap-1">
            <Flex
                direction="column"
                gap={4}
                maxWidth="1080px"
            >
                <div className="w-full bg-gradient-container h-[500px] rounded-2xl p-4">
                    <Flex
                        gap={15}
                    >
                        <ImageContainer />
                        <ImageContainer />
                    </Flex>
                </div>
                <Flex
                    padding="0 18px"
                    direction="column"
                    gap={12}
                    margin="-120px 0 0 0"
                >
                    <Flex 
                        width="fit-content"
                    >
                        <Button 
                            text="Segment"
                            icon={<RiOrganizationChart className="mt-[-1px]"/>}
                        />
                    </Flex>
                    <History />
                </Flex>
            </Flex>
        </div>
    )
}
export default Main