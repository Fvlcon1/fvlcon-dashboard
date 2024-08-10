import Head from "@components/title/head"
import Flex from "@styles/components/flex"
import Main  from "./components/main"

const History = () => {
    return (
        <Flex
            direction="column"
            gap={20}
        >
            <Head title="History"/>
            <Flex
                direction="column"
            >
                <Main />
            </Flex>
        </Flex>
    )
}
export default History