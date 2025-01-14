export const base64ToBlob = (base64: string, contentType: string): Blob => {
    const byteCharacters = atob(base64.split(',')[1]); // Decode base64
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };