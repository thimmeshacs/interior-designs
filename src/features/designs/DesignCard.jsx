import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function DesignCard({ design }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      <Link to={`/designs/${design.id}`}>
        <img
          src={design.image_url}
          alt={design.category}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-medium">{design.category}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {design.description}
          </p>
          <p className="mt-2 text-accent-teal font-semibold">₹{design.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default DesignCard;
