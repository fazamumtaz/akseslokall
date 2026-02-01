export const LIST_LOCATION = [
  {
    id: "1",
    name: "Universitas Indonesia",
    category: { id: "kampus", label: "Pendidikan", color: "#4F46E5" },
    location: {
      address: "Jl. Margonda Raya, Beji, Depok",
      city: "Depok",
      coordinates: [-6.3605, 106.8303],
    },
    accessibility: {
      status: "complete",
      score: 92,
      description: "Aksesibilitas sangat baik dengan jalur pemandu.",
      facilities: [
        {
          id: "ramp",
          label: "Ramp",
          available: true,
          note: "Kemiringan standar",
        },
        {
          id: "braille",
          label: "Guiding Block",
          available: true,
          note: "Sepanjang trotoar kampus",
        },
      ],
    },
    media: {
      hero_image: "https://example.com/ui-hero.jpg",
      gallery: ["https://example.com/ui-1.jpg"],
    },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:00:00Z" },
  },
  {
    id: "2",
    name: "Masjid Istiqlal",
    category: { id: "ibadah", label: "Tempat Ibadah", color: "#10B981" },
    location: {
      address: "Jl. Taman Wijaya Kusuma, Jakarta Pusat",
      city: "Jakarta Pusat",
      coordinates: [-6.1702, 106.8314],
    },
    accessibility: {
      status: "complete",
      score: 95,
      description: "Tersedia lift khusus difabel menuju ruang utama.",
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
      ],
    },
    media: { hero_image: "https://example.com/istiqlal-hero.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:05:00Z" },
  },
  {
    id: "3",
    name: "Stasiun Gambir",
    category: { id: "transportasi", label: "Transportasi", color: "#F59E0B" },
    location: {
      address: "Jl. Medan Merdeka Timur No.1, Gambir",
      city: "Jakarta Pusat",
      coordinates: [-6.1768, 106.8307],
    },
    accessibility: {
      status: "partial",
      score: 85,
      description: "Fasilitas kursi roda tersedia di pintu masuk.",
      facilities: [
        {
          id: "wheelchair",
          label: "Kursi Roda",
          available: true,
          note: "Pinjam di customer service",
        },
        {
          id: "tactile",
          label: "Ubin Taktil",
          available: true,
          note: "Area peron",
        },
      ],
    },
    media: { hero_image: "https://example.com/gambir.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:10:00Z" },
  },
  {
    id: "4",
    name: "RSUP Nasional Dr. Cipto Mangunkusumo",
    category: { id: "kesehatan", label: "Kesehatan", color: "#EF4444" },
    location: {
      address: "Jl. Pangeran Diponegoro No.71, Senen",
      city: "Jakarta Pusat",
      coordinates: [-6.1969, 106.8451],
    },
    accessibility: {
      status: "complete",
      score: 98,
      description: "Standar medis internasional untuk aksesibilitas.",
      facilities: [
        {
          id: "emergency_ramp",
          label: "Ramp IGD",
          available: true,
          note: "Akses 24 jam",
        },
        {
          id: "handrail",
          label: "Pegangan Tangan",
          available: true,
          note: "Di seluruh koridor",
        },
      ],
    },
    media: { hero_image: "https://example.com/rscm.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:15:00Z" },
  },
  {
    id: "5",
    name: "Grand Indonesia",
    category: { id: "perbelanjaan", label: "Perbelanjaan", color: "#EC4899" },
    location: {
      address: "Jl. MH Thamrin No.1, Menteng",
      city: "Jakarta Pusat",
      coordinates: [-6.1951, 106.8231],
    },
    accessibility: {
      status: "complete",
      score: 94,
      description: "Ramah kursi roda di semua area belanja.",
      facilities: [
        {
          id: "parking",
          label: "Parkir Difabel",
          available: true,
          note: "Dekat lobi utama",
        },
        {
          id: "toilet",
          label: "Toilet Luas",
          available: true,
          note: "Setiap lantai",
        },
      ],
    },
    media: { hero_image: "https://example.com/gi.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:20:00Z" },
  },
  {
    id: "6",
    name: "Taman Mini Indonesia Indah",
    category: { id: "wisata", label: "Wisata/Taman", color: "#8B5CF6" },
    location: {
      address: "Jl. Cipayung Raya, Jakarta Timur",
      city: "Jakarta Timur",
      coordinates: [-6.3024, 106.8951],
    },
    accessibility: {
      status: "partial",
      score: 78,
      description: "Area luas, beberapa paviliun butuh pendamping.",
      facilities: [
        {
          id: "shuttle",
          label: "Bus Ramah Difabel",
          available: true,
          note: "Tersedia di area halte",
        },
        {
          id: "wide_path",
          label: "Jalur Lebar",
          available: true,
          note: "Aspal mulus",
        },
      ],
    },
    media: { hero_image: "https://example.com/tmii.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:25:00Z" },
  },
  {
    id: "7",
    name: "Institut Teknologi Bandung (Kampus Jatinangor)",
    category: { id: "kampus", label: "Pendidikan", color: "#4F46E5" },
    location: {
      address: "Jl. Raya Bandung-Sumedang Km.21",
      city: "Sumedang",
      coordinates: [-6.9271, 107.7736],
    },
    accessibility: {
      status: "partial",
      score: 82,
      description: "Kontur tanah berbukit, ramp tersedia di gedung baru.",
      facilities: [
        {
          id: "ramp",
          label: "Ramp Gedung",
          available: true,
          note: "Gedung GKU",
        },
        {
          id: "signage",
          label: "Papan Informasi",
          available: true,
          note: "Kontras tinggi",
        },
      ],
    },
    media: { hero_image: "https://example.com/itb.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:30:00Z" },
  },
  {
    id: "8",
    name: "Gereja Katedral Jakarta",
    category: { id: "ibadah", label: "Tempat Ibadah", color: "#10B981" },
    location: {
      address: "Jl. Katedral No.7, Pasar Baru",
      city: "Jakarta Pusat",
      coordinates: [-6.1692, 106.8333],
    },
    accessibility: {
      status: "complete",
      score: 90,
      description: "Area masuk rata dan ramah bagi lansia/difabel.",
      facilities: [
        {
          id: "flat_entrance",
          label: "Akses Tanpa Tangga",
          available: true,
          note: "Pintu samping",
        },
        {
          id: "seating",
          label: "Kursi Prioritas",
          available: true,
          note: "Baris depan",
        },
      ],
    },
    media: { hero_image: "https://example.com/katedral.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:35:00Z" },
  },
  {
    id: "9",
    name: "Bandara Internasional Soekarno-Hatta (T3)",
    category: { id: "transportasi", label: "Transportasi", color: "#F59E0B" },
    location: {
      address: "Pajang, Benda, Tangerang City",
      city: "Tangerang",
      coordinates: [-6.1256, 106.6559],
    },
    accessibility: {
      status: "complete",
      score: 99,
      description: "Fasilitas kelas dunia untuk kenyamanan semua orang.",
      facilities: [
        {
          id: "travelator",
          label: "Travelator",
          available: true,
          note: "Sangat panjang",
        },
        {
          id: "assistance",
          label: "Staf Pendamping",
          available: true,
          note: "Panggil via interkom",
        },
      ],
    },
    media: { hero_image: "https://example.com/t3.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:40:00Z" },
  },
  {
    id: "10",
    name: "Botani Square Mall",
    category: { id: "perbelanjaan", label: "Perbelanjaan", color: "#EC4899" },
    location: {
      address: "Jl. Raya Pajajaran, Bogor Tengah",
      city: "Bogor",
      coordinates: [-6.6015, 106.8061],
    },
    accessibility: {
      status: "complete",
      score: 88,
      description: "Akses terintegrasi dengan terminal bus Damri.",
      facilities: [
        {
          id: "elevator",
          label: "Elevator Luas",
          available: true,
          note: "Dekat department store",
        },
        {
          id: "braille_button",
          label: "Tombol Braille",
          available: true,
          note: "Di dalam lift",
        },
      ],
    },
    media: { hero_image: "https://example.com/botani.jpg", gallery: [] },
    metadata: { is_verified: true, updated_at: "2026-01-31T12:45:00Z" },
  },
];
