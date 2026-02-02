"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LIST_LOCATION } from "@/location";
import MapMarker from "./Marker"; // 📌 Komponen Marker kita

const position = [-6.1702, 106.8314];

export default function MapComponent() {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=sQz1rPefoLTumwHeCfgtoK66dV7TyL4pQtCNbJ0GxkdeRFuMIEfr1dvsSPnI5WGl"
        attribution="..."
      />

      {LIST_LOCATION.map((place, index) => (
        <MapMarker key={place.id || index} place={place} />
      ))}
    </MapContainer>
  );
}
