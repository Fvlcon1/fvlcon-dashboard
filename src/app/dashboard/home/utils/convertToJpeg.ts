export function convertDataUrlToJpeg(dataUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            // Create a canvas to draw the image on
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                reject(new Error('Failed to get canvas context.'));
                return;
            }

            // Set canvas dimensions to match image
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);
            
            // Convert canvas content to JPEG data URL
            const jpegDataUrl: string = canvas.toDataURL('image/jpeg');
            
            // Resolve the promise with the new JPEG data URL
            resolve(jpegDataUrl);
        };

        // Set the source of the image to the input data URL
        img.src = dataUrl;
    });
}