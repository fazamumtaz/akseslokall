"use client";
import { useState } from "react";
import {
  MapPin,
  Star,
  Bookmark,
  Share2,
  X,
  ArrowLeft,
  Check,
  X as XIcon,
  ChevronDown,
  ChevronUp,
  Info,
  Wifi,
  Car,
  Wind,
  Waves,
  AlertCircle,
} from "lucide-react";

// ─── SAMPLE DATA (mirrors location.js shape) ───────────────────────────────
const PLACE = {
  id: "2",
  name: "Masjid Istiqlal",
  category: { id: "ibadah", label: "Tempat Ibadah", color: "#10B981" },
  location: {
    address: "Jl. Taman Wijaya Kusuma, Jakarta Pusat",
    city: "Jakarta Pusat",
    coordinates: [-6.1702, 106.8314],
  },
  rating: 4.7,
  reviewCount: 234,
  accessibility: {
    status: "complete",
    score: 95,
    description:
      "Tersedia lift khusus difabel menuju ruang utama. Fasilitas sangat lengkap dan memenuhi standar aksesibilitas internasional. Area wudu duduk juga tersedia untuk kenyamanan maksimal bagi pengunjung dengan kebutuhan khusus.",
    facilities: [
      {
        id: "lift",
        label: "Lift Khusus",
        available: true,
        note: "Akses ke lantai 2",
      },
      {
        id: "wudu",
        label: "Area Wudu Duduk",
        available: true,
        note: "Tersedia kursi",
      },
      {
        id: "ramp",
        label: "Ramp",
        available: true,
        note: "Kemiringan standar",
      },
      {
        id: "guiding",
        label: "Guiding Block",
        available: true,
        note: "Sepanjang trotoar",
      },
      {
        id: "parking",
        label: "Parkir Difabel",
        available: true,
        note: "Dekat pintu utama",
      },
      {
        id: "toilet",
        label: "Toilet Aksesibel",
        available: true,
        note: "Lantai 1 & 2",
      },
      {
        id: "wifi",
        label: "WiFi Gratis",
        available: false,
        note: "Belum tersedia",
      },
      {
        id: "ac",
        label: "Jalur Taktil",
        available: false,
        note: "Sedang direncanakan",
      },
    ],
  },
  gallery: [
    "https://images.unsplash.com/photo-1584823206827-04cd6a6fdd5c?w=800&q=80",
    "https://images.unsplash.com/photo-1584823206827-04cd6a6fdd5c?w=400&q=80&seed=2",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80",
    "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=400&q=80",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80&seed=3",
  ],
  metadata: { is_verified: true, updated_at: "2026-01-31T12:05:00Z" },
};

// ─── SAMPLE REVIEWS ─────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: "r1",
    user: { name: "Rina Pratiwi", avatar: "RP", verified: true },
    rating: 5,
    date: "28 Jan 2026",
    text: "Fasilitas aksesibilitas di sini sangat lengkap. Lift khusus difabel berfungsi dengan baik dan staf sangat membantu. Ramp menuju pintu utama juga sangat nyaman digunakan dengan kursi roda.",
    helpful: 24,
  },
  {
    id: "r2",
    user: { name: "Budi Santoso", avatar: "BS", verified: true },
    rating: 4,
    date: "22 Jan 2026",
    text: "Guiding block sangat membantu untuk navigasi. Satu catatan kecil: area parkir difabel kadang penuh di hari akhir pekan. Secara keseluruhan tempat ini sangat ramah untuk pengguna kursi roda.",
    helpful: 17,
  },
  {
    id: "r3",
    user: { name: "Dewi Kartika", avatar: "DK", verified: false },
    rating: 5,
    date: "15 Jan 2026",
    text: "Sebagai pengguna kursi roda, saya sangat puas. Toilet aksesibel tersedia di setiap lantai dan sangat bersih. Jalur dari parkir ke dalam gedung juga mulus tanpa hambatan.",
    helpful: 31,
  },
  {
    id: "r4",
    user: { name: "Ahmad Hidayat", avatar: "AH", verified: true },
    rating: 3,
    date: "10 Jan 2026",
    text: "Fasilitas dasar cukup baik, namun jalur taktil di beberapa area tampak kurang terawat. WiFi juga belum tersedia saat kunjungan terakhir saya. Semoga segera diperbaiki.",
    helpful: 9,
  },
  {
    id: "r5",
    user: { name: "Sari Lestari", avatar: "SL", verified: true },
    rating: 4,
    date: "3 Jan 2026",
    text: "Area wudu duduk sangat thoughtful — kursi yang disediakan nyaman dan ruangan bersih. Lift juga responsif. Rekomendasi untuk dikunjungi.",
    helpful: 14,
  },
];

// ─── STAR RENDERER ──────────────────────────────────────────────────────────
const Stars = ({ rating, size = "w-3.5 h-3.5" }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`${size} ${i <= rating ? "fill-amber-400 stroke-amber-400" : "fill-gray-200 stroke-gray-200"}`}
      />
    ))}
  </div>
);

// ─── HELPERS ────────────────────────────────────────────────────────────────
const scoreColor = (score) => {
  if (score >= 90)
    return {
      bg: "#10B981",
      light: "#ECFDF5",
      text: "#065F46",
      label: "Sangat Baik",
    };
  if (score >= 70)
    return {
      bg: "#F59E0B",
      light: "#FFFBEB",
      text: "#92400E",
      label: "Cukup Baik",
    };
  return {
    bg: "#EF4444",
    light: "#FEF2F2",
    text: "#991B1B",
    label: "Perlu Perhatian",
  };
};

const FacilityIcon = ({ id }) => {
  const cls = "w-4.5 h-4.5";
  switch (id) {
    case "wifi":
      return <Wifi className={cls} />;
    case "parking":
      return <Car className={cls} />;
    case "ac":
      return <Wind className={cls} />;
    case "wudu":
      return <Waves className={cls} />;
    default:
      return <Check className={cls} />;
  }
};

const TABS = ["Overview", "Facilities", "Reviews", "Location"];

// ─── SVG MINI-MAP ───────────────────────────────────────────────────────────
const MiniMap = () => (
  <svg
    viewBox="0 0 400 220"
    className="w-full h-full"
    style={{ background: "#f0ece3" }}
  >
    <g stroke="#d6cfc0" strokeWidth="18" fill="none">
      <line x1="0" y1="60" x2="400" y2="60" />
      <line x1="0" y1="140" x2="400" y2="140" />
      <line x1="80" y1="0" x2="80" y2="220" />
      <line x1="200" y1="0" x2="200" y2="220" />
      <line x1="320" y1="0" x2="320" y2="220" />
    </g>
    <g stroke="#c8c0b0" strokeWidth="2" strokeDasharray="12 8" fill="none">
      <line x1="0" y1="60" x2="400" y2="60" />
      <line x1="0" y1="140" x2="400" y2="140" />
      <line x1="80" y1="0" x2="80" y2="220" />
      <line x1="200" y1="0" x2="200" y2="220" />
      <line x1="320" y1="0" x2="320" y2="220" />
    </g>
    <rect x="90" y="10" width="100" height="40" rx="3" fill="#e8e0d0" />
    <rect x="210" y="10" width="100" height="40" rx="3" fill="#e8e0d0" />
    <rect x="90" y="70" width="100" height="60" rx="3" fill="#ddd5c5" />
    <rect x="210" y="70" width="100" height="60" rx="3" fill="#e8e0d0" />
    <rect x="90" y="150" width="100" height="60" rx="3" fill="#e8e0d0" />
    <rect x="210" y="150" width="100" height="60" rx="3" fill="#ddd5c5" />
    <rect x="330" y="70" width="60" height="60" rx="3" fill="#e8e0d0" />
    <rect x="10" y="70" width="60" height="60" rx="3" fill="#e8e0d0" />
    <text
      x="140"
      y="95"
      textAnchor="middle"
      fontSize="9"
      fill="#9a9080"
      fontFamily="sans-serif"
    >
      Taman Wijaya
    </text>
    <text
      x="260"
      y="110"
      textAnchor="middle"
      fontSize="9"
      fill="#9a9080"
      fontFamily="sans-serif"
    >
      Lapangan Merdeka
    </text>
    <ellipse cx="200" cy="118" rx="10" ry="4" fill="rgba(0,0,0,0.15)" />
    <circle
      cx="200"
      cy="100"
      r="18"
      fill="white"
      stroke="#111"
      strokeWidth="3"
    />
    <circle cx="200" cy="100" r="6" fill="#111" />
  </svg>
);

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function DetailPlace() {
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [showMore, setShowMore] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [expandedFacility, setExpandedFacility] = useState(null);

  // reviews state
  const [reviews, setReviews] = useState(REVIEWS);
  const [newComment, setNewComment] = useState("");
  const [hoverStar, setHoverStar] = useState(0);
  const [pickedStar, setPickedStar] = useState(0);
  const [helpfulMap, setHelpfulMap] = useState({});

  const place = PLACE;
  const color = scoreColor(place.accessibility.score);
  const avail = place.accessibility.facilities.filter((f) => f.available);
  const unavail = place.accessibility.facilities.filter((f) => !f.available);

  const desc = place.accessibility.description;
  const truncated = desc.length > 160;
  const displayDesc = showMore || !truncated ? desc : desc.slice(0, 160) + "…";

  // ring progress
  const R = 28;
  const circ = 2 * Math.PI * R;
  const progress = circ - (place.accessibility.score / 100) * circ;

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Questrial', sans-serif" }}
    >
      {/* ─── TOP NAV ─── */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            Menu
          </span>
        </div>
        <span className="text-lg font-bold tracking-widest text-black uppercase">
          LORDSKY
        </span>
        <button className="text-xs text-gray-500 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50 transition-colors">
          Become a Partner
        </button>
      </header>

      <div className="max-w-2xl mx-auto px-4 pt-6 pb-24">
        {/* ─── TITLE + META ─── */}
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-4">
            <span
              className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2"
              style={{
                background: place.category.color + "15",
                color: place.category.color,
              }}
            >
              {place.category.label}
            </span>
            <h1
              className="text-2xl font-bold text-black leading-tight"
              style={{ letterSpacing: "-.02em" }}
            >
              {place.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                <span className="text-sm font-semibold text-black">
                  {place.rating}
                </span>
                <span className="text-sm text-gray-400">
                  ({place.reviewCount})
                </span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 stroke-gray-400" />
                <span className="text-sm text-gray-400">
                  {place.location.city}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setSaved(!saved)}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-all"
            >
              <Bookmark
                className={`w-4.5 h-4.5 transition-colors ${saved ? "fill-black stroke-black" : "stroke-gray-500"}`}
              />
            </button>
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-all">
              <Share2 className="w-4.5 h-4.5 stroke-gray-500" />
            </button>
          </div>
        </div>

        {/* ─── GALLERY ─── */}
        <div
          className="mt-5 grid grid-cols-3 grid-rows-2 gap-2"
          style={{ height: 220 }}
        >
          <div
            className="row-span-2 rounded-xl overflow-hidden cursor-pointer"
            onClick={() => setLightbox(0)}
          >
            <img
              src={place.gallery[0]}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              <img
                src={place.gallery[i]}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
          <div
            className="rounded-xl overflow-hidden cursor-pointer relative"
            onClick={() => setLightbox(4)}
          >
            <img
              src={place.gallery[4]}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
              <span className="text-white text-lg font-bold">
                +{place.gallery.length - 4}
              </span>
            </div>
          </div>
        </div>

        {/* ─── LIGHTBOX ─── */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setLightbox(null)}
            >
              <X className="w-7 h-7" />
            </button>
            <img
              src={place.gallery[lightbox]}
              alt=""
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* ─── ACCESSIBILITY SCORE BANNER ─── */}
        <div
          className="mt-6 rounded-2xl p-5 flex items-center gap-5"
          style={{
            background: color.light,
            border: `1.5px solid ${color.bg}22`,
          }}
        >
          {/* circular progress ring */}
          <div
            className="flex-shrink-0 relative"
            style={{ width: 72, height: 72 }}
          >
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              className="-rotate-90"
            >
              <circle
                cx="36"
                cy="36"
                r={R}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="7"
              />
              <circle
                cx="36"
                cy="36"
                r={R}
                fill="none"
                stroke={color.bg}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={progress}
                style={{
                  transition: "stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)",
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold" style={{ color: color.bg }}>
                {place.accessibility.score}%
              </span>
            </div>
          </div>

          {/* text side */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-base font-bold"
                style={{ color: color.text }}
              >
                Aksesibilitas {color.label}
              </span>
              {place.accessibility.status === "complete" && (
                <span
                  className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full"
                  style={{ background: color.bg, color: "#fff" }}
                >
                  <Check className="w-3 h-3" /> Lengkap
                </span>
              )}
              {place.accessibility.status === "partial" && (
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                  <AlertCircle className="w-3 h-3" /> Sebagian
                </span>
              )}
            </div>
            <p className="text-xs mt-1" style={{ color: color.text + "bb" }}>
              {avail.length} fasilitas tersedia · {unavail.length} belum
              tersedia
            </p>
          </div>
        </div>

        {/* ─── TABS ─── */}
        <div className="mt-6 flex gap-1 border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative text-sm px-4 py-2.5 transition-colors"
              style={{ color: activeTab === tab ? "#111" : "#9ca3af" }}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-black rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════
            TAB → OVERVIEW
            ════════════════════════════════════════ */}
        {activeTab === "Overview" && (
          <div className="mt-5">
            <h2 className="text-base font-bold text-black mb-2">
              Tentang Tempat Ini
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              {displayDesc}
            </p>
            {truncated && (
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-sm font-semibold text-black mt-1.5 hover:underline"
              >
                {showMore ? "Lebih Sedikit" : "Baca Lebih Banyak"}
              </button>
            )}

            {/* quick-scan facility chips */}
            <h2 className="text-base font-bold text-black mt-6 mb-3">
              Fasilitas Aksesibilitas
            </h2>
            <div className="flex flex-wrap gap-2">
              {place.accessibility.facilities.map((f) => (
                <span
                  key={f.id}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{
                    background: f.available ? "#f0fdf4" : "#f9fafb",
                    borderColor: f.available ? "#86efac" : "#e5e7eb",
                    color: f.available ? "#166534" : "#6b7280",
                  }}
                >
                  {f.available ? (
                    <Check
                      className="w-3 h-3 stroke-green-600"
                      strokeWidth={3}
                    />
                  ) : (
                    <XIcon
                      className="w-3 h-3 stroke-gray-400"
                      strokeWidth={3}
                    />
                  )}
                  {f.label}
                </span>
              ))}
            </div>

            {/* info note */}
            <div className="mt-5 flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-3">
              <Info className="w-4 h-4 stroke-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-600 leading-relaxed">
                Skor aksesibilitas dihitung berdasarkan ketersediaan fasilitas
                yang telah diverifikasi secara langsung. Untuk informasi lebih
                detail, kunjungi tab <strong>Fasilitas</strong>.
              </p>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
            TAB → FACILITIES (accordion detail)
            ════════════════════════════════════════ */}
        {activeTab === "Facilities" && (
          <div className="mt-5">
            {/* Available group */}
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-black">Tersedia</h2>
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                {avail.length} fasilitas
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {avail.map((f) => (
                <div
                  key={f.id}
                  className="border border-green-200 rounded-xl overflow-hidden"
                  style={{ background: "#f9fdfb" }}
                >
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-left"
                    onClick={() =>
                      setExpandedFacility(
                        expandedFacility === f.id ? null : f.id,
                      )
                    }
                  >
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <FacilityIcon id={f.id} />
                    </div>
                    <span className="flex-1 text-sm font-semibold text-black min-w-0 truncate">
                      {f.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex-shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} /> Tersedia
                    </span>
                    {expandedFacility === f.id ? (
                      <ChevronUp className="w-4 h-4 stroke-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 stroke-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFacility === f.id && (
                    <div className="px-4 pb-3">
                      <div className="border-t border-green-200 pt-2.5 ml-12">
                        <p className="text-xs text-gray-500 leading-relaxed">
                          <strong className="text-gray-600">Catatan:</strong>{" "}
                          {f.note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Not-available group */}
            {unavail.length > 0 && (
              <>
                <div className="flex items-center justify-between mt-6 mb-3">
                  <h2 className="text-base font-bold text-black">
                    Belum Tersedia
                  </h2>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {unavail.length} fasilitas
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {unavail.map((f) => (
                    <div
                      key={f.id}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                      style={{ background: "#fafafa" }}
                    >
                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-left"
                        onClick={() =>
                          setExpandedFacility(
                            expandedFacility === f.id ? null : f.id,
                          )
                        }
                      >
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <FacilityIcon id={f.id} />
                        </div>
                        <span className="flex-1 text-sm font-semibold text-gray-400 min-w-0 truncate">
                          {f.label}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full flex-shrink-0">
                          <XIcon className="w-3 h-3" strokeWidth={3} /> Tidak
                          Ada
                        </span>
                        {expandedFacility === f.id ? (
                          <ChevronUp className="w-4 h-4 stroke-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 stroke-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFacility === f.id && (
                        <div className="px-4 pb-3">
                          <div className="border-t border-gray-200 pt-2.5 ml-12">
                            <p className="text-xs text-gray-500 leading-relaxed">
                              <strong className="text-gray-600">
                                Catatan:
                              </strong>{" "}
                              {f.note}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════
            TAB → REVIEWS
            ════════════════════════════════════════ */}
        {activeTab === "Reviews" &&
          (() => {
            // ── derived stats ──
            const avgRating =
              reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
            const distribution = [5, 4, 3, 2, 1].map((star) => ({
              star,
              count: reviews.filter((r) => r.rating === star).length,
            }));
            const maxCount = Math.max(...distribution.map((d) => d.count));

            // ── submit handler ──
            const handleSubmit = () => {
              if (!newComment.trim() || pickedStar === 0) return;
              setReviews((prev) => [
                {
                  id: "r_new_" + Date.now(),
                  user: { name: "Anda", avatar: "AD", verified: false },
                  rating: pickedStar,
                  date: new Date().toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }),
                  text: newComment.trim(),
                  helpful: 0,
                },
                ...prev,
              ]);
              setNewComment("");
              setPickedStar(0);
            };

            // ── helpful toggle ──
            const toggleHelpful = (id) => {
              setHelpfulMap((prev) => ({ ...prev, [id]: !prev[id] }));
            };

            return (
              <div className="mt-5">
                {/* ── summary row: big number + bar chart ── */}
                <div className="flex items-start gap-5 mb-6">
                  {/* left: big avg */}
                  <div className="flex flex-col items-center flex-shrink-0 w-20">
                    <span className="text-4xl font-bold text-black leading-none">
                      {avgRating.toFixed(1)}
                    </span>
                    <Stars rating={Math.round(avgRating)} size="w-3 h-3" />
                    <span className="text-xs text-gray-400 mt-1">
                      {reviews.length} ulasan
                    </span>
                  </div>
                  {/* right: distribution bars */}
                  <div className="flex-1 flex flex-col gap-1.5 pt-0.5">
                    {distribution.map((d) => (
                      <div key={d.star} className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 w-2 text-right flex-shrink-0">
                          {d.star}
                        </span>
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400 flex-shrink-0" />
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                            style={{
                              width: maxCount
                                ? `${(d.count / maxCount) * 100}%`
                                : "0%",
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 w-5 text-right flex-shrink-0">
                          {d.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── write a review ── */}
                <div
                  className="border border-gray-200 rounded-2xl p-4 mb-6"
                  style={{ background: "#fafafa" }}
                >
                  <h3 className="text-sm font-bold text-black mb-3">
                    Tulis Ulasan
                  </h3>

                  {/* interactive star picker */}
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        onMouseEnter={() => setHoverStar(i)}
                        onMouseLeave={() => setHoverStar(0)}
                        onClick={() => setPickedStar(i)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className="w-6 h-6 transition-colors"
                          style={{
                            fill:
                              (hoverStar || pickedStar) >= i
                                ? "#FBBF24"
                                : "#e5e7eb",
                            stroke:
                              (hoverStar || pickedStar) >= i
                                ? "#FBBF24"
                                : "#e5e7eb",
                          }}
                        />
                      </button>
                    ))}
                    {pickedStar > 0 && (
                      <span className="text-xs text-gray-400 ml-2">
                        {
                          [
                            "",
                            "Sangat Buruk",
                            "Buruk",
                            "Cukup",
                            "Baik",
                            "Sangat Baik",
                          ][pickedStar]
                        }
                      </span>
                    )}
                  </div>

                  {/* textarea */}
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Bagikan pengalaman aksesibilitas Anda di sini…"
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-black placeholder-gray-400 resize-none outline-none focus:border-gray-400 transition-colors"
                    style={{ background: "#fff" }}
                  />

                  {/* submit row */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">
                      {newComment.length > 0 || pickedStar > 0
                        ? pickedStar === 0
                          ? "Pilih rating dulu"
                          : newComment.trim().length === 0
                            ? "Tulis ulasan dulu"
                            : ""
                        : ""}
                    </span>
                    <button
                      onClick={handleSubmit}
                      disabled={!newComment.trim() || pickedStar === 0}
                      className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all"
                      style={{
                        background:
                          newComment.trim() && pickedStar > 0
                            ? "#111"
                            : "#e5e7eb",
                        color:
                          newComment.trim() && pickedStar > 0
                            ? "#fff"
                            : "#9ca3af",
                        cursor:
                          newComment.trim() && pickedStar > 0
                            ? "pointer"
                            : "not-allowed",
                      }}
                    >
                      Kirim Ulasan
                    </button>
                  </div>
                </div>

                {/* ── review cards list ── */}
                <div className="flex flex-col gap-4">
                  {reviews.map((r) => {
                    const isHelpful = helpfulMap[r.id];
                    return (
                      <div
                        key={r.id}
                        className="border border-gray-100 rounded-2xl p-4"
                        style={{ background: "#fff" }}
                      >
                        {/* top row: avatar + meta */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {/* avatar circle with initials */}
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                              style={{
                                background: `hsl(${(r.user.avatar.charCodeAt(0) * 7) % 360}, 55%, 52%)`,
                              }}
                            >
                              {r.user.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm font-semibold text-black">
                                  {r.user.name}
                                </span>
                                {r.user.verified && (
                                  <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full">
                                    <Check
                                      className="w-2.5 h-2.5"
                                      strokeWidth={3}
                                    />{" "}
                                    Terverifikasi
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Stars rating={r.rating} size="w-3 h-3" />
                                <span className="text-xs text-gray-400">
                                  {r.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* body */}
                        <p className="text-sm text-gray-500 leading-relaxed mt-3">
                          {r.text}
                        </p>

                        {/* helpful button */}
                        <div className="flex items-center gap-1.5 mt-3">
                          <span className="text-xs text-gray-400">
                            Membantu?
                          </span>
                          <button
                            onClick={() => toggleHelpful(r.id)}
                            className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border transition-all"
                            style={{
                              background: isHelpful ? "#f0fdf4" : "#f9fafb",
                              borderColor: isHelpful ? "#86efac" : "#e5e7eb",
                              color: isHelpful ? "#166534" : "#6b7280",
                            }}
                          >
                            👍 {r.helpful + (isHelpful ? 1 : 0)}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

        {/* ════════════════════════════════════════
            TAB → LOCATION
            ════════════════════════════════════════ */}
        {activeTab === "Location" && (
          <div className="mt-5">
            <div
              className="rounded-2xl overflow-hidden border border-gray-200"
              style={{ height: 220 }}
            >
              <MiniMap />
            </div>
            <div className="mt-3 flex items-start gap-2">
              <MapPin className="w-4 h-4 stroke-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-black">
                  {place.location.address}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {place.location.city}
                </p>
              </div>
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
              <span className="text-xs text-gray-400 font-medium">
                Koordinat
              </span>
              <span className="text-xs text-gray-600 font-semibold">
                {place.location.coordinates[0].toFixed(4)},{" "}
                {place.location.coordinates[1].toFixed(4)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
