"use client";
// ✅ Import dynamic dari Next.js
dynamic(() => import("leaflet/dist/leaflet.css")); // Import CSS-nya di sini
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { LIST_LOCATION } from "@/location";
import SidebarPlace from "@/components/SidebarPlace";

const position = [-6.1702, 106.8314];

// 🔎 Kita bungkus Map-nya jadi komponen terpisah biar bisa di-load secara dinamis
const MapContent = dynamic(
  async () => {
    const L = await import("leaflet"); // 💡 Import L secara eksplisit di sini
    const { MapContainer, TileLayer, Marker, Popup } =
      await import("react-leaflet");

    return (props) => (
      <MapContainer {...props}>
        <TileLayer
          url="https://tile.jawg.io/jawg-lagoon/{z}/{x}/{y}{r}.png?access-token=sQz1rPefoLTumwHeCfgtoK66dV7TyL4pQtCNbJ0GxkdeRFuMIEfr1dvsSPnI5WGl"
          attribution="..."
        />

        {LIST_LOCATION.map((place, index) => {
          // 🛡️ Validasi: Pastikan koordinat ada dan bukan NaN
          const coords = place.location?.coordinates;
          if (!coords || isNaN(coords[0]) || isNaN(coords[1])) return null;

          const customMarker = L.icon({
            iconUrl: markerPicker(place.category.id),
            iconSize: [45], // 📏 Sebaiknya kasih [width, height] biar stabil
            iconAnchor: [16, 32],
          });

          return (
            <Marker
              key={place.id || index} // 🔑 Pake ID unik kalo ada
              position={coords}
              icon={customMarker}
            >
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold">{place.name}</h3>
                  <p className="text-sm">
                    Skor Aksesibilitas: {place.accessibility.score}%
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    );
  },
  { ssr: false, loading: () => <p>Loading Map... ⏳</p> },
);

function markerPicker(place) {
  switch (place) {
    case "ibadah":
      return "/ibadah.png";
      break;
    case "kampus":
      return "/pendidikan.png";
      break;
    case "transportasi":
      return "/transportation.png";
      break;
    case "kesehatan":
      return "/hospital.png";
      break;
    case "perbelanjaan":
      return "/shopping.png";
      break;
    case "wisata":
      return "/tourism.png";
      break;
  }
}

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* 🗺️ Map sebagai background (layer bawah) */}
      <div className="absolute inset-0 z-0">
        <MapContent
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
        />
      </div>

      <SidebarPlace />
    </main>
  );
}
