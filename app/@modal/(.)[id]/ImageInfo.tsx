"use client";

import { ChevronDown, LoaderIcon, MapPin } from "lucide-react";
import Image from "next/legacy/image";
import { useState } from "react";
import { motion } from "motion/react";

interface ImageModalProps {
  data: UnsplashImage;
}

const ImageInfo = ({ data }: ImageModalProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(`/api/download/${data.id}`);
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `unsplash-${data.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
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
          <div className="relative">
            <motion.button
              disabled={isDownloading}
              layout
              onClick={handleDownload}
              className="border text-white disabled:opacity-60 bg-stone-950 rounded-lg px-3 py-1.5 hover:bg-opacity-60 flex items-center gap-x-2  text-sm font-semibold"
            >
              {isDownloading ? (
                <>
                  <LoaderIcon size={20} className="animate-spin" />{" "}
                  Downloading..
                </>
              ) : (
                <>
                  Download <ChevronDown size={20} />
                </>
              )}
            </motion.button>
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
