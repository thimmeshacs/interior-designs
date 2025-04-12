import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import DropdownMenu from "../../ui/DropdownMenu";

// Design categories with display names and URL-safe paths
export const designCategories = [
  { path: "kitchen", display: "Kitchen" },
  { path: "bedroom", display: "Bedroom" },
  { path: "bathroom", display: "Bathroom" },
  { path: "living-room", display: "Living Room" },
  { path: "dining-room", display: "Dining Room" },
  { path: "wardrobe", display: "Wardrobe" },
  { path: "window", display: "Window" },
];

export const navItems = [
  { path: "/", label: "Home" },
  { path: "/designs", label: "Designs", hasDropdown: true },
  { path: "/about", label: "About" },
  { path: "/booking", label: "Book Consultation" },
];

export const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function NavItem({ item, index }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive =
    location.pathname === item.path ||
    (item.path === "/designs" && location.pathname.startsWith("/designs/"));

  const linkClasses = `relative text-gray-800 hover:text-accent-teal transition-colors duration-300 py-2 ${
    isActive ? "text-accent-teal font-semibold" : ""
  }`;

  const trigger = (
    <Link to={item.path} className={linkClasses}>
      {item.label}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-teal"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );

  return (
    <motion.div
      key={item.path}
      custom={index}
      variants={navItemVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {item.hasDropdown ? (
        <DropdownMenu
          trigger={trigger}
          items={designCategories}
          baseUrl="/designs"
          onItemClick={(category) => {
            navigate(`/designs/${category.path}`);
          }}
          itemClassName="hover:bg-gray-50 hover:text-accent-teal"
          activeItemClassName="bg-gray-50 text-accent-teal font-medium"
        />
      ) : (
        trigger
      )}
    </motion.div>
  );
}
