import L, { popup } from "leaflet";
import iconLocation from "./images/iconLoca1.png";

export default L.icon({
  iconsize: [32, 40],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: iconLocation,
});
