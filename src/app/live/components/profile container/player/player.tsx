import Controls from "./controls"
import Head from "./head"

const Player = () => {
    return (
        <div 
            className="p-[6px] pr-4 w-full flex flex-col gap-1 rounded-full bg-bg-secondary overflow-hidden"
        >
            {/* <Head /> */}
            <Controls />
        </div>
    )
}
export default Player