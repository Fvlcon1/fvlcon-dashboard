declare module 'mp4box' {
    export function createFile(): {
        onReady: (info: {
            tracks: Array<{
                codec: string;
            }>;
        }) => void;
        appendBuffer: (buffer: ArrayBuffer) => void;
        flush: () => void;
    };
}