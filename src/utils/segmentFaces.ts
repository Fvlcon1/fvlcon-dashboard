import * as faceapi from 'face-api.js';
import { DetailedHTMLProps, ImgHTMLAttributes, MutableRefObject, RefObject, useRef } from 'react';

const segmentFaces = async (url : string, imageRef : RefObject<HTMLImageElement>, image? : DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) => {
    const img = await faceapi.fetchImage(url);
    console.log({img})
    const loadModels = async () => {
        const modelPath = '/model';
        try {
          await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
          await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
          await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);
          await faceapi.nets.ageGenderNet.loadFromUri(modelPath);
          console.log('Models loaded');
        } catch (error) {
          console.error('Error loading models:', error);
        }
    };
    await loadModels();

    if (
      faceapi.nets.ssdMobilenetv1.isLoaded &&
      faceapi.nets.faceLandmark68Net.isLoaded &&
      faceapi.nets.faceRecognitionNet.isLoaded &&
      faceapi.nets.ageGenderNet.isLoaded
    ) {
    const detections = await faceapi
      .detectAllFaces(img, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender();
      console.log({detections})

      const faceCanvases = detections.map((detection : any, index : number) => {
        const box = detection.detection.box;
        const faceCanvas = document.createElement('canvas');
        faceCanvas.width = box.width;
        faceCanvas.height = box.height;

        const context = faceCanvas.getContext('2d');
        if (context && imageRef.current) {
          context.drawImage(
            imageRef.current,
            box.x,
            box.y,
            box.width,
            box.height,
            0,
            0,
            box.width,
            box.height
          );
        }

        return {
          dataUrl: faceCanvas.toDataURL(),
          label: `Face ${index + 1}`
        };
      });
      const faces = faceCanvases
      console.log({faces})
      return faces
    } else {
        console.log('models not loaded correctly')
    }
}

export default segmentFaces