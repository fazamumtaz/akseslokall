"use client";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { markerPicker } from "@/utils/utils";

export default function MapMarker({ place }) {
  const coords = place.location?.coordinates;
  const lat = Number(coords?.[0]);
  const lng = Number(coords?.[1]);

  // 🛡️ Validasi data
  if (!coords || isNaN(lat) || isNaN(lng)) return null;

  // 🎨 Bikin custom icon
  const customMarker = L.icon({
    iconUrl: markerPicker(place.category.id),
    iconSize: [45],
    iconAnchor: [22, 45],
    popupAnchor: [0, -40],
  });

  return (
    <Marker position={[lat, lng]} icon={customMarker}>
      <Popup>
        <div className="font-sans w-50 h-50">
          <h3 className="font-bold text-lg">{place.name}</h3>
          <p className="text-sm">
            Skor Aksesibilitas:{" "}
            <span className="font-semibold text-blue-600">
              {place.accessibility.score}%
            </span>
          </p>
        </div>
      </Popup>
    </Marker>
  );
}
