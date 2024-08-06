import Flex from "@styles/components/flex"
import { historyTitles } from "./historyTitles"
import AppTypography from "@styles/components/appTypography"

const Bottom = () => {
    return (
        <div  className="w-full relative flex flex-col flex-1 gap-1">
            <div className="w-full absolute top-0 bg-gradient-container h-[300px] rounded-lg p-2">
                <div className="w-full flex bg-bg-primary rounded-lg px-4 py-3 justify-between">
                    {
                        historyTitles.map((item, index) => (
                            <AppTypography
                                key={index}
                            >
                                <Flex
                                    width="fit-content"
                                    align="center"
                                    justify="center"
                                >
                                    <item.icon />
                                    {item.title}
                                </Flex>
                            </AppTypography>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Bottom