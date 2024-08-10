import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { rightPages } from "./data"
import { Tooltip } from "antd"

const Right = () => {
    return (
        <div  className="w-[50px] fixed right-[16px] top-0 flex h-[100vh] py-4">
            <div className="w-full bg-bg-secondary h-full rounded-lg flex justify-center">
                <Flex
                    width="fit-content"
                    direction="column"
                    gap={0}
                >
                    {
                        rightPages.map((item, index : number) => (
                            <Tooltip
                                key={index}
                                placement="left"
                                title={item.name}
                            >
                                <div
                                    className={`p-3 rounded-md duration-500 hover:duration-300 hover:opacity-[0.6] hover:scale-[0.95] cursor-pointer`}
                                >
                                    <item.icon
                                        className={`${item.active ? 'opacity-100' : 'opacity-100'}`}
                                        color={theme.colors.bg.alt2}
                                    />
                                </div>
                            </Tooltip>
                        ))
                    }
                </Flex>
            </div>
        </div>
    )
}
export default Right