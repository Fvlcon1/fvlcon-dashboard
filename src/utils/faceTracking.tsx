import * as faceapi from 'face-api.js';

const FaceTracking = ({
  canvasSize,
  videoElement,
  canvasContainerID
} : {
  canvasSize : {width : number, height : number}
  videoElement?: HTMLVideoElement, 
  canvasContainerID : string
}) => {
  if(videoElement){
    console.log({ width: videoElement.width, height: videoElement.height })
    console.log({videoElement})
    // Function to start face tracking
    const startFaceTracking = async () => {
      try {
        // Load models
        if (
          !faceapi.nets.tinyFaceDetector.isLoaded ||
          !faceapi.nets.faceLandmark68Net.isLoaded ||
          !faceapi.nets.faceRecognitionNet.isLoaded ||
          !faceapi.nets.faceExpressionNet.isLoaded
        ) {
          await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
          await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
          await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
          await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        }
    
        const canvas = faceapi.createCanvasFromMedia(videoElement);
        const canvasContainer = document.getElementById(canvasContainerID);
        canvasContainer?.append(canvas);
    
        const displaySize = { width: canvasSize.width, height: canvasSize.height };
        faceapi.matchDimensions(canvas, displaySize);
    
        const trackFaces = async () => {
          const detections = await faceapi
            .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
    
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          const context = canvas.getContext('2d');
    
          if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          }
    
          // Call requestAnimationFrame for the next frame
          requestAnimationFrame(trackFaces);
        };
    
        // Start the face tracking loop
        requestAnimationFrame(trackFaces);
      } catch (error) {
        console.error('Error starting face tracking:', error);
      }
    };    
  
    // Listen for the video to be ready to play
    videoElement.addEventListener('canplay', startFaceTracking, { once: true });
  }

  return <></>
}
export default FaceTracking