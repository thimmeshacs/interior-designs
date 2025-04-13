import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import DesktopNav from "../features/navigation/DesktopNav";
import MobileNav from "../features/navigation/MobileNav";
import LocationSelector from "../services/LocationSelector";

const animations = {
  header: {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.61, 1, 0.88, 1],
      },
    },
  },
  logo: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  },
};

function Header({ onCitySelect }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const locationControls = useAnimation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsHeroVisible(false);
      return;
    }

    const heroSection = document.querySelector("#hero-section");
    if (!heroSection) {
      setIsHeroVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let animationFrame;

    const handleScroll = () => {
      animationFrame = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        lastScrollY = currentScrollY;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const preloadAnimation = async () => {
      await locationControls.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
    };
    preloadAnimation();
  }, [locationControls]);

  const shouldBeWhite = isHomePage && isHeroVisible;

  const handleContactClick = () => {
    navigate("/contact");
    setIsMenuOpen(false);
  };

  const handleCitySelect = useCallback(
    (cityData) => {
      if (onCitySelect) {
        onCitySelect(cityData);
      }
    },
    [onCitySelect]
  );

  return (
    <motion.header
      variants={animations.header}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 transition-base ${
        shouldBeWhite
          ? "bg-transparent"
          : "bg-grey-50/90 backdrop-blur-md shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Branding Section */}
          <div className="flex items-center space-x-md">
            <motion.div
              variants={animations.logo}
              whileHover="hover"
              className="relative"
            >
              <Link
                to="/"
                className={`text-2xl font-bold ${
                  shouldBeWhite ? "text-grey-0" : "text-grey-800"
                } transition-base`}
              >
                InteriorCo
              </Link>
              <motion.div
                className="absolute -bottom-1 left-0 w-full h-1 bg-brand-500"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: shouldBeWhite ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={locationControls}
              className="relative z-10"
            >
              <LocationSelector
                onCitySelect={handleCitySelect}
                className="mt-1"
              />
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav
            onContactClick={handleContactClick}
            isScrolled={isScrolled}
            shouldBeWhite={shouldBeWhite}
          />

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${
              shouldBeWhite ? "text-grey-0" : "text-grey-800"
            } focus:outline-none transition-base`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <MobileNav
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onContactClick={handleContactClick}
              isScrolled={isScrolled}
              shouldBeWhite={shouldBeWhite}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        className="h-0.5 bg-brand-500"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: !shouldBeWhite ? 1 : 0,
          transformOrigin: "left",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.header>
  );
}

export default Header;
