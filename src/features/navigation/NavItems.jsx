import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDesignCategories } from "./useDesignCategories";
import { useProductCategories } from "./useProductCategories";
import DropdownMenu from "../../ui/DropdownMenu";

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

export const navItems = [
  { path: "/", label: "Home" },
  {
    path: "/designs",
    label: "Designs",
    hasDropdown: true,
    useCategories: useDesignCategories,
  },
  {
    path: "/products",
    label: "Products",
    hasDropdown: true,
    useCategories: useProductCategories,
  },
  { path: "/about", label: "About" },
  {
    path: "/booking",
    label: "Get Free Quotation",
    isCTA: true,
  },
];

export function NavItem({ item, index, isScrolled, shouldBeWhite }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive =
    location.pathname === item.path ||
    (item.path === "/designs" && location.pathname.startsWith("/designs/")) ||
    (item.path === "/products" && location.pathname.startsWith("/products/"));

  // Get categories if the item has a dropdown
  const {
    categories = [],
    isLoading,
    error,
  } = item.useCategories ? item.useCategories() : {};

  const linkClasses = `relative ${
    shouldBeWhite ? "text-white" : "text-gray-800"
  } hover:text-accent-teal transition-colors duration-300 py-2 ${
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
          items={categories}
          baseUrl={item.path}
          onItemClick={(category) => {
            navigate(`${item.path}/${category.path}`);
          }}
          itemClassName="hover:bg-gray-50 hover:text-accent-teal"
          activeItemClassName="bg-gray-50 text-accent-teal font-medium"
          isLoading={isLoading}
          error={error}
        />
      ) : (
        trigger
      )}
    </motion.div>
  );
}
