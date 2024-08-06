import Searchbar from "@components/search/search"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import theme from "@styles/theme"
import { FaCircleUser } from "react-icons/fa6"

const Topbar = () => {
    return (
        <div className="flex w-full items-center justify-between px-1">
            <Flex
                width="fit-content"
                align="center"
                gap={50}
            >
                <Flex
                    width="fit-content"
                    align="center"
                >
                    <FaCircleUser 
                        color={theme.colors.text.secondary}
                        className="mt-[-1px]"
                        size={20}
                    />
                    <AppTypography>
                        Amin Hafez Michael
                    </AppTypography>
                </Flex>
                <Searchbar />
            </Flex>
        </div>
    )
}
export default Topbar