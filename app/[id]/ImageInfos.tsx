"use client";

import { MapPin } from "lucide-react";
import Image from "next/legacy/image";
import { motion } from "motion/react";

type ImageInfoProps = {
  data: UnsplashImage;
};

const ImageInfos = ({ data }: ImageInfoProps) => {
  const maxWidth = 700;
  const aspectRatio = data.width / data.height;
  const scaledWidth = maxWidth;
  const scaledHeight = maxWidth / aspectRatio;

  console.log("tags Better", data.tags);

  return (
    <div>
      <div className="mt-7 grid place-items-center">
        <div
          style={{
            background: data.color,
          }}
          className="relative rounded-lg"
        >
          <Image
            src={data.urls.full}
            alt={data.alt_description}
            width={scaledWidth}
            height={scaledHeight}
            className="object-cover rounded-lg"
          />
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
export default ImageInfos;
