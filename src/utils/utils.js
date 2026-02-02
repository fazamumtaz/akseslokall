export function markerPicker(categoryId) {
  const map = {
    ibadah: "/ibadah.png",
    kampus: "/pendidikan.png",
    transportasi: "/transportation.png",
    kesehatan: "/hospital.png",
    perbelanjaan: "/shopping.png",
    wisata: "/tourism.png",
  };
  return map[categoryId] || "/default-marker.png";
}
