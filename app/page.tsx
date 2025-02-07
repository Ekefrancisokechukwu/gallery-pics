import { Suspense } from "react";
import ImageContainer from "./ImageContainer";
import FIlters from "@/components/layouts/FIlters";
import Sort from "@/components/layouts/Sort";
import FilterMedia from "@/components/layouts/FilterMedia";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] ">
      <div className="sticky top-[5rem]  z-[800] bg-white   mt-3 px-8 pb-1 flex items-center justify-between">
        <Suspense>
          <FIlters />
          <FilterMedia />
        </Suspense>
        <Suspense>
          <Sort />
        </Suspense>
      </div>
      <Suspense>
        <ImageContainer />
      </Suspense>
    </div>
  );
}
