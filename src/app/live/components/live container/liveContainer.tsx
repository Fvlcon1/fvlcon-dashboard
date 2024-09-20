import Controls from "./controls"

const LiveContainer = () => {
    return (
        <div
            className="bg-bg-secondary relative rounded-lg h-full overflow-hidden"
        >
            <Controls />
            <iframe 
                src="http://18.212.105.195:8888/haatso/channel_1/"
                title="stream"
                width={'100%'}
                height={'100%'}
                frameBorder={0}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-writehttp://18.212.105.195:8888/haatso/channel_1/"
            />
        </div>
    )
}
export default LiveContainer
