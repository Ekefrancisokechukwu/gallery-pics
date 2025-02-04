"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import Masonry from "react-masonry-css";
import { breakpointColumnsObj, loadingArray } from "./data";
import { Loader2Icon } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import { useQuery as useURLQuery } from "@/hooks/useQuery";
import SingleImage from "./SingleImage";
import { fetchImages } from "@/lib/dataAsync";

const ImageContainer = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const { getParam } = useURLQuery();
  const query = getParam("query");
  const orientation = getParam("orientation");
  const order_by = getParam("order_by");

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
        order_by: order_by || "",
      },
    ],
    queryFn: fetchImages,
    initialPageParam: 0,
    staleTime: 5000,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.total_pages) {
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

  if (status === "error") {
    return (
      <div className="px-8 py-10 text-center font-semibold text-lg">
        {error.message || "An error occurred while fetching images"}
      </div>
    );
  }

  const allImages =
    data?.pages.flatMap((page) =>
      isImageDataProps(page) ? page.results : page
    ) || [];

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
              <SingleImage key={photo.id} photo={photo} />
            ))}
          </Masonry>
          <div ref={observerTarget} className="h-[4rem] mt-4" />
          {isFetchingNextPage && (
            <div className="grid place-items-center">
              <Loader2Icon size={25} className="animate-spin" />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default ImageContainer;

const isImageDataProps = (data: ApiResponse): data is ImageDataProps => {
  return (data as ImageDataProps).results !== undefined;
};
