import { motion } from "framer-motion";
import { navItems } from "./NavItems";
import { Link } from "react-router-dom";

function MobileNav({ isOpen, onClose, onContactClick }) {
  return (
    <motion.nav
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden mt-4"
    >
      {navItems.map((item, i) => (
        <motion.div
          key={item.path}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="py-2"
        >
          <Link
            to={item.path}
            className="block text-gray-800 hover:text-accent-teal transition-colors duration-300"
            onClick={onClose}
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
      <motion.button
        onClick={onContactClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-accent-teal text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors duration-300 mt-4"
      >
        Contact Us
      </motion.button>
    </motion.nav>
  );
}

export default MobileNav;
