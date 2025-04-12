import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function DesignCard({ design }) {
  return (
    <Link to={`/designs/${design.category}/${design.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
      >
        <div className="relative h-64">
          <img
            src={design.image_url}
            alt={design.description}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {design.description}
          </h3>
          <p className="text-sm text-gray-600">
            Room Dimension: {design.room_dimension}
          </p>
          <p className="text-sm text-gray-600 capitalize">
            Type: {design.sub_category?.replace(/_/g, " ")}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

export default DesignCard;
