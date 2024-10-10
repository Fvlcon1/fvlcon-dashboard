import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props : any) => {
  const instance = L.Routing.control({
    position: 'topleft',
    waypoints: props.wayPointsCoordinates,
    createMarker : ()=>false,
    lineOptions: {
      styles: [{ color: "royalblue", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export const customRoutingMachine = () => {
    <RoutingMachine sdf={'fd'} />
}

export default RoutingMachine;
