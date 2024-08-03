import { logo } from "@/assets"
import AppTypography from "@styles/components/appTypography"
import Image from "next/image"
import Logo from "../logo/logo"
import Flex from "@styles/components/flex"

const Left = () => {
    return (
        <div
            className="flex flex-col w-[70px] h-[100vh] bg-bg-secondary p-2 py-6 gap-3 items-center justify-between"
        >
            <Logo />
            <Flex
                width="fit-content"
            >
                <Logo />
            </Flex>
            <Flex
                width="fit-content"
                direction="column"
            >
                <div className="w-full h-[1px] bg-bg-quantinary rounded-full"></div>
                <Logo />
            </Flex>
        </div>
    )
}
export default Left