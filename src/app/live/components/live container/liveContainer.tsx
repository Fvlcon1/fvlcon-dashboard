import { useContext, useEffect, useRef, useState } from "react"
import Controls from "./controls"
import { liveContext } from "@/context/live"

const LiveContainer = ({
    url,
    id,
    gridClass
} : {
    url : string,
    gridClass? : string,
    id : string
}) => {
    const liveRef = useRef<HTMLDivElement>(null)
    const [liveHeight, setLiveHeight] = useState(0)
    const { activeCameras, numberOfCamerasPerPage } = useContext(liveContext)
    const resizeLiveHeight = () => {
        const cameraWidth = liveRef.current?.offsetWidth
        if(cameraWidth)
            setLiveHeight(cameraWidth / (16/9))
    }
    useEffect(()=>{
        resizeLiveHeight()
    },[gridClass])
    useEffect(() => {
        window.addEventListener('resize', resizeLiveHeight);
        return ()=> window.removeEventListener('resize', resizeLiveHeight)
    }, []);
    return (
        <div
            ref={liveRef}
            className={`bg-bg-secondary flex flex-col relative rounded-lg max-h-full overflow-hidden h-fit`}
        >
            <Controls id={id} />
            <div 
                className="w-full flex flex-grow justify-center items-center"
                style={{
                    height : `${liveHeight}px`
                }}
            >
                <iframe 
                    src={url}
                    title="stream"
                    width={'100%'}
                    height={'100%'}
                    id={id}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write"
                />
            </div>
        </div>
    )
}
export default LiveContainer
