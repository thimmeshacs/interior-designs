// src\features\navigation\MobileNav.jsx
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "./NavItems";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Sidebar animation variants - modified for right side entry
const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: 20,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Modern icons for interior design
const navIcons = {
  Home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  Designs: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
      <path d="M2 2l7.586 7.586"></path>
      <circle cx="11" cy="11" r="2"></circle>
    </svg>
  ),
  Products: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h18v18H3zM12 8v8"></path>
      <path d="M8 12h8"></path>
    </svg>
  ),
  About: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4"></circle>
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
    </svg>
  ),
  "Get Free Quotation": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
  ),
};

function MobileNav({
  isOpen,
  onClose,
  onContactClick,
  isScrolled,
  shouldBeWhite,
}) {
  const location = useLocation();

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay - positioned fixed relative to viewport */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999]"
            onClick={onClose}
          />

          {/* Sidebar - positioned fixed relative to viewport on RIGHT side */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[280px] bg-white shadow-xl z-[1000] flex flex-col"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with logo and close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Link
                to="/"
                className="text-2xl font-bold text-brand-500"
                onClick={onClose}
              >
                Interior
              </Link>
              <button
                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                onClick={onClose}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation items */}
            <div className="flex-1 py-6 overflow-auto">
              <div className="px-4 mb-8">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Menu
                </div>
                {navItems.map((item, i) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/" &&
                      location.pathname.startsWith(item.path));

                  return (
                    <motion.div
                      key={item.path}
                      variants={itemVariants}
                      className="mb-3"
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ${
                          item.isCTA
                            ? "bg-brand-500 text-white hover:bg-brand-600"
                            : isActive
                            ? "bg-brand-50 text-brand-600"
                            : "text-gray-700 hover:bg-brand-50 hover:text-brand-600"
                        }`}
                        onClick={onClose}
                      >
                        <span
                          className={`mr-3 ${
                            item.isCTA ? "text-white" : "text-brand-500"
                          }`}
                        >
                          {navIcons[item.label]}
                        </span>
                        <span
                          className={`font-medium ${
                            item.isCTA ? "text-white" : ""
                          }`}
                        >
                          {item.label}
                        </span>
                        {item.hasDropdown && (
                          <svg
                            className="w-4 h-4 ml-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Contact section */}
              <div className="px-4 mt-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Contact
                </div>
                <motion.div variants={itemVariants}>
                  <button
                    onClick={() => {
                      onContactClick();
                      onClose();
                    }}
                    className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-all duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-3 text-brand-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="font-medium">Contact Us</span>
                  </button>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-4 mt-auto border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  © 2025 Interior Design Studio
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileNav;
