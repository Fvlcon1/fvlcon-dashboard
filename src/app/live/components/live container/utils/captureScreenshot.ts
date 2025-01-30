import { message } from "antd";
import { getVideoElementFromMuxPlayer } from "./getVideoElementFromMuxPlayer";

export const captureScreenshot = (id:string) => {
    const videoElement = getVideoElementFromMuxPlayer(id)
    console.log("heu")
    if (!videoElement) {
        message.error("Video element not found!");
        return;
    }

    // Create a canvas and match video dimensions
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Convert to image and download
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `screenshot-${id}.png`;
        link.click();
        message.success("Screenshot taken")
        return {dataUrl}
    }
};