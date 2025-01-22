"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/legacy/image";
import { useRef } from "react";
import { motion } from "motion/react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import axios from "axios";
// import { downloadImage } from "@/lib/dataAsync";

interface ImageModalProps {
  data: UnsplashImage;
}

async function downloadImage(image: UnsplashImage) {
  try {
    const trackDownloadResponse = await axios(
      `https://api.unsplash.com/photos/${image.id}/download`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const downloadUrl = trackDownloadResponse.data.url;

    console.log(downloadUrl);

    // Trigger download
    // const response = await axios(downloadUrl, { responseType: "blob" });

    // const blob = response.data;
    // const url = window.URL.createObjectURL(blob);

    // // Create link element
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "image.jpg";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);

    // window.URL.revokeObjectURL(url);

    // const blob = await response.();
  } catch (error) {
    console.log(error, "yea am the error");
  }
}

const ImageInfo = ({ data }: ImageModalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, setIsopen } = useClickOutside(containerRef);

  console.log(data);

  const triggerDownload = () => {
    downloadImage(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between sticky top-0 bg-white py-2 z-30">
        <div className="flex items-center gap-x-1.5">
          <motion.div
            layoutId={data.id}
            className="size-[2.5rem] bg-gray-100 rounded-full"
          >
            <Image
              src={data.user.profile_image.small}
              alt="profile"
              width={400}
              height={400}
              className="rounded-full"
            />
          </motion.div>
          <p className="font-semibold text-gray-700 text-sm">
            {data.user.name}
          </p>
        </div>

        <div>
          <div ref={containerRef} className="relative">
            <button
              onClick={triggerDownload}
              className="border text-white bg-stone-950 rounded-lg px-3 py-1.5 hover:bg-opacity-60 flex items-center gap-x-2  text-sm font-semibold"
            >
              Download <ChevronDown size={20} />
            </button>
            {/* <div
              className={`absolute transition-all duration-150 origin-top-right ease-in right-0 z-50 top-[110%]  w-[10rem] bg-white border shadow-xl rounded-lg p-4  ${
                isOpen
                  ? "visible opacity-100 scale-100"
                  : "invisible opacity-0 scale-75"
              } `}
            ></div> */}
          </div>
        </div>
      </div>

      <div className="mt-7 grid place-items-center">
        <div
          style={{
            background: data.color,
          }}
          className="relative"
        >
          <Image
            src={data.urls.full}
            alt={data.alt_description}
            width={600}
            height={700}
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-8 flex  items-center gap-x-28">
        <div className="text-sm">
          <h4 className="font-semibold text-gray-500">Views</h4>
          <p className="font-semibold">{data.views}</p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold text-gray-500">Downloads</h4>
          <p className="font-semibold">{data.downloads}</p>
        </div>
      </div>
      {data.description && <p className="mt-7 text-sm">{data.description}</p>}
      <ul className="mt-5">
        {data.location.country && (
          <li className="flex items-center text-gray-400 gap-x-3">
            <MapPin size={18} />
            <span>
              {data.location.city && `${data.location.city},`}
              {data.location.country && data.location.country}
            </span>
          </li>
        )}
      </ul>

      <div className="mt-9 flex items-center gap-2 flex-wrap">
        {data.tags.map((tag, i) => {
          return (
            <motion.button
              whileHover={{ scale: 0.94 }}
              whileTap={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 110 }}
              key={i}
              className="px-2 py-1 capitalize hover:bg-neutral-200 inline-block bg-neutral-100 text-gray-500 text-sm rounded"
            >
              {tag.title}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ImageInfo;
