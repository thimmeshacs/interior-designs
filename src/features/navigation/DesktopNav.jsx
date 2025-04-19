// src\features\navigation\DesktopNav.jsx
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { navItems } from "./NavItems";

// Animation variants for the nav container
const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.08,
    },
  },
};

// Animation variants for individual nav items
const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// Modern icons for interior design - same as mobile sidebar
const navIcons = {
  Home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
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
      className="w-4 h-4"
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
      className="w-4 h-4"
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
      className="w-4 h-4"
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
      className="w-4 h-4"
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

// CustomLink component with advanced hover effects and always visible icons
function CustomNavLink({ item, index, isActive, isHovered, shouldBeWhite }) {
  const itemRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (itemRef.current) {
      const { width, height } = itemRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Calculate spotlight gradient position
  const gradientX = useTransform(
    useMotionValue(mousePosition.x),
    [0, dimensions.width],
    [0, 100]
  );
  const gradientY = useTransform(
    useMotionValue(mousePosition.y),
    [0, dimensions.height],
    [0, 100]
  );

  return (
    <motion.div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden"
      whileHover={{ scale: item.isCTA ? 1.05 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link
        to={item.path}
        className={`flex items-center gap-2 relative z-10 py-2 px-3 rounded-md ${
          item.isCTA
            ? "bg-brand-500 text-white font-medium"
            : `${shouldBeWhite ? "text-white" : "text-gray-800"} ${
                isActive ? "font-semibold" : ""
              }`
        }`}
      >
        {/* Icon is always visible */}
        <span
          className={`${
            isHovered
              ? "text-brand-500"
              : item.isCTA
              ? "text-white"
              : shouldBeWhite
              ? "text-white"
              : "text-gray-600"
          } transition-colors duration-300`}
        >
          {navIcons[item.label]}
        </span>
        <span>{item.label}</span>

        {item.hasDropdown && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
            animate={{ rotate: isHovered ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </motion.svg>
        )}
      </Link>

      {isHovered && !item.isCTA && (
        <motion.div
          className="absolute inset-0 bg-brand-50/80 rounded-md -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(circle at ${gradientX.get()}% ${gradientY.get()}%, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.05) 70%)`,
          }}
        />
      )}

      {/* Sparkle effects on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 rounded-full bg-brand-500/30"
                initial={{
                  opacity: 0,
                  x: dimensions.width / 2,
                  y: dimensions.height / 2,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: dimensions.width * Math.random(),
                  y: dimensions.height * Math.random(),
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Animated line indicator */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 bg-brand-500 rounded-full ${
          item.isCTA ? "hidden" : ""
        }`}
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: isActive || isHovered ? "100%" : "0%",
          opacity: isActive || isHovered ? 1 : 0,
          transition: {
            type: "spring",
            stiffness: isHovered ? 500 : 100,
            damping: 20,
          },
        }}
      />
    </motion.div>
  );
}

function DesktopNav({ onContactClick, isScrolled, shouldBeWhite }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navRef = useRef(null);
  const location = useLocation();

  // Track mouse position for magnetic effect
  const mouseMoveHandler = (e) => {
    if (!navRef.current) return;

    const children = Array.from(navRef.current.children);
    children.forEach((child, idx) => {
      const rect = child.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate distance between mouse and center of element
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 100;

      if (distance < maxDistance && hoveredIndex === idx) {
        // Calculate pull strength based on distance
        const pull = 1 - distance / maxDistance;
        const moveX = x * pull * 0.2;
        const moveY = y * pull * 0.2;

        child.style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        child.style.transform = "translate(0px, 0px)";
      }
    });
  };

  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      nav.addEventListener("mousemove", mouseMoveHandler);

      return () => {
        nav.removeEventListener("mousemove", mouseMoveHandler);
      };
    }
  }, [hoveredIndex]);

  return (
    <motion.nav
      ref={navRef}
      className="hidden md:flex items-center space-x-6"
      variants={navContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map((item, i) => {
        const isActive =
          location.pathname === item.path ||
          (item.path !== "/" && location.pathname.startsWith(item.path));

        return (
          <motion.div
            key={item.path}
            variants={navItemVariants}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative py-1"
          >
            <CustomNavLink
              item={item}
              index={i}
              isActive={isActive}
              isHovered={hoveredIndex === i}
              shouldBeWhite={shouldBeWhite}
            />

            {/* Special glow effect for CTA button */}
            {item.isCTA && hoveredIndex === i && (
              <motion.div
                className="absolute inset-0 bg-brand-500 filter blur-md rounded-md -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.3,
                  scale: 1.1,
                  transition: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                  },
                }}
              />
            )}

            {/* Particle trail effect for CTA */}
            {item.isCTA && hoveredIndex === i && (
              <AnimatePresence>
                {[...Array(8)].map((_, particleIndex) => (
                  <motion.div
                    key={`particle-${particleIndex}`}
                    className="absolute w-1 h-1 rounded-full bg-brand-300"
                    initial={{
                      opacity: 0,
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      x: [0, (Math.random() - 0.5) * 60],
                      y: [0, (Math.random() - 0.5) * 60],
                    }}
                    transition={{
                      duration: 0.8 + Math.random(),
                      delay: particleIndex * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0.2,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  />
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

export default DesktopNav;
