// src\features\designs\designCategories.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useDesignCategories } from "./useDesignCategories";

function DesignCategories() {
  const { categories, isLoading, error } = useDesignCategories();
  const navigate = useNavigate();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-red-700 bg-red-100 p-4 rounded-md shadow-sm">
        Error: {error.message}
      </div>
    );
  }

  // Empty state
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No design categories found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header with back button and title aligned horizontally */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: Math.min(index * 0.1, 0.8),
            }}
            className="bg-white dark:bg-grey-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
            whileHover={{
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            {/* Category image with proper loading */}
            <Link to={`/designs/${category.routePath}`}>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {category.image_url ? (
                  <motion.img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out"
                    loading="lazy"
                    whileHover={{ scale: 1.07 }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-lg">No image available</span>
                  </div>
                )}
              </div>
            </Link>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-grey-900 dark:text-grey-100 mb-2">
                {category.name}
              </h3>
              <p className="text-grey-600 dark:text-grey-300 mb-4">
                {category.description ||
                  `Explore our ${category.name} collection`}
              </p>

              {/* View details with arrow mark */}
              <Link
                to={`/designs/${category.routePath}`}
                className="inline-flex items-center text-brand-500 hover:text-brand-600 font-medium transition-colors group"
              >
                View designs
                <ArrowRightIcon className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default DesignCategories;
