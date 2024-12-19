export const dataURLToBlob = (dataUrl : string) => {
    const [meta, base64Content] = dataUrl.split(',');
    const mimeType = meta.match(/data:(.*?);base64/)?.[1] || 'application/octet-stream';
    const binary = atob(base64Content);
    const arrayBuffer = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
        arrayBuffer[i] = binary.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeType });
}