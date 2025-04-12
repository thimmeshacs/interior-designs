import { motion } from "framer-motion";
import DesignCategories from "../features/designs/designCategories";
import MoveBack from "../ui/MoveBack";

function ExploreDesignPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="flex items-center mb-8">
          <MoveBack />
        </div>
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Explore Our Design Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Discover our carefully curated collection of interior designs across
            various categories. Each design is crafted to inspire and transform
            your space.
          </motion.p>
        </div>
        <DesignCategories />
      </motion.div>
    </div>
  );
}

export default ExploreDesignPage;
