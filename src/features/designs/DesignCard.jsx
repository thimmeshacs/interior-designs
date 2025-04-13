import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function DesignCard({ design }) {
  return (
    <Link to={`/designs/${design.category}/${design.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-grey-0 rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
      >
        <div className="relative h-72">
          <img
            src={design.image_url}
            alt={design.description}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
        </div>
      </motion.div>
    </Link>
  );
}

export default DesignCard;
