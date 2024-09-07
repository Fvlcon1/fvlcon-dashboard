import * as faceapi from 'face-api.js';
import { DetailedHTMLProps, ImgHTMLAttributes, MutableRefObject, RefObject, useRef } from 'react';
import { getFaceCanvas } from './getFaceCanvas';
import { canvasTypes } from './@types';

export const isModelsLoaded = () => {
  if(
    faceapi.nets.ssdMobilenetv1.isLoaded &&
    faceapi.nets.tinyYolov2.isLoaded &&
    faceapi.nets.faceLandmark68Net.isLoaded &&
    faceapi.nets.faceRecognitionNet.isLoaded &&
    faceapi.nets.ageGenderNet.isLoaded
  ) return true
}

export const loadModels = async () => {
  const modelPath = '/model';
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
    await faceapi.nets.tinyYolov2.loadFromUri(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);
    await faceapi.nets.ageGenderNet.loadFromUri(modelPath);
    console.log('Models loaded');
    return true
  } catch (error) {
    console.error('Error loading models:', error);
  }
};

const segmentFaces = async (url : string, imageRef : RefObject<HTMLImageElement>, image? : DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
  try {
    const img = await faceapi.fetchImage(url);
    if (!isModelsLoaded()) {
      await loadModels();
    }
    if (!isModelsLoaded()) {
      return console.log("Models not loaded properly");
    }
  
    const detections = await faceapi
      .detectAllFaces(img, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender();
      console.log({detections})
  
      const faces = getFaceCanvas(detections, img)
      console.log({faces})
      return faces
  } catch(error) {
    console.log("error segmenting faces:", error)
  }
}


export const videoSegmentation = async (video: HTMLVideoElement | null, timestamp: number, distinctFaces? : canvasTypes[]) => {
  if (video) {
    try {
      if (!isModelsLoaded()) {
        await loadModels();
      }
      if (!isModelsLoaded()) {
        return console.log("Models not loaded properly");
      }

      const canvasContainer = document.getElementById("imageDetectionCanvas");
      
      const canvas = faceapi.createCanvasFromMedia(video);
      canvasContainer?.appendChild(canvas); 

      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      let detections = await faceapi.detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptors()
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const context = canvas.getContext("2d");
        if (canvasContainer) {
          canvasContainer.innerHTML = '';
        }
        context?.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);

      const filteredDetections : faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{
          detection: faceapi.FaceDetection;
      }, faceapi.FaceLandmarks68>>[] = []

      detections.map((detection) => {
        let similarity = 10
        if(distinctFaces){
          distinctFaces.map((face) => {
            if(face.descriptor){
              const result = faceapi.euclideanDistance(detection.descriptor, face.descriptor)
              if(result < similarity){
                similarity = result
              }
            }
          })
          if (similarity > 0.6){
            console.log('similarity > 0.6')
            filteredDetections.push(detection)
          }
        } else {
          console.log("there are no distinct faces yet")
          filteredDetections.push(detection)
        }
      })

      const faces = getFaceCanvas(filteredDetections, video)
      console.log({filteredDetections})
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