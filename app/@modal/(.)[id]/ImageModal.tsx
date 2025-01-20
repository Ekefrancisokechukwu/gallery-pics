"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { Download, MapPin } from "lucide-react";
import Image from "next/legacy/image";
import { useRef } from "react";
import { motion } from "motion/react";

interface ImageModalProps {
  data: UnsplashImage;
}

export const ImageModal = ({ data }: ImageModalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, setIsopen } = useClickOutside(containerRef);

  console.log(data);

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
              onClick={() => setIsopen(!isOpen)}
              className="border text-white bg-stone-950 rounded-lg px-3 py-1.5 hover:bg-opacity-60 flex items-center gap-x-2  text-sm font-semibold"
            >
              Download <Download size={19} />
            </button>
            <div
              className={`absolute transition-all duration-150 origin-top-right ease-in right-0 z-50 top-[110%]  w-[10rem] bg-white border shadow-xl rounded-lg p-4  ${
                isOpen
                  ? "visible opacity-100 scale-100"
                  : "invisible opacity-0 scale-75"
              } `}
            ></div>
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
      {data.description && <p className="mt-4 text-sm">{data.description}</p>}
      <ul className="mt-5">
        {data.location.city ||
          (data.location.country && (
            <li className="flex items-center text-gray-400">
              <MapPin size={18} />
              <span>
                {data.location.city && `${data.location.city},`}
                {data.location.country && data.location.country}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};
