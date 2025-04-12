import { motion } from "framer-motion";
import { navItems, NavItem } from "./NavItems";

function DesktopNav({ onContactClick }) {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item, i) => (
        <NavItem key={item.path} item={item} index={i} />
      ))}
      <motion.button
        onClick={onContactClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-accent-teal text-white px-6 py-2 rounded-full hover:bg-teal-600 transition-colors duration-300"
      >
        Contact Us
      </motion.button>
    </nav>
  );
}

export default DesktopNav;
