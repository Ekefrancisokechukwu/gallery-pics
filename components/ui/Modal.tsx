"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <motion.div className="  z-[1000]  fixed w-full overflow-y-scroll h-screen left-0 top-0">
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        className="bg-black/50 fixed top-0 left-0 w-full h-full -z-[70]"
        onClick={closeModal}
      />
      <button
        onClick={closeModal}
        className="p-1 md:block hidden  rounded-full fixed left-8 top-6"
      >
        <X size={25} color="#fff" />
      </button>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="sm:w-[80vw] w-full mt-7 mb-7 bg-white rounded-xl min-h-[90vh] mx-auto  p-5 top-1/2  z-[80]"
      >
        <button
          onClick={closeModal}
          className="p-1 md:hidden block  rounded-full  left-8 top-6"
        >
          <X size={25} color="#000" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};
