import {
  Accessibility,
  Bookmark,
  ChevronRight,
  Footprints,
  Heart,
  MapPin,
  MoveRight,
  Route,
  Share2,
  SquareArrowUp,
  Star,
  Toilet,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const SidebarPlace = ({ place, onClose }) => {
  const [liked, setLiked] = useState(false);
  const [save, setSave] = useState(false);
  const [image, setImage] = useState(0);

  const images = [
    "https://cdn.rri.co.id/berita/Purwokerto/o/1764660756514-WhatsApp_Image_2025-11-27_at_11.25.47_AM/z1rouc9vvmho5c3.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlsFMopPXfcNMRxrPN2QZgAoeHiJ14FBgX1A&s",
    "https://awsimages.detik.net.id/community/media/visual/2024/06/28/kampus-unsoed_169.jpeg?w=600&q=90",
  ];

  const handleNextCarousel = () => {
    image === images.length - 1 ? setImage(0) : setImage((image) => image + 1);
  };

  return (
    <div className="absolute z-1000 w-full max-w-md h-[98%] top-1/2 -translate-y-1/2 left-2 rounded-xl bg-white shadow-2xl flex flex-col p-5 overflow-y-auto">
      <div className="w-full h-50 rounded-lg relative bg-black">
        <img
          src={images[image]}
          alt=""
          className="w-full h-full object-contain object-center"
        />
        <div
          onClick={handleNextCarousel}
          className="absolute top-1/2 -translate-y-1/2 right-2 shadow-2xl cursor-pointer p-1 rounded-full bg-black/50"
        >
          <ChevronRight className="w-5 h-5 stroke-white" />
        </div>
      </div>

      {/* judul */}
      <div className="w-full mt-5 flex">
        <div className="flex flex-col">
          <h1 className="text-3xl text-black font-bold leading-8.5 tracking-wide">
            Universitas Jendral Soedirman
          </h1>
          <div className="flex mt-3 gap-1 items-center">
            <MapPin className="stroke-gray-500 w-5.5 h-5.5" />
            <p className="text-gray-500 text-md font-mediumddddddddddddddddddddddddddddd">
              Purwokerto, Jawa Tengah
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1">
            <Star className="fill-amber-300 stroke-amber-300 w-5 h-5" />
            <span className="text-black mt-0.5 text-lg">4.5/5</span>
          </div>
          <span className="text-gray-400 text-sm">(339)</span>
        </div>
      </div>

      <div className="w-full border border-black/10 my-5 rounded"></div>

      <div className="">
        <p className="text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          exercitationem modi earum quae natus nemo distinctio nesciunt, harum
          numquam, autem totam inventore perspiciatis molestias, iste ut!
        </p>
      </div>

      <div className="w-full mt-5 flex space-x-5 justify-evenly">
        <div className="flex flex-col items-center gap-1">
          <div
            onClick={() => setLiked((liked) => !liked)}
            className={`p-3 border-2 ${liked ? "border-transparent" : "border-black/20 bg-white"} rounded-full w-fit bg-red-500/30 transition duration-150 ease-in-out transform active:scale-90`}
          >
            <Heart
              className={` ${liked ? "stroke-red-500" : "stroke-black"} w-6 h-6  ${liked ? "fill-red-500" : "fill-transparent"}`}
            />
          </div>
          <p className="text-black select-none">Suka</p>
        </div>
        {/*  */}
        <div className="flex flex-col items-center gap-1">
          <div
            onClick={() => setSave((save) => !save)}
            className={`p-3 border-2 ${save ? "border-transparent" : "border-black/20 bg-white"} rounded-full w-fit ${save ? "bg-yellow-500/30" : "bg-white"}`}
          >
            <Bookmark
              className={` ${save ? "stroke-yellow-500" : "stroke-black"} w-6 h-6  ${save ? "fill-yellow-500" : "fill-transparent"}`}
            />
          </div>
          <p className="text-black">Simpan</p>
        </div>
        {/*  */}
        <div className="flex flex-col items-center gap-1">
          <div className={`p-3 border-2 border-black/20 rounded-full w-fit`}>
            <Share2 className={`stroke-black w-6 h-6fill-transparent`} />
          </div>
          <p className="text-black">Bagikan</p>
        </div>
      </div>

      <div className="w-full border border-black/10 my-5 rounded"></div>

      {/* facilities */}
      <div className="flex flex-wrap gap-1">
        <div className="py-1.5 px-2.5 pr-3 rounded-full flex items-center gap-1 border-2 border-gray-400">
          <SquareArrowUp className="w-4 h-4 stroke-gray-700" />
          <span className="text-gray-700 text-sm">Lift</span>
        </div>
        <div className="py-1.5 px-2.5 pr-3 rounded-full flex items-center gap-1 border-2 border-gray-400">
          <Accessibility className="w-4 h-4 stroke-gray-700" />
          <span className="text-gray-700 text-sm">Ramp</span>
        </div>
        <div className="py-1.5 px-2.5 pr-3 rounded-full flex items-center gap-1 border-2 border-gray-400">
          <Footprints className="w-4 h-4 stroke-gray-700" />
          <span className="text-gray-700 text-sm">Guiding Block</span>
        </div>
        <div className="py-1.5 px-2.5 pr-3 rounded-full flex items-center gap-1 border-2 border-gray-400">
          <Toilet className="w-4 h-4 stroke-gray-700" />
          <span className="text-gray-700 text-sm">Toilet</span>
        </div>
      </div>

      {/* cta */}
      <div className="w-full absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-around space-x-3 px-5">
        <Link
          className="w-full group text-nowrap"
          href={"https://www.google.com"}
        >
          <div className="flex justify-center items-center gap-1 w-full bg-white border border-black rounded-full p-3 px-5 text-sm text-black group-hover:bg-black group-hover:text-white">
            <Route
              className="stroke-black w-4 h-4 group-hover:stroke-white"
              strokeWidth={1.5}
            />
            Buka di Google Maps
          </div>
        </Link>
        <Link className="w-full group" href={"https://www.google.com"}>
          <div className="flex justify-center items-center p-3 px-5 space-y-2 w-full bg-black rounded-full text-sm gap-1 group-hover:text-black text-white group-hover:bg-white group-hover:border-black border">
            Lihat Detail
            <MoveRight className="w-5 h-5" strokeWidth={1.5} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarPlace;
