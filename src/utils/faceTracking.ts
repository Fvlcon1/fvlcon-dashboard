import * as faceapi from 'face-api.js';

export const faceTracking = async (videoElement: HTMLVideoElement, canvasContainerID : string) => {
    console.log({ width: videoElement.width, height: videoElement.height })
    console.log({videoElement})
  // Function to start face tracking
  const startFaceTracking = async () => {
    try {
      // Load models
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
      await faceapi.nets.faceExpressionNet.loadFromUri('/models');

      // Create a canvas from the loaded video
      const canvas = faceapi.createCanvasFromMedia(videoElement);
      document.getElementById(canvasContainerID)?.append(canvas);  // Optionally, append to a specific container

      console.log("what")
      const displaySize = { width: 500, height: 400 };
      faceapi.matchDimensions(canvas, displaySize);

      // Run face tracking continuously every 100ms
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        console.log({resizedDetections})
        const context = canvas.getContext('2d');

        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }
      }, 100);
    } catch (error) {
      console.error('Error starting face tracking:', error);
    }
  };

  // Listen for the video to be ready to play
  videoElement.addEventListener('canplay', () => {
    console.log('Video is ready, starting face tracking...');
    startFaceTracking();
  });
};