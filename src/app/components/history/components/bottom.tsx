import Flex from "@styles/components/flex"
import { historyTitles } from "./historyTitles"
import AppTypography from "@styles/components/appTypography"
import { FaImage } from "react-icons/fa6"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import HistoryItem from "./historyItem"
import { Fragment } from "react"

const Bottom = () => {
    return (
        <div  className="w-full relative flex flex-col flex-1 gap-1">
            <div className="w-full absolute top-0 bg-gradient-container h-[300px] rounded-lg p-2">
                <div className="w-full flex bg-bg-primary rounded-lg px-4 py-2 justify-between">
                    {
                        historyTitles.map((item, index) => (
                            <AppTypography
                                key={index}
                            >
                                <Flex
                                    align="center"
                                    justify="center"
                                    width="100px"
                                >
                                    <item.icon className="mt-[-2px]"/>
                                    {item.title}
                                </Flex>
                            </AppTypography>
                        ))
                    }
                </div>
                <Flex
                    direction='column'
                    gap={20}
                    margin="10px 0 0 0"
                >
                    {
                        [1,2,3,4,5,6].map((item, index) => (
                            <Fragment
                                key={index}
                            >
                                <HistoryItem />
                                <Flex
                                    padding="0 20px"
                                >
                                    <div className="w-full h-[1px] bg-bg-secondary"></div>
                                </Flex>
                            </Fragment>
                        ))
                    }
                </Flex>
            </div>
        </div>
    )
}
export default Bottom