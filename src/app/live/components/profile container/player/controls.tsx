import ClickableTab from "@components/clickable/clickabletab"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { CgLivePhoto } from "react-icons/cg"
import { FaBackward, FaForward, FaPause, FaRev } from "react-icons/fa6"
import { IoMdArrowDropdown } from "react-icons/io"

const Controls = () => {
    return (
        <div className="w-full flex justify-center items-center rounded-lg">
            <Flex
                justify="space-between"
                align="center"
            >
                <div className="px-3 py-[6px] rounded-full bg-bg-quantinary text-text-secondary flex gap-3">
                    <FaBackward 
                        className="hover:scale-90 cursor-pointer duration-200 hover:text-text-primary"
                    />
                    <FaPause 
                        className="hover:scale-90 cursor-pointer duration-200 hover:text-text-primary"
                    />
                    <FaForward 
                        className="hover:scale-90 cursor-pointer duration-200 hover:text-text-primary"
                    />
                </div>
                <div
                    className="hover:scale-95 cursor-pointer duration-200"
                >
                    <Flex
                        width="fit-content"
                        align="center"
                    >
                        <AppTypography>
                            <CgLivePhoto color={'red'}/>
                        </AppTypography>
                        <AppTypography>
                            REC
                        </AppTypography>
                    </Flex>
                </div>
            </Flex>
        </div>
    )
}
export default Controls