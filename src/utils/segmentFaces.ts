import * as faceapi from 'face-api.js';
import { DetailedHTMLProps, Dispatch, ImgHTMLAttributes, MutableRefObject, RefObject, SetStateAction, useRef } from 'react';
import { getFaceCanvas } from './getFaceCanvas';
import { canvasTypes, logsType } from './@types';
import axios from 'axios';
import { toast } from 'react-toastify';

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

const segmentFaces = async (url : string) => {
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

      resizedDetections.map((detection) => {
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
          if (similarity > 0.8){
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

export const awsSegmentation = async (file: File, setLogs: Dispatch<SetStateAction<logsType[]>>) => {
  try {
    setLogs([{log : {content : "Initializing..."}, date : new Date()}])
    setLogs(prev => ([
      ...prev, { date : new Date(), log : { content : "Generating presigned URL..." } }
    ]))
    const { data: { presignedUrl, videoKey } } = await axios.get("https://pr77ql49be.execute-api.us-east-1.amazonaws.com/Prod/upload-video");
    console.log({ presignedUrl, videoKey });
    setLogs(prev => ([
      ...prev, { date : new Date(), log : { content : `Successfully generated presigned url: ${presignedUrl}`, maxLines : 2 } }
    ]))

    // Upload the video to S3
    setLogs(prev => ([
      ...prev, { date : new Date(), log : { content : "Uploading video..." } }
    ]))
    await uploadToS3(presignedUrl, file);
    setLogs(prev => ([
      ...prev, { date : new Date(), log : { content : "Video uploaded successfully" } }
    ]))

    // Start analysis
    setLogs(prev => ([
      ...prev, { date : new Date(), log : { content : "Starting analysis..." } }
    ]))
    const { data: analysisData } = await startVideoAnalysis(videoKey);
    setLogs(prev => ([
      ...prev, { date : new Date(), log : { content : "Video analysis started" } }
    ]))
    setLogs(prev => ([
      ...prev, { date : new Date(), log : { content : "Fvlconizing..." } }
    ]))
    const { faceJobId } = analysisData;

    // Poll for analysis results
    return await pollJobStatus(faceJobId, videoKey, 'face', setLogs);

  } catch (error: any) {
    handleError(error);
  }
};

const uploadToS3 = async (presignedUrl: string, file: File) => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: { 'Content-Type': file.type },
    });
    console.log("Upload response:", response);

    if (response.status !== 200) {
      throw new Error("Unable to upload video to S3");
    }
  } catch (error: any) {
    throw new Error(`S3 upload failed: ${error.message}`);
  }
};

const startVideoAnalysis = async (videoKey: string) => {
  try {
    const response = await axios.post("https://pr77ql49be.execute-api.us-east-1.amazonaws.com/Prod/upload-video", { videoKey });
    console.log("Analysis started:", response);

    if (response.status !== 200) {
      throw new Error("Unable to start video analysis");
    }

    return response;
  } catch (error: any) {
    throw new Error(`Failed to start video analysis: ${error.message}`);
  }
};

const pollJobStatus = async (jobId: string, videoKey: string, jobType: string, setLogs: Dispatch<SetStateAction<logsType[]>>): Promise<any> => {
  const pollInterval = 5000;

  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      try {
        const { data: jobStatusData } = await axios.get("https://pr77ql49be.execute-api.us-east-1.amazonaws.com/Prod/check-job-status", {
          params: { jobId, jobType, videoKey }
        });

        console.log("Job status:", jobStatusData);

        if (jobStatusData.status === 'SUCCEEDED') {
          setLogs(prev => ([
            ...prev, { date : new Date(), log : { content : "Video analysis successful" } }
          ]))
          toast.success("Fvlconizing Successful");
          clearInterval(intervalId);
          resolve(jobStatusData);
        } else if (jobStatusData.status === 'FAILED') {
          toast.error("Recognition Failed");
          clearInterval(intervalId);
          reject(new Error("Recognition failed"));
        }
      } catch (error: any) {
        toast.error(`Failed to get job status: ${error.message}`);
        clearInterval(intervalId);
        reject(new Error(`Polling failed: ${error.message}`));
      }
    }, pollInterval);
  });
};



const handleError = (error: any) => {
  toast.error(`Error: ${error.message}`);
  console.error("An error occurred:", {
    message: error.message,
    details: error.response?.data || null
  });
};



export default segmentFaces