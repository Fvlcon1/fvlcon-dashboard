import Searchbar from "@components/search/search"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { FaUserAlt } from "react-icons/fa"
import { FaCaretDown, FaSort } from "react-icons/fa6"
import { HiTemplate } from "react-icons/hi"
import { MdDoneAll } from "react-icons/md"

const RightControls = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2">
                <div className={`flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center`}>
                    <MdDoneAll
                        color={theme.colors.text.primary}
                        size={12}
                    />
                    <Text textColor={theme.colors.text.primary}>
                        All
                    </Text>
                </div>
                <div className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center">
                    <FaUserAlt
                        color={theme.colors.text.secondary}
                        size={12}
                    />
                    <Text>
                        People
                    </Text>
                </div>
                <div className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center">
                    <HiTemplate
                        color={theme.colors.text.secondary}
                        size={12}
                    />
                    <Text>
                        Number plates
                    </Text>
                </div>
            </div>
            <div className="flex">
                <div className="rounded-l-lg bg-bg-tetiary hover:bg-bg-quantinary cursor-pointer gap-1 p-2 flex items-center px-4 border-r-[1px] border-r-solid border-bg-alt1">
                    <Text>
                        Last 7 days
                    </Text>
                    <FaCaretDown
                        color={theme.colors.text.secondary}
                    />
                </div>
                <div className="rounded-r-lg gap-1 cursor-pointer hover:bg-bg-quantinary bg-bg-tetiary p-2 flex items-center px-4">
                    <Text>
                        March 20 - March 30
                    </Text>
                    <FaCaretDown 
                        color={theme.colors.text.secondary}
                    />
                </div>
            </div>
            <div className="flex gap-2 w-full">
                <Searchbar
                    className="bg-bg-secondary rounded-lg flex-1"
                    inputStyle="bg-bg-secondary rounded-lg"
                />
                <div className="flex gap-1 p-2 px-3 rounded-lg hover:bg-bg-quantinary cursor-pointer bg-bg-tetiary items-center">
                    <FaSort
                        color={theme.colors.text.secondary}
                        size={12}
                    />
                    <Text>
                        Sort
                    </Text>
                </div>
            </div>
        </div>
    )
}
export default RightControls