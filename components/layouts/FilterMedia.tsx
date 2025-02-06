"use client";

import { useQuery } from "@/hooks/useQuery";
import { Check, FilterIcon, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const colors = [
  "black",
  "white",
  "yellow",
  "orange",
  "red",
  "purple",
  "magenta",
  "green",
  "teal",
  "blue",
];

const orientation = ["landscape", "portrait", "squarish"];

const FilterMedia = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { getParam, setParam } = useQuery();
  const queryColor = getParam("query") || "";
  const orientationQuery = getParam("orientation") || "";

  return (
    <div className="md:hidden block">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSidebarOpen(true)}
        className={`py-2 flex  bg-gray-100 items-center text-sm font-semibold gap-x-3 px-4 rounded-full
        `}
      >
        Filter <FilterIcon size={18} />
      </motion.button>

      <div>
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`w-full h-screen fixed top-0 left-0 z-[70] bg-black/20 backdrop-blur-sm ${
            isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        ></div>
        <div
          className={`h-screen  pt-24 px-5 fixed left-0 top-0  z-[1000] w-[18rem] transition-all ease-in-out duration-300 bg-white  ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 border rounded-lg absolute right-4 top-5"
          >
            <X size={15} />
          </button>
          <div className="flex items-center gap-x-4 mb-4">
            <h4 className="text-sm font-semibold">Colors</h4>
            <div
              style={{ background: queryColor }}
              className="size-[1.2rem] rounded-full border"
            />
          </div>
          <ul className="flex flex-wrap flex-shrink-0 gap-2">
            {colors.map((color, i) => {
              return (
                <li key={i}>
                  <button
                    onClick={() => {
                      setParam("query", color);
                      setIsSidebarOpen(false);
                    }}
                    style={{
                      background: color,
                      color: color === "white" ? "black" : "white",
                    }}
                    className="size-[1.2rem] border grid place-items-center hover:ring ring-neutral-300 transition-all duration-500"
                  >
                    {color === queryColor && <Check size={14} />}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <h4 className="text-sm font-semibold">orientation</h4>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {orientation.map((orient, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setParam("orientation", orient);
                    setIsSidebarOpen(false);
                  }}
                  className={`px-2.5 py-1.5  rounded-full border text-sm font-semibold  ${
                    orientationQuery === orient
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {orient}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FilterMedia;
