import { motion } from "framer-motion";
import { navItems, NavItem } from "./NavItems";

function DesktopNav({ onContactClick, isScrolled, shouldBeWhite }) {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item, i) => (
        <NavItem
          key={item.path}
          item={item}
          index={i}
          isScrolled={isScrolled}
          shouldBeWhite={shouldBeWhite}
        />
      ))}
      <motion.button
        onClick={onContactClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${isScrolled ? "bg-accent-teal" : "bg-white"} ${
          isScrolled ? "text-white" : "text-accent-teal"
        } px-6 py-2 rounded-full hover:bg-teal-600 hover:text-white transition-colors duration-300`}
      >
        Contact Us
      </motion.button>
    </nav>
  );
}

export default DesktopNav;
