import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDesigns } from "./useDesigns";
import DesignCard from "./DesignCard";
import MoveBack from "../../ui/MoveBack";

function Designs() {
  const { categoryname } = useParams();
  const { designs, isLoading, error } = useDesigns(categoryname);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-700 bg-red-100 p-4 rounded-md shadow-sm">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-24 font-sans"
    >
      <div className="flex items-center mb-8">
        <MoveBack />
      </div>
      <h1 className="text-4xl font-bold mb-8 capitalize text-grey-900 dark:text-grey-0 transition-base">
        {categoryname.replace(/-/g, " ")} Designs
      </h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {designs?.map((design, index) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <DesignCard design={design} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Designs;
