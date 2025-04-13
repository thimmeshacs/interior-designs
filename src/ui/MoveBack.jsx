import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function MoveBack() {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)}
      className="flex items-center text-grey-600 hover:text-grey-900 dark:text-grey-300 dark:hover:text-grey-0 transition-base"
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
