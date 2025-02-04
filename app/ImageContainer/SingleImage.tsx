"use client";

import Image from "next/legacy/image";
import { motion } from "motion/react";
import { useQuery } from "@/hooks/useQuery";
import { useRouter } from "next/navigation";

interface SingleImageProps {
  photo: UnsplashImage;
}

const SingleImage = ({ photo }: SingleImageProps) => {
  const { getParam } = useQuery();
  const isFilterSidebar = getParam("filter_sidebar") || "";
  const router = useRouter();

  const openMoal = () => {
    const id = photo.id;
    const slug = photo.alt_description.split(" ").join("-");

    if (isFilterSidebar) {
      router.push(`/${slug}_id${id}?filter_sidebar=true`);
    } else {
      router.push(`/${slug}_id${id}`);
    }
  };

  return (
    <div
      style={{ background: photo.color }}
      className="mb-4 overflow-hidden group group rounded-lg  relative transition-transform duration-300  ease-in-out"
    >
      <div
        className="relative overflow-hidden"
        style={{
          paddingTop: `${(photo.height / photo.width) * 100}%`,
        }}
      >
        <Image
          src={photo.urls.regular}
          alt={photo.alt_description}
          layout="fill"
          objectFit="cover"
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
          className=" duration-300 object-cover group-hover:scale-110 transition-all ease-linear"
        />
      </div>
      <div
        onClick={openMoal}
        className="absolute z-30  inset-0 bg-black/20 opacity-0 invisible  px-4 pt-4  group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-in-out  h-full w-full cursor-zoom-in"
      >
        <div className="absolute left-3 cursor-default z-50 flex items-center gap-x-2 bottom-3">
          <motion.div
            layoutId={photo.id}
            className="size-[2.5rem] rounded-full bg-gray-100/80 relative"
          >
            <Image
              src={photo.user.profile_image.small}
              alt={photo.user.name}
              width={100}
              height={100}
              className="rounded-full object-cover w-full h-full"
            />
          </motion.div>
          <p className="text-white text-sm font-semibold truncate">
            {photo.user.first_name} {photo.user.last_name}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SingleImage;
