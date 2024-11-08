import Bottom from "./components/bottom"
import Map from "./components/map"
import Right from "./components/right"
import Topbar from "./components/topbar"

const Tracking = () => {
    return (
        <div className="w-full h-full flex flex-col pt-4 pl-[100px] pr-[90px] gap-4">
            <Topbar />
            <div className="flex gap-3 w-full h-full">
                <div className="flex flex-1 flex-col gap-2 h-full">
                    <Map />
                    <Bottom />
                </div>
                <Right />
            </div>
        </div>
    )
}
export default Tracking