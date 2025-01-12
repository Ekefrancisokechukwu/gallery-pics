"use client";

import { useQuery } from "@/hooks/useQuery";
import { FilterIcon } from "lucide-react";
import { motion } from "motion/react";

const FIlters = () => {
  const { setParam, getParam, removeParam } = useQuery();
  const isSidebarOpen = getParam("filter_sidebar");

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      removeParam("filter_sidebar");
    } else {
      setParam("filter_sidebar", "true");
    }
  };

  return (
    <div className="px-8">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className={`py-2 flex items-center text-sm font-semibold gap-x-3 px-4 rounded-full  ${
          isSidebarOpen ? "bg-stone-950 text-white" : "bg-gray-100 "
        }`}
      >
        Filter <FilterIcon size={18} />
      </motion.button>
    </div>
  );
};
export default FIlters;
