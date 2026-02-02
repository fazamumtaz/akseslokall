"use client";
import dynamic from "next/dynamic";
import SidebarPlace from "@/components/Map/SidebarPlace";
import { Activity, useState } from "react";

// 🔎 Panggil wrapper map-nya di sini
const MapComponent = dynamic(() => import("@/components/Map/MapComponent"), {
  ssr: false,
  loading: () => (
    <p className="h-full w-full flex items-center justify-center">
      Loading Map... ⏳
    </p>
  ),
});

export default function Home() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapComponent />
      </div>
      <SidebarPlace />
      <div className="h-10 w-64 border bg-white rounded shadow-2xl absolute top-5 right-5"></div>
    </main>
  );
}
