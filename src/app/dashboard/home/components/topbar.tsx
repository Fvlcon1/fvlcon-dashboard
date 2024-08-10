import Searchbar from "@components/search/search"
import Head from "@components/title/head"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { FaCircleUser } from "react-icons/fa6"

const Topbar = () => {
    return (
        <div className="flex w-full items-center justify-between px-1">
            <Head 
                title="Image & Video Recognition"
            />
            <Flex
                width="fit-content"
                align="center"
                gap={20}
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
                <Searchbar className="!w-[400px]" />
            </Flex>
        </div>
    )
}
export default Topbar