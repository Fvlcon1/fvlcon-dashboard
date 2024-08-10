import Left from "@components/sidebar/left"
import Left2 from "@components/sidebar/left2"
import AppTypography from "@styles/components/appTypography"
import Flex from "@styles/components/flex"
import Main from "./components/main"
import Controls from "./components/images/controls"
import Right from "@components/sidebar/right"
import Topbar from "./components/topbar"
import { ImageUploadProvider } from '../../../context/imageUpload';

const Home = () => {
    return (
        <ImageUploadProvider>
            <div className="flex flex-col gap-3 w-full pr-[165px]">
                <Topbar />
                <Main />
                <Controls />
            </div>
        </ImageUploadProvider>
    )
}
export default Home