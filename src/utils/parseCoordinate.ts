import { LatLngExpression } from "leaflet";

export const parseCoordinates = (coordinateString: string): LatLngExpression & number[] => {
    return coordinateString
        .split(',')
        .map(coord => parseFloat(coord.trim())) as LatLngExpression & number[]
}