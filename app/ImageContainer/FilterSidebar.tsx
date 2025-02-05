"use client";

import { useQuery } from "@/hooks/useQuery";
import { Check } from "lucide-react";

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

const FilterSidebar = () => {
  const { getParam, setParam } = useQuery();
  const isSidebarOpen = getParam("filter_sidebar");
  const queryColor = getParam("query") || "";
  const orientationQuery = getParam("orientation") || "";

  return (
    <div
      className={`h-[calc(100vh_-123.75px)] pt-3 sticky top-[123.75px]  z-50 w-[14rem] transition-all ease-in-out duration-300 bg-white  ${
        isSidebarOpen ? "m-0" : "ml-[-20rem]"
      }`}
    >
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
                onClick={() => setParam("query", color)}
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
              onClick={() => setParam("orientation", orient)}
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
  );
};
export default FilterSidebar;
