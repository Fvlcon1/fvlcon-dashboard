export const isVideoFile = (extension : string) : 'video' | 'image' | undefined => {
    if(
        extension === 'mp4'
    ) return 'video'
}

export const isImageFile = (extension : string) : 'video' | 'image' | undefined => {
    if(
        extension === 'jpg' ||
        extension === 'jpeg' ||
        extension === 'png'
    ) return 'image'
}