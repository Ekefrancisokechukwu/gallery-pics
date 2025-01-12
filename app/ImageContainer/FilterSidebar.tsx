"use client";

import { useQuery } from "@/hooks/useQuery";

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
  const { getParam } = useQuery();
  const isSidebarOpen = getParam("filter_sidebar");

  return (
    <div
      className={`h-[calc(100vh_-123.75px)] pt-3 sticky top-[123.75px] z-50 w-[14rem] transition-all ease-in-out duration-300 bg-white  ${
        isSidebarOpen ? "m-0" : "ml-[-20rem]"
      }`}
    >
      <div className="flex items-center gap-x-4 mb-4">
        <h4 className="text-sm font-semibold">Colors</h4>
        <div className="size-[1.2rem] rounded-full border" />
      </div>
      <ul className="flex flex-wrap flex-shrink-0 gap-2">
        {colors.map((color, i) => {
          return (
            <li key={i}>
              <button
                style={{ background: color }}
                className="size-[1.2rem] border hover:ring ring-neutral-300 transition-all duration-500"
              ></button>
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
              className="px-2.5 py-1.5 hover:bg-gray-100 rounded-full border text-sm font-semibold text-ne"
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
