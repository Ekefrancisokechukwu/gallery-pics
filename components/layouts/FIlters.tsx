"use client";

import { FilterIcon } from "lucide-react";
import { motion } from "motion/react";

const FIlters = () => {
  return (
    <div className="px-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="py-2 flex items-center font-semibold gap-x-3 px-4 rounded-full bg-gray-100"
      >
        Filter <FilterIcon size={18} />
      </motion.button>
    </div>
  );
};
export default FIlters;
