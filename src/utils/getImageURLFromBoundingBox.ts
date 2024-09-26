export const getImageURLFromBoundingBox = (
    boundingBox: { Height: number; Left: number; Top: number; Width: number },
    url: string
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const faceCanvas = document.createElement('canvas');
      const img = document.createElement('img');
      img.src = url
  
      img.onload = () => {
        const box = {
            Height : boundingBox.Height * img.height,
            Left : boundingBox.Left * img.width,
            Top : boundingBox.Top * img.height,
            Width : boundingBox.Width * img.width
        }
        faceCanvas.width = box.Width;
        faceCanvas.height = box.Height;
        console.log({imageSize : {
            w : img.width, h : img.height
        }})
        const aspectRatio = img.width / img.height;
        const context = faceCanvas.getContext('2d');
        if (context) {
          context.drawImage(
            img,
            box.Left,
            box.Top,
            box.Width,
            box.Height,
            0,
            0,
            box.Width,
            box.Height,
          );
          console.log({canvasURL : faceCanvas.toDataURL()})
          resolve(faceCanvas.toDataURL()); // Return the base64 image data
        } else {
          reject("Canvas context not available");
        }
      };
  
      img.onerror = () => {
        reject("Failed to load image");
      };
    });
  };
  