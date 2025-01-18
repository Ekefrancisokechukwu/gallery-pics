"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { Download } from "lucide-react";
import Image from "next/legacy/image";
import { useEffect, useRef } from "react";

export const Modal = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, setIsopen } = useClickOutside(containerRef);

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
