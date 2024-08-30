import * as faceapi from 'face-api.js';
import { DetailedHTMLProps, ImgHTMLAttributes, MutableRefObject, RefObject, useRef } from 'react';
import { getFaceCanvas } from './getFaceCanvas';

export const isModelsLoaded = async () => {
  if(
    faceapi.nets.tinyFaceDetector.isLoaded &&
    faceapi.nets.tinyYolov2.isLoaded &&
    faceapi.nets.faceLandmark68Net.isLoaded &&
    faceapi.nets.faceRecognitionNet.isLoaded &&
    faceapi.nets.ageGenderNet.isLoaded
  ) return true
}

export const loadModels = async () => {
  const modelPath = '/model';
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
    await faceapi.nets.tinyYolov2.loadFromUri(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);
    await faceapi.nets.ageGenderNet.loadFromUri(modelPath);
    console.log('Models loaded');
  } catch (error) {
    console.error('Error loading models:', error);
  }
};

const segmentFaces = async (url : string, imageRef : RefObject<HTMLImageElement>, image? : DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  try {
    const img = await faceapi.fetchImage(url);
    // console.log({img})
    await loadModels();
  
    if ( await isModelsLoaded()) {
    const detections = await faceapi
      .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender();
      console.log({detections})
  
      const faces = getFaceCanvas(detections, img)
      console.log({faces})
      return faces
    } else {
        console.log('models not loaded correctly')
    }
  } catch(error) {
    console.log("error segmenting faces:", error)
  }
}


export const videoSegmentation = async (video: HTMLVideoElement | null, timestamp: number) => {
  if (video) {
    try {
      if (!await isModelsLoaded()) {
        await loadModels();
      }
      if (!await isModelsLoaded()) {
        return console.log("Models not loaded properly");
      }

      const canvasContainer = document.getElementById("imageDetectionCanvas");
      if (canvasContainer) {
        canvasContainer.innerHTML = '';
      }

      const canvas = faceapi.createCanvasFromMedia(video);
      canvasContainer?.appendChild(canvas); 

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      console.log(`Timestamp: ${timestamp}`);

      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const context = canvas.getContext("2d");
      context?.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      const faces = getFaceCanvas(detections, video)
      console.log({faces})
      return faces
    } catch (error) {
      console.log("Failed to start detection:", error);
    }
  }
};

export const handleVideoPlay = async (video: HTMLVideoElement | null, timestamp: number, play: boolean) => {
  if (video) {
    video.currentTime = timestamp;
    if (play) {
      await video.play();
    } else {
      video.pause();
    }
  }
};



export default segmentFaces