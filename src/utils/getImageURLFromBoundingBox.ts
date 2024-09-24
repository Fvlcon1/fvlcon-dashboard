import { Base64 } from 'js-base64';

// Define the bounding box and base64 image
const boundingBox = {
  left: 0.2440049946308136,
  top: 0.05663120001554489,
  width: 0.5051460266113281,
  height: 0.6847310066223145
};

const base64Image = "iVBORw0KGgoAAAANSUhEUgAAA1YAAAHgCAYAAACmUPwqAAAAAXNSR0IArs4c6QAAIABJREFUeF7svWePZWlyJhbn3HvT+8yq6urucaTEcV3dQyNiDZe7NOAOjRYrQZ/2H+qDBEGAIGChZQ9FQPww5NDskjMcDnvaTVdVV1WWSX/dESLijfOa85pjbrqqc4Hs7Mp77GvjiSfiiWwboPj1X/8WQHYGWT4GyMYAUEAxzwEgh6IA+hTFFIpiDvMCv8M/ynfquDkeU9APfvC4Op88y7yHyfl4T7o/3dP+yJn+K9S5Oz7zLHhg5jxb5d/YCoHnr3d3gC6nZ1BAHnl593l9z1q3n9z34WsVAFmh3qFef4f6MNRe8fbFe6vnUBdI9lmO45U/WVEAtiG9R8tPRpfT52f8h/KTev4u98ab4PXbj3/pO/28bvtV+ksN2KwceNVr1GnKnNqJ215fq3pm/HkK1YfhO8auLfePPW/y/s74C7VX5e/GxO2yhqTWj2R/4jyINED6/ev0dvtj4v3n3xfa3+06zuT1QvbN2P/jd/M574f0yXD1is/+1Pru21evrBWyDHBbj62+6eez11v32c12Nb8zx3VsjIfOVx3A9lCHFfgy29qcO7RPyNqt9ij+p73+mm1hrkvVc839X4/B9Pl8bEb7sL13+Pohtf6Ifdi2Hd3+Le1Nw371zU2ehpmyj/E3j+JCzc/y3449rK+VAZu22B58HW1rz2Fu2LumXa3XB5470yna5HIdvY7o51HPVT6HsX6Q9cP3D33myv72fy/P7Z/BVrt57Hc8K8sHjayv/f19yPMMhsMMcAjlgwIGA4DhcACDQXUc6nGrxp25YWaqvzKxAfV7uO03m8+oj3H9xTUJm1Panf+tf6g3emDVA6s2i1IPrNTW2gOrVs6BHljpTaAHVuEVqAdWttHSAyt3rPTAKjR7emCVtmx6YNUDKyQHXCdrD6wSHtfU1OoZq3ZsTQ+semDFLdAzVjGfe8jj6ho9qXUqaDwl6MqesWrbsld1Xs9Y9YzV5Yy12wCseP8IL2IpxkrW3jizWL99byNjRXE3ZWSZzVAJ46sjyXrGqhwNirGlCD1i5nrGiulk1ULtQ6H6UMBUqEhoSeqBVQ+semBVDUV150sPrOobNb4je8aqZ6ziI6hnrG4zY9UDq26hgLNZoUPSJBzRSMl53YHVYAgUCjgY5BQKGArxxb9X9mIDWAUZKwmhnGHIJYZozjnsj1KfOBzQbGMBsNceChhaFNzY2T7HqtpSr0OOVSpHKOVxdyfEbcuxSuXIpMzSVPvFz0/nqFWAgsoN4lwyptDbhLKVuXGUo9feY5nKMkmPH9OD55ljiQ6SPIU6xo3vmFTbuTl79jXSbGE0f03Z7O1zrFSOKIVSXM4n1X+L8lRfztMnrlroMJy6OVbWccwXR2M2UjkobR1ri2mvGjlW0VxtTJKIu1VT46Pb+MLnfzNzrEqnmoNrQ4atrHNWzksmOea8fvjWunj+m80ytBmTFTvTACdyPXMM6dwnnV/FOVJXm2NFOVmQAQIrvL+kMLm5XaFcK3w3PNPMz/K1303OsUIgVeZYjQYwMPKWQ7lVnNtX9mxpwwQZqwiwktw4BlcKcKnje2DVi1e0WY+UMd1dvCIFDFIbXw+suopXxMU/emAVN9x6YEUqMK3WkDonpeZ/ynCuc49rO6YHVmnxih5YtR6elxkKuChglQolTzmWdChg3EFWtxFdYEIAxBiDPbAyW/J6xSt6YBUZ1SmPWkwVqA8FvP2qgD2wqrvk+49LtV/86j1jBdAzVj1j1W0Otj67B1Y9sGo9eNIn3iRgJU9bYa4c8aeKIy8Z0tFN1de9Xw+s7Ba5aYzV3u4eDIY5jEYDyPMCRqMcsnxOf0PGKsVU2REiWrSC39OTY2UwVjg2WB2Qw//4KwaXrJbOrBX99bpVAUPAKi2zupgcq5TkcjRMqZdb7yy3ngIGKY91z1j1jFV";

export const getImageURLFromBoundingBox = (
    box: { Height: number; Width: number; Left: number; Top: number },
    url: string
  ): Promise<string>  =>{
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Check if ctx is null
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // Adjust bounding box coordinates based on image dimensions
      const { left, top, width, height } = boundingBox;
      const x = left
      const y = top
      const croppedWidth = width
      const croppedHeight = height

      // Check bounds before cropping
      if (x + croppedWidth > canvas.width || y + croppedHeight > canvas.height) {
        reject(new Error("Cropped area is out of bounds"));
        return;
      }

      ctx.drawImage(image, x, y, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);

      const croppedDataURL = canvas.toDataURL('image/png'); // Adjust format as needed
      resolve(croppedDataURL); // Return the cropped image URL
    };

    image.onerror = (error) => {
      reject(new Error("Failed to load image: " + error));
    };

    // Set the image source
    image.src = `data:image/png;base64,${base64Image}`;
    image.height = 100
  });
}