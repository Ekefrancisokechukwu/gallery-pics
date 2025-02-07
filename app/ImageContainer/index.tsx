"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Suspense, useCallback, useEffect, useRef } from "react";
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
  const query = getParam("query") || "";
  const orientation = getParam("orientation") || "";
  const order_by = getParam("order_by") || "";

  const {
    data,
    error,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "images",
      {
        query: query,
        orientation: orientation,
        order_by: order_by,
      },
    ] as const,
    queryFn: ({ pageParam = 1, queryKey }) =>
      fetchImages({ pageParam, queryKey }),

    initialPageParam: 1,
    staleTime: 5000,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.total_pages) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;

    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver, hasNextPage, isFetchingNextPage]);

  if (status === "error") {
    return (
      <div className="px-8 py-10 text-center">
        <p className="font-semibold text-lg mb-4">
          {error instanceof Error
            ? error.message
            : "An error occurred while fetching images"}
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const allImages =
    data?.pages.flatMap((page) =>
      isImageDataProps(page) ? page.results : page
    ) || [];

  return (
    <main className="px-8 pt-6  grid md:grid-cols-[auto_1fr] gap-x-2">
      <Suspense>
        <FilterSidebar />
      </Suspense>

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
