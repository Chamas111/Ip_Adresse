import react from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import icon from "./icon";
import { useEffect } from "react";

export default function MarkerPosition({ address }) {
  const map = useMap();
  const position = [address.data.location.lat, address.data.location.lng];

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    });
  }, [map, position]);

  return (
    <>
      <Marker icon={icon} position={position}>
        <Popup>
          {address.data.isp} <br />
          {address.data.location.lat} {address.data.location.lng}
        </Popup>
      </Marker>
    </>
  );
}
