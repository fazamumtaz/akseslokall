"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LIST_LEGENDS, LIST_LOCATION } from "@/constants";
import MapMarker from "./Marker"; // 📌 Komponen Marker kita
import SidebarPlace from "./SidebarPlace";
import { Search } from "lucide-react";
import { useState } from "react";

const position = [-6.1702, 106.8314];

export default function MapComponent() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    setIsVisible(true);
  };

  const handleCloseSidebar = () => {
    setIsVisible(false);
    setSelectedPlace(null);
  };

  return (
    <main className="w-full h-screen relative">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
        wheelPxPerZoomLevel={500}
      >
        {/* <TileLayer
          url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=sQz1rPefoLTumwHeCfgtoK66dV7TyL4pQtCNbJ0GxkdeRFuMIEfr1dvsSPnI5WGl"
          attribution="..."
        /> */}

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {LIST_LOCATION.map((place, index) => (
          <MapMarker
            key={place.id || index}
            place={place}
            onMarkerClick={handleMarkerClick}
          />
        ))}
      </MapContainer>

      {/* komponen lain */}
      {isVisible && selectedPlace && (
        <SidebarPlace place={selectedPlace} onClose={handleCloseSidebar} />
      )}

      {/* search input */}
      <div className="absolute z-1000 top-2 right-2">
        <input
          className="h-10 w-64 bg-white rounded-lg border-2 border-black/50 placeholder-gray-500 p-2 pl-8 text-gray-500"
          placeholder="Cari Tempat..."
        />
        <Search className="absolute top-1/2 -translate-y-1/2 left-2 stroke-gray-500 w-4 h-4" />
      </div>

      {/* legends */}
      <div className="absolute z-1000 p-3 bottom-3 right-3 h-64 w-48 bg-white shadow-2xl rounded-xl">
        <h1 className="text-xl text-black font-bold mb-5">Petunjuk</h1>
        <div className="flex flex-col gap-1">
          {LIST_LEGENDS.map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <img src={item.icon} className="h-6" alt={item.label} />
              <span className="text-black text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
