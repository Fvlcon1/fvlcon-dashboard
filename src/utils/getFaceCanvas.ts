import * as faceapi from 'face-api.js';

export interface FaceCanvasType {
  boundedImage:  string
  croppedImage: string
  label: string,
  descriptor: Float32Array,
}

export const getFaceCanvas = (
  detections: faceapi.WithAge<
    faceapi.WithGender<
      faceapi.WithFaceDescriptor<
        faceapi.WithFaceLandmarks<
          { detection: faceapi.FaceDetection },
          faceapi.FaceLandmarks68
        >
      >
    >
  >[] |
    faceapi.WithFaceDescriptor<
      faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >
    >[],
  file: HTMLImageElement | HTMLVideoElement
) : FaceCanvasType[] => {
  const faceCanvases = detections.map((detection, index: number) => {
    const box = detection.detection.box;

    // Create canvas for bounded image
    const boundedCanvas = document.createElement("canvas");
    boundedCanvas.width = file.width
    boundedCanvas.height = file.height
    const boundedContext = boundedCanvas.getContext("2d");

    // Create canvas for cropped image
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = box.width;
    croppedCanvas.height = box.height;
    const croppedContext = croppedCanvas.getContext("2d");

    // Draw the full image and bounding box with rounded corners
    if (boundedContext) {
      // Draw the full file
      boundedContext.drawImage(file, 0, 0, boundedCanvas.width, boundedCanvas.height);

      // Set styles for rounded bounding box
      boundedContext.strokeStyle = "#2f9f8d";
      boundedContext.lineWidth = 2;

      // Draw rounded rectangle
      boundedContext.beginPath();
      const radius = 10; // Adjust for desired corner rounding
      boundedContext.moveTo(box.x + radius, box.y);
      boundedContext.lineTo(box.x + box.width - radius, box.y);
      boundedContext.quadraticCurveTo(
        box.x + box.width,
        box.y,
        box.x + box.width,
        box.y + radius
      );
      boundedContext.lineTo(box.x + box.width, box.y + box.height - radius);
      boundedContext.quadraticCurveTo(
        box.x + box.width,
        box.y + box.height,
        box.x + box.width - radius,
        box.y + box.height
      );
      boundedContext.lineTo(box.x + radius, box.y + box.height);
      boundedContext.quadraticCurveTo(
        box.x,
        box.y + box.height,
        box.x,
        box.y + box.height - radius
      );
      boundedContext.lineTo(box.x, box.y + radius);
      boundedContext.quadraticCurveTo(box.x, box.y, box.x + radius, box.y);
      boundedContext.closePath();
      boundedContext.stroke();
    }

    // Draw the cropped face region
    if (croppedContext) {
      croppedContext.drawImage(
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
      boundedImage: boundedCanvas.toDataURL(), // Full image with bounding box
      croppedImage: croppedCanvas.toDataURL(), // Cropped face image
      label: `Face ${index + 1}`,
      descriptor: detection.descriptor,
    };
  });

  return faceCanvases;
};
