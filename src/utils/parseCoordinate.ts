export const parseCoordinates = (coordinateString: string): number[] => {
    return coordinateString
        .split(',')
        .map(coord => parseFloat(coord.trim()));
}