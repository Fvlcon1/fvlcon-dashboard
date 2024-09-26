const generateVideoThumbnail = (videoUrl: string, time: number = 0): Promise<string> => {
  console.log({time})
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    video.onloadeddata = () => {
      video.currentTime = time;
    };

    video.onseeked = () => {
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const thumbnailUrl = canvas.toDataURL('image/png');
        resolve(thumbnailUrl);
      } else {
        reject("Could not get 2D context from canvas.");
      }
    };

    video.onerror = (error : any) => {
      reject(`Error generating thumbnail: ${error.message}`);
    };
  });
};
  
export default generateVideoThumbnail