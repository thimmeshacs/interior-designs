import { motion } from "framer-motion";

function AnimatedSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="mb-12"
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
