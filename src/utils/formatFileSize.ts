export const formatFileSize = (sizeInBytes: number): string => {
    if (sizeInBytes < 0) {
        throw new Error("File size cannot be negative");
    }

    // Define size units
    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB"];
    let index = 0;

    // Calculate human-readable size
    while (sizeInBytes >= 1024 && index < units.length - 1) {
        sizeInBytes /= 1024;
        index++;
    }

    // Return formatted size with two decimal places
    return `${sizeInBytes.toFixed(2)} ${units[index]}`;
}