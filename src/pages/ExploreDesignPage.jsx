// src\pages\ExploreDesignPage.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import DesignCategories from "../features/designs/designCategories";
import MoveBack from "../ui/MoveBack";

function ExploreDesignPage() {
  return (
    <div className="min-h-screen bg-grey-50 dark:bg-grey-900 pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        {/* Header section with back button and heading horizontally aligned */}
        <div className="flex items-center mb-8 relative">
          {/* Back button (fixed on left) */}
          <div className="absolute left-0 z-10">
            <MoveBack />
          </div>

          {/* Centered heading in the entire available space */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-grey-900 dark:text-grey-0 w-full text-center"
          >
            Explore Our Design Collections
          </motion.h1>

          {/* Right - View all designs link */}
          <div className="absolute right-0 z-10">
            <Link
              to="/designs"
              className="inline-flex items-center text-brand-500 hover:text-brand-600 transition-colors font-medium group"
            >
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">
                View all designs
              </span>
              <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* Centered description paragraph */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-grey-600 dark:text-grey-300 max-w-2xl mx-auto text-center"
          >
            Discover our carefully curated collection of interior designs across
            various categories. Each design is crafted to inspire and transform
            your space.
          </motion.p>
        </div>

        {/* Improved DesignCategories section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <DesignCategories />
        </motion.div>

        {/* View All button at the bottom */}
        <div className="mt-12 text-center">
          <Link
            to="/designs"
            className="inline-flex items-center px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-md transition-all duration-300 font-medium group hover:shadow-lg"
          >
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">
              Browse all designs
            </span>
            <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default ExploreDesignPage;
