import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
};

function DropdownMenu({
  trigger,
  items,
  baseUrl = "",
  onItemClick,
  className = "",
  itemClassName = "",
  activeItemClassName = "",
  triggerClassName = "",
  activeTriggerClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleTriggerHover = (hovering) => {
    setIsOpen(hovering);
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    setIsOpen(false);
  };

  const isActive = baseUrl && location.pathname.startsWith(baseUrl);

  return (
    <div
      className="relative"
      onMouseEnter={() => handleTriggerHover(true)}
      onMouseLeave={() => handleTriggerHover(false)}
    >
      <div
        className={`${triggerClassName} ${
          isActive ? activeTriggerClassName : ""
        }`}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute top-full left-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 ${className}`}
          >
            {items.map((item, i) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-accent-teal transition-colors duration-200 cursor-pointer ${itemClassName} ${
                    location.pathname === `${baseUrl}/${item.path}`
                      ? activeItemClassName
                      : ""
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {item.display}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DropdownMenu;
