import Button from "@components/button/button"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import { MdOutlineHistory } from "react-icons/md"
import Top from "./components/top"
import Bottom from "./components/bottom"

const History = () => {
    return (
        <Flex
            direction="column"
        >
            <Top />
            <Bottom />
        </Flex>
    )
}
export default History