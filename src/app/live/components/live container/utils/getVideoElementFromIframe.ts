import { message } from "antd";

export const getVideoElementFromIframe = (id:string) => {
    const iFrame = document.getElementById(id) as HTMLIFrameElement
    const videoElement = iFrame?.contentWindow?.document.querySelector("video")
    if (videoElement) {
        return videoElement
    } else {
      console.log('Video element not found inside the shadow DOM');
      message.error("Video element not found in frame")
    }
}