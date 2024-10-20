import Controls from "./controls"
import MapComponent from "./mapContainer"

const Map = () => {
    return (
        <div className="w-full flex-col gap-2 flex bg-gradient-container h-[60%] rounded-xl p-[10px]">
            <Controls />
            <div className="h-full relative w-full bg-bg-secondary rounded-lg">
                <MapComponent />
            </div>
        </div>
    )
}
export default Map