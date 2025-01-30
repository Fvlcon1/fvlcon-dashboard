export const getVideoElementFromMuxPlayer = (id:string) => {
        const customPlayer = document.getElementById(id)
        ?.querySelector('mux-player')
        ?.shadowRoot
        ?.querySelector('media-theme')
        ?.querySelector('mux-video')
        ?.shadowRoot
        if (customPlayer) {
            const videoElement = customPlayer.querySelector('video') as HTMLVideoElement;
            if (videoElement) {
                return videoElement
            } else {
              console.log('Video element not found inside the shadow DOM');
            }
        } else {
            console.log('customPlayer DOM not found');
          }
    }