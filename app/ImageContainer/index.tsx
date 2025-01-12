"use client";

import {
  useQuery,
  useInfiniteQuery,
  QueryFunction,
} from "@tanstack/react-query";
import axios from "axios";
import Image from "next/legacy/image";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { loadingArray } from "./data";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

interface ImageDataProps {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

interface UnsplashImage {
  id: string;
  width: number;
  height: number;
  color: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

type ApiResponse = ImageDataProps | UnsplashImage[];

// const fetchImages: QueryFunction<ApiResponse> = async ({
//   pageParam = 1,
//   queryKey,
// }) => {
//   const [, query] = queryKey as [string, string];
//   const { data } = await axios.get(
//     `/api/unsplash?query=${query || ""}&page=${pageParam}`
//   );
//   return data;
// };

const ImageContainer = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchImages = async ({ pageParam = 1, queryKey }) => {
    const [, query] = queryKey as [string, string];

    const { data } = await axios.get(
      `/api/unsplash?query=${query || ""}&page=${pageParam}`
    );
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["images", debouncedQuery],
    queryFn: fetchImages,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if ("total_pages" in lastPage && pages.length < lastPage.total_pages) {
        console.log("pages", pages.length);
        console.log("last page", lastPage);

        return pages.length + 1;
      }
      return undefined;
    },
  });

  console.log(data);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="px-8 py-6">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-background"
        >
          {loadingArray.map((photo, i) => (
            <div
              key={i}
              className="mb-4 overflow-hidden rounded-lg bg-gray-100 animate-pulse   transition-transform duration-300 cursor-zoom-in ease-in-out"
            >
              <div
                className="relative"
                style={{
                  paddingTop: `${(photo.height / photo.width) * 100}%`,
                }}
              ></div>
            </div>
          ))}
        </Masonry>
      </div>
    );
  }

  const allImages =
    data?.pages.flatMap((page) =>
      isImageDataProps(page) ? page.results : page
    ) || [];

  console.log(allImages);

  return (
    <main className="px-8 pt-6  grid grid-cols-[auto_1fr] gap-x-2">
      {/* {status === "error" && (
        <div className="text-red-500 mb-4">
          {error.message || "An error occurred while fetching images"}
        </div>
      )} */}

      {/* <div className=" h-[calc(100vh_-123.75px)] pt-3 sticky top-[123.75px] z-50"> */}
        <FilterSidebar />
      {/* </div> */}

      <div className="pb-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-background"
        >
          {allImages.map((photo) => (
            <div
              style={{ background: photo.color }}
              key={photo.id}
              className="mb-4 overflow-hidden rounded-lg   transition-transform duration-300 cursor-zoom-in ease-in-out"
            >
              <div
                className="relative"
                style={{
                  paddingTop: `${(photo.height / photo.width) * 100}%`,
                }}
              >
                <Image
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 object-cover"
                  sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </Masonry>
        <div ref={observerTarget} className="h-10 mt-4" />
        {isFetchingNextPage && (
          <div className="grid place-items-center">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
      </div>
    </main>
  );
};
export default ImageContainer;

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const isImageDataProps = (data: ApiResponse): data is ImageDataProps => {
  return (data as ImageDataProps).results !== undefined;
};
