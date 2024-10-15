import InfinityLoader from "@components/loaders/infinityLoader"
import Overlay from "@components/overlay/overlay"
import StaticOverlay from "@components/overlay/staticOverlay"
import Text from "@styles/components/text"
import { Spin } from "antd"

const PageLoader = () => {
    return (
        <StaticOverlay className='!bg-[#000000e2]'>
            <div className='w-full h-full flex justify-center items-center'>
                <InfinityLoader />
            </div>
        </StaticOverlay>
    )
}
export default PageLoader