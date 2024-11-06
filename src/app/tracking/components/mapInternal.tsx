import { LatLngExpression } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet'; 

const MapInternal = ({
    center,
    zoom
} : {
    center? : LatLngExpression & number[]
    zoom : number
}) => {
    const map = useMap(); 
    useEffect(() => {
        if (map && center) {
            map.flyTo(center, zoom, {
                duration: 0.5, // Duration of the animation in seconds
            });
        }
    }, [center, map, zoom]);
    return (
        <div>

        </div>
    )
}
export default MapInternal