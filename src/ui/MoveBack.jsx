import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function MoveBack() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)}
      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </motion.button>
  );
}

export default MoveBack;
