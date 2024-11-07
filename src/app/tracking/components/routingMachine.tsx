import L, { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";

const RoutingMachine = ({ wayPointsCoordinates } : {wayPointsCoordinates? : (LatLngExpression & number[])[]}) => {
  const map = useMap();

  useEffect(() => {
    if (!wayPointsCoordinates) return;

    // Create the routing control
    const routingControl = L.Routing.control({
      position: 'topleft',
      waypoints: wayPointsCoordinates.map((coord : any) => L.latLng(coord[0], coord[1])),
      createMarker: () => false,
      lineOptions: { styles: [{ color: "royalblue", weight: 4 }] },
      show: false,
      addWaypoints: false,
      routeWhileDragging: true,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
    }).addTo(map);

    // Clean up on unmount
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, wayPointsCoordinates]); // Run this effect when wayPointsCoordinates updates

  return null; // Since this is not a visual component
};

export default RoutingMachine;
