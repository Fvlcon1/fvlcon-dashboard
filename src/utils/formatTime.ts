export const formatTime = (timeInSeconds : number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Format with leading zero for seconds
  };