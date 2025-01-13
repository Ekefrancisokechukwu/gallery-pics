"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/legacy/image";
import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { loadingArray } from "./data";
import { Loader2Icon } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import { useQuery as useURLQuery } from "@/hooks/useQuery";

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

const fetchImages = async ({ pageParam = 1, queryKey }: any) => {
  const [, { query, orientation }] = queryKey as [
    string,
    { query: string; orientation?: string; color?: string }
  ];

  const { data } = await axios.get(`/api/unsplash`, {
    params: {
      query: query || "",
      orientation: orientation || "",
      page: pageParam,
    },
  });

  return data;
};

const ImageContainer = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const { getParam } = useURLQuery();
  const query = getParam("query");
  const orientation = getParam("orientation");

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "images",
      {
        query: query || "",
        orientation: orientation || "",
      },
    ],
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

  const allImages =
    data?.pages.flatMap((page) =>
      isImageDataProps(page) ? page.results : page
    ) || [];

  console.log(allImages);

  if (status === "error") {
    return (
      <div className="px-8 py-10 text-center font-semibold text-lg">
        {error.message || "An error occurred while fetching images"}
      </div>
    );
  }

  return (
    <main className="px-8 pt-6  grid grid-cols-[auto_1fr] gap-x-2">
      <FilterSidebar />

      {isLoading ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-background"
        >
          {loadingArray.map((photo, i) => (
            <div
              key={i}
              className="mb-4 overflow-hidden rounded-lg bg-gray-100 animate-pulse   transition-transform duration-300 ease-in-out"
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
      ) : (
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
      )}
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
