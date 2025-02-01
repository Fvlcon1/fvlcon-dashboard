import { getVideoElementFromMuxPlayer } from "./getVideoElementFromMuxPlayer";

interface VideoElementWithCaptureStream extends HTMLVideoElement {
    captureStream(fps?: number): MediaStream;
}

let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: BlobPart[] = [];

export const recordStream = (id: string, isRecording: boolean, setIsRecording: (state: boolean) => void, callback? : ()=>void) => {
    const videoElement = getVideoElementFromMuxPlayer(id) as VideoElementWithCaptureStream;

    if (!videoElement || !videoElement.captureStream) {
        console.error("Video element not found or captureStream not supported.");
        return;
    }

    if (isRecording) {
        // Stop the recording
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    } else {
        // Start the recording
        const stream = videoElement.captureStream(30); // 30 FPS
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);

            // Trigger download
            const a = document.createElement("a");
            a.href = url;
            a.download = "recorded-video.webm";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            //Call callback
            callback && callback()

            // Reset mediaRecorder
            mediaRecorder = null;
        };

        mediaRecorder.start();
        setIsRecording(true);
    }
};
