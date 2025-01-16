"use client";

import { useQuery } from "@/hooks/useQuery";
import { ChevronsUpDown, ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const sortBy = ["latest", "relevant"];

type EventType = MouseEvent | TouchEvent;

const Sort = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsopen] = useState(false);
  const { getParam, setParam } = useQuery();
  const orderBy = getParam("order_by") || "relevant";

  const toggleDropdown = () => {
    setIsopen(!isOpen);
  };

  const handleClickOutside = (events: EventType) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(events.target as Node)
    ) {
      setIsopen(false);
    }
  };

  const handleSelect = (sort: string) => {
    setParam("order_by", sort);
    setIsopen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    };
  }, [containerRef, isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        layout="position"
        layoutRoot={true}
        onClick={toggleDropdown}
        className="flex items-center hover:bg-gray-100 gap-x-1 text-sm border py-1 px-2 rounded-md"
      >
        <ChevronsUpDown size={17} className="text-neutral-500" />
        <span className="text-neutral-500">Sort By</span>
        <span className="capitalize">{orderBy}</span>
        <ChevronDown size={17} />
      </motion.button>
      <div
        className={`absolute w-full transition-all duration-100 ease-out  bg-white origin-top shadow rounded-md left-0 top-[110%]  py-3  ${
          isOpen
            ? "scale-100 opacity-100 visible"
            : "scale-90 opacity-0 invisible"
        } `}
      >
        <span className="block px-4 text-gray-400 text-sm"> Sort By</span>

        <div className="mt-2">
          {sortBy.map((sort) => (
            <button
              key={sort}
              onClick={() => handleSelect(sort)}
              className="px-4 py-2 flex items-center justify-between w-full text-start capitalize text-gray-600 text-sm hover:bg-gray-100"
            >
              {sort}
              {orderBy === sort && <Check size={16} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sort;