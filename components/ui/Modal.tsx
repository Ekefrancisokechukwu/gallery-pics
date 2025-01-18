"use client";

import Image from "next/legacy/image";
import { useEffect } from "react";

export const Modal = () => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
  }, []);

  return (
    <div className="  z-50  fixed w-full overflow-y-scroll h-screen left-0 top-0">
      <div className="bg-black/50 fixed top-0 left-0 w-full h-full -z-[70]" />

      <div className="w-[80vw] mt-7 mb-7 bg-white rounded-xl min-h-[90vh] mx-auto  p-5 top-1/2  z-[80]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-1.5">
            <figure className="size-[2.5rem] bg-gray-100 rounded-full"></figure>
            <p className="font-semibold text-gray-700 text-sm">John Smith</p>
          </div>
        </div>
        <div className="mt-7 grid place-items-center">
          <Image
            src={
              "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="img"
            width={800}
            height={700}
            className="mx-auto"
          />
        </div>
      </div>
    </div>
  );
};
