export const isVideoFile = (extension : string) : 'video' | 'image' | undefined => {
    if(
        extension === 'mp4' ||
        extension === 'mkv'
    ) return 'video'
}

export const isImageFile = (extension: string): 'video' | 'image' | undefined => {
    const imageExtensions = [
        'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg', 'ico', 'heic', 'heif'
    ];

    if (imageExtensions.includes(extension.toLowerCase())) {
        return 'image';
    }
};
