import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function DesignCard({ design }) {
  return (
    <Link to={`/designs/${design.category}/${design.id}`}>
      <motion.div
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        className="bg-grey-0 rounded-lg shadow-md overflow-hidden cursor-pointer group hover:shadow-xl"
      >
        <div className="relative h-72">
          <motion.img
            src={design.image_url}
            alt={design.description}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-grey-900 mb-3">
            {design.description}
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-grey-600 flex items-center">
              <span className="w-4 h-4 rounded-full bg-brand-100 flex items-center justify-center mr-2">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              </span>
              Room Dimension: {design.room_dimension}
            </p>
            <p className="text-sm text-grey-600 flex items-center capitalize">
              <span className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <span className="w-2 h-2 rounded-full bg-blue-700"></span>
              </span>
              Type: {design.sub_category?.replace(/_/g, " ")}
            </p>
          </div>
          <motion.div
            className="mt-4 text-brand-500 font-medium flex items-center opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            View details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export default DesignCard;
