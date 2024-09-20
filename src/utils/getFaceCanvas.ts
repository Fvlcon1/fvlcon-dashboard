import * as faceapi from 'face-api.js';

export const getFaceCanvas = (detections : faceapi.WithAge<faceapi.WithGender<faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{
    detection: faceapi.FaceDetection;}, faceapi.FaceLandmarks68>>>>[] | 
    faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{
      detection: faceapi.FaceDetection;
  }, faceapi.FaceLandmarks68>>[], 
    file : HTMLImageElement | HTMLVideoElement) => {
    const faceCanvases = detections.map((detection, index : number) => {
        const box = detection.detection.box;
        const faceCanvas = document.createElement('canvas');
        faceCanvas.width = box.width;
        faceCanvas.height = box.height;
  
        const context = faceCanvas.getContext('2d');
        if (context) {
          context.drawImage(
            file,
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
          label: `Face ${index + 1}`,
          descriptor : detection.descriptor
        };
      });
    return faceCanvases
}