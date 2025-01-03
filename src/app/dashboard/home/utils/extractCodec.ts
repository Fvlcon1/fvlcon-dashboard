import MP4Box from 'mp4box';

export const extractCodec = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const mp4boxfile = MP4Box.createFile();

    reader.onload = () => {
      const arrayBuffer = reader.result;

      if (arrayBuffer instanceof ArrayBuffer) {
        mp4boxfile.onReady = (info) => {
          const codec = info.tracks[0]?.codec || 'Unknown';
          resolve(codec);
        };

        // Add `fileStart` to a wrapper object
        const bufferWithFileStart = {
          buffer: arrayBuffer,
          fileStart: 0,
        };

        // Append the buffer to MP4Box
        mp4boxfile.appendBuffer(bufferWithFileStart as any); // Cast as any since `fileStart` is non-standard
      } else {
        reject(new Error('FileReader result is not an ArrayBuffer.'));
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};
