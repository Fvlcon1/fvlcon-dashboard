import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { IoMdArrowDropdown } from "react-icons/io"
import Profile from "./profile container/profile"
import Button from "@components/button/button"
import AnalysisResults from "./analysis results/analysisResults"

const Right = () => {
    return (
        <div className="fixed top-0 right-[60px] w-[210px] h-[100vh] py-4 px-6 gap-3">
            <Flex
                direction="column"
                gap={20}
            >
                <Flex
                    justify="flex-end"
                >
                    <Button
                        text="Clear"
                    />
                </Flex>
                <div className="flex flex-col w-full h-full rounded-lg gap-3 overflow-y-auto">
                    {
                        [1,2,3].map((item, index : number) => (
                            <AnalysisResults 
                                key={index}
                            />
                        ))
                    }
                </div>
            </Flex>
        </div>
    )
}
export default Right