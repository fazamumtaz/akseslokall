"use client";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { markerPicker } from "@/utils/utils";
import { useRef } from "react";
import {
  MapPin,
  Star,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Accessibility,
  Navigation,
} from "lucide-react";

export default function MapMarker({ place, onMarkerClick }) {
  const markerRef = useRef(null);
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

  // Handle marker click - open sidebar
  const handleClick = () => {
    if (onMarkerClick) {
      onMarkerClick(place);
    }
  };

  // Handle mouse over - open popup
  const handleMouseOver = () => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  // Handle mouse out - close popup
  const handleMouseOut = () => {
    if (markerRef.current) {
      markerRef.current.closePopup();
    }
  };

  // Helper untuk warna aksesibilitas
  const getAccessibilityColor = (score) => {
    if (score >= 90)
      return { bg: "#10B981", text: "#065F46", light: "#ECFDF5" };
    if (score >= 70)
      return { bg: "#F59E0B", text: "#92400E", light: "#FFFBEB" };
    return { bg: "#EF4444", text: "#991B1B", light: "#FEF2F2" };
  };

  const accessColor = getAccessibilityColor(place.accessibility.score);
  const availableFacilities =
    place.accessibility?.facilities?.filter((f) => f.available) || [];

  return (
    <Marker
      position={[lat, lng]}
      icon={customMarker}
      ref={markerRef}
      eventHandlers={{
        click: handleClick,
        mouseover: handleMouseOver,
        mouseout: handleMouseOut,
      }}
    >
      <Popup
        closeButton={false}
        className="custom-popup"
        maxWidth={320}
        minWidth={280}
      >
        <style jsx global>{`
          .custom-popup .leaflet-popup-content-wrapper {
            background: white;
            border-radius: 16px;
            padding: 0;
            box-shadow:
              0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04),
              0 0 0 1px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            font-family: "Questrial", sans-serif;
          }

          .custom-popup .leaflet-popup-content {
            margin: 0;
            width: 100% !important;
          }

          .custom-popup .leaflet-popup-tip {
            background: white;
            box-shadow: 0 3px 14px rgba(0, 0, 0, 0.1);
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .custom-popup .leaflet-popup-content-wrapper {
            animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}</style>

        <div className="w-full">
          {/* Header Section dengan Category Badge */}
          <div
            className="relative px-4 pt-4 pb-3"
            style={{
              background: `linear-gradient(135deg, ${place.category.color}08 0%, ${place.category.color}03 100%)`,
            }}
          >
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{
                  background: place.category.color + "15",
                  color: place.category.color,
                  letterSpacing: "0.02em",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: place.category.color }}
                />
                {place.category.label}
              </span>

              {/* Verification Badge */}
              {place.metadata?.is_verified && (
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span className="font-semibold">Terverifikasi</span>
                </div>
              )}
            </div>

            {/* Place Name */}
            <h3
              className="font-bold text-lg leading-tight mb-2 text-gray-900"
              style={{
                letterSpacing: "-0.01em",
                lineHeight: "1.3",
              }}
            >
              {place.name}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-gray-500">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
              <span className="text-xs font-medium truncate">
                {place.location.city}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Accessibility Score - Hero Section */}
          <div
            className="px-4 py-3.5"
            style={{
              background: accessColor.light,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Circular Progress */}
                <div className="relative" style={{ width: 48, height: 48 }}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    className="-rotate-90"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="4"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke={accessColor.bg}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - place.accessibility.score / 100)}`}
                      style={{
                        transition:
                          "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-sm font-bold"
                      style={{ color: accessColor.bg }}
                    >
                      {place.accessibility.score}
                    </span>
                  </div>
                </div>

                {/* Score Info */}
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Accessibility
                      className="w-3.5 h-3.5"
                      style={{ color: accessColor.bg }}
                      strokeWidth={2.5}
                    />
                    <span
                      className="text-sm font-bold"
                      style={{ color: accessColor.text }}
                    >
                      Skor Aksesibilitas
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {place.accessibility.score >= 90
                      ? "Sangat Baik"
                      : place.accessibility.score >= 70
                        ? "Cukup Baik"
                        : "Perlu Perhatian"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Facility Count */}
            <div className="mt-3 pt-3 border-t border-gray-200/50">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  <span className="font-bold text-gray-900">
                    {availableFacilities.length}
                  </span>{" "}
                  fasilitas tersedia
                </span>
                {place.accessibility.status === "complete" ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                    Lengkap
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                    <AlertCircle className="w-3 h-3" strokeWidth={2.5} />
                    Sebagian
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Top Facilities Preview */}
          {availableFacilities.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                Fasilitas Utama
              </p>
              <div className="flex flex-wrap gap-1.5">
                {availableFacilities.slice(0, 4).map((facility) => (
                  <span
                    key={facility.id}
                    className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md"
                    style={{
                      background: "#f0fdf4",
                      color: "#166534",
                      border: "1px solid #86efac",
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                    {facility.label}
                  </span>
                ))}
                {availableFacilities.length > 4 && (
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 text-gray-500">
                    +{availableFacilities.length - 4} lainnya
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          {/* Rating Section */}
          <div className="px-4 py-3 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star
                    className="w-4 h-4 fill-amber-400 stroke-amber-400"
                    strokeWidth={2}
                  />
                  <span className="text-sm font-bold text-gray-900">
                    {place.rating || "4.5"}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  ({place.reviewCount || "0"} ulasan)
                </span>
              </div>

              {/* Quick Action Hint */}
              <div className="flex items-center gap-1 text-xs font-semibold text-gray-500">
                <Navigation className="w-3 h-3" strokeWidth={2.5} />
                <span>Klik untuk detail</span>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="px-4 py-3 bg-gray-900">
            <button
              onClick={handleClick}
              className="w-full group flex items-center justify-between px-3.5 py-2.5 bg-white rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-sm font-bold text-gray-900">
                Lihat Detail Lengkap
              </span>
              <ArrowRight
                className="w-4 h-4 text-gray-900 group-hover:translate-x-0.5 transition-transform"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
