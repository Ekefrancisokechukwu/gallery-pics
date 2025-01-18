import { Suspense } from "react";
import ImageContainer from "./ImageContainer";
import FIlters from "@/components/layouts/FIlters";
import Sort from "@/components/layouts/Sort";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)] ">
      <div className="sticky top-[5rem] bg-white z-50  mt-3 px-8 pb-1 flex items-center justify-between">
        <Suspense>
          <FIlters />
        </Suspense>
        <Suspense>
          <Sort />
        </Suspense>
      </div>
      <ImageContainer />
    </div>
  );
}
