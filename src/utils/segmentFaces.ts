import * as faceapi from 'face-api.js';
import { DetailedHTMLProps, Dispatch, ImgHTMLAttributes, MutableRefObject, RefObject, SetStateAction, useRef } from 'react';
import { FaceCanvasType, getFaceCanvas } from './getFaceCanvas';
import { logsType } from './@types';
import axios from 'axios';
import { message } from 'antd';

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
  const modelPath = '/models';
  try {
    await faceapi.nets.ssdMobilenetv1.loadFromUri(modelPath);
    await faceapi.nets.tinyYolov2.loadFromUri(modelPath);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);
    await faceapi.nets.faceRecognitionNet.loadFromUri(modelPath);
    await faceapi.nets.ageGenderNet.loadFromUri(modelPath);
    return true
  } catch (error) {
    console.error('Error loading models:', error);
  }
};

const segmentFaces = async (url : string, setLogs: Dispatch<SetStateAction<logsType[]>>) => {
  try {
    const img = await faceapi.fetchImage(url);
    if (!isModelsLoaded()) {
      await loadModels();
    }
    if (!isModelsLoaded()) {
      setLogs([{log : {content : "Models not loaded properly"}, date : new Date()}])
      message.error("Models not loaded properly")
      return console.log("Models not loaded properly");
    }
  
    setLogs([{log : {content : "Segmenting started..."}, date : new Date()}])
    const detections = await faceapi
      .detectAllFaces(img, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender();
    setLogs(prev => [...prev, {log : {content : "Segmentation successful"}, date : new Date()}])
    setLogs(prev => [...prev, {log : {content : "Cropping segments..."}, date : new Date()}])
  
    const faces = getFaceCanvas(detections, img)
    setLogs(prev => [...prev, {log : {content : "Segments successlly cropped"}, date : new Date()}])
    return faces
  } catch(error) {
    message.error("error segmenting faces")
    console.log("error segmenting faces:", error)
  }
}


export const videoSegmentation = async (video: HTMLVideoElement | null, timestamp: number, distinctFaces? : FaceCanvasType[]) => {
  if (video) {
    try {
      if (!isModelsLoaded()) {
        await loadModels();
      }
      if (!isModelsLoaded()) {
        message.error("Models not loaded properly")
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
          message.error("there are no distinct faces yet")
          filteredDetections.push(detection)
        }
      })

      const faces = getFaceCanvas(filteredDetections, video)
      return faces
    } catch (error) {
      console.log("Failed to start detection:", error);
      message.error("Failed to start detection")
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
    const { data: { presignedUrl, videoKey } } = await axios.get(`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/upload-video`);
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

    if (response.status !== 200) {
      throw new Error("Unable to upload video to S3");
    }
  } catch (error: any) {
    throw new Error(`S3 upload failed: ${error.message}`);
  }
};

const startVideoAnalysis = async (videoKey: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/upload-video`, { videoKey });

    if (response.status !== 200) {
      throw new Error("Unable to start video analysis");
    }

    return response;
  } catch (error: any) {
    throw new Error(`Failed to start video analysis: ${error.message}`);
  }
};

const pollJobStatus = async (jobId: string, videoKey: string, jobType: string, setLogs: Dispatch<SetStateAction<logsType[]>>): Promise<any> => {
  const pollInterval = 5000
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      try {
        const { data: jobStatusData } = await axios.get(`${process.env.NEXT_PUBLIC_AWS_BASE_URL}/check-job-status`, {
          params: { jobId, jobType, videoKey }
        });
        
        if (jobStatusData.status === 'SUCCEEDED') {
          setLogs(prev => ([
            ...prev, { date : new Date(), log : { content : "Video analysis successful" } }
          ]))
          message.success("Fvlconizing Successful");
          clearInterval(intervalId);
          resolve({data : jobStatusData, videoKey});
        } else if (jobStatusData.status === 'FAILED') {
          message.error(jobStatusData.statusMessage);
          clearInterval(intervalId);
          reject(new Error("Recognition failed"));
        }
      } catch (error: any) {
        message.error(`Failed to get job status: ${error.response?.data || error.message}`);
        clearInterval(intervalId);
        reject(new Error(`Polling failed: ${error.message}`));
      }
    }, pollInterval);
  });
};



const handleError = (error: any) => {
  message.error(`${error.response?.data || error.message}`);
  console.error("An error occurred:", {
    message: error.message,
    details: error.response?.data || null
  });
};



export default segmentFaces