// src\features\designs\Designs.jsx
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDesigns } from "./useDesigns";
import DesignCard from "./DesignCard";
import MoveBack from "../../ui/MoveBack";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import useInView from "../../hooks/useInView"; // Create this hook for intersection observer

function Designs() {
  const { categoryname } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const [itemsPerPage, setItemsPerPage] = useState(12); // Adjustable page size

  // Update URL when page changes
  const setPage = (page) => {
    setSearchParams({ page });
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Adjust items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(12);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch designs with pagination
  const {
    designs,
    isLoading,
    error,
    totalPages,
    totalItems,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useDesigns(categoryname, currentPage, itemsPerPage);

  // Setup intersection observer for infinite scroll option
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // Load more when the load more element comes into view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Calculate visible page numbers
  const getPageNumbers = () => {
    let pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Always show at least 5 pages if available
    if (endPage - startPage + 1 < 5) {
      if (startPage === 1) {
        endPage = Math.min(5, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 4);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (isLoading && currentPage === 1) {
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

  if (designs?.length === 0) {
    return (
      <div className="container mx-auto px-4 pt-20 font-sans">
        <div className="flex items-center mb-8">
          <MoveBack />
        </div>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">
            No designs found
          </h2>
          <p className="text-gray-600 mb-8">
            There are no designs available in this category.
          </p>
          <button
            onClick={() => navigate("/designs")}
            className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-2 rounded-md transition-colors"
          >
            Browse all designs
          </button>
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

      {/* Header with results count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-4xl font-bold capitalize text-grey-900 dark:text-grey-0 transition-base">
          {categoryname.replace(/-/g, " ")} Designs
        </h1>
        <p className="text-gray-600 mt-2 sm:mt-0">
          Showing {designs.length} of {totalItems} designs
        </p>
      </div>

      {/* Design grid with staggered animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage} // Re-animate when page changes
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {designs?.map((design, index) => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.05, 0.5), // Cap delay at 0.5s
                ease: [0.25, 0.1, 0.25, 1.0], // Custom easing
              }}
            >
              <DesignCard design={design} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Loading indicator for next page */}
      {isFetchingNextPage && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-500"></div>
        </div>
      )}

      {/* Pagination control - standard pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-10 mb-16">
        <div className="text-sm text-gray-600 mb-4 sm:mb-0">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center space-x-1">
          {/* Previous page button */}
          <button
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md flex items-center ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>

          {/* First page */}
          {getPageNumbers()[0] > 1 && (
            <>
              <button
                onClick={() => setPage(1)}
                className={`h-10 w-10 rounded-md ${
                  currentPage === 1
                    ? "bg-brand-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                1
              </button>
              {getPageNumbers()[0] > 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </>
          )}

          {/* Page numbers */}
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={`h-10 w-10 rounded-md ${
                currentPage === page
                  ? "bg-brand-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Last page */}
          {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
            <>
              {getPageNumbers()[getPageNumbers().length - 1] <
                totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => setPage(totalPages)}
                className={`h-10 w-10 rounded-md ${
                  currentPage === totalPages
                    ? "bg-brand-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next page button */}
          <button
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md flex items-center ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Next page"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Invisible element for infinite scroll detection */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="h-10 opacity-0" aria-hidden="true" />
      )}
    </motion.div>
  );
}

export default Designs;
