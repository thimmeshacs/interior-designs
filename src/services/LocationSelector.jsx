import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { supabase } from "./supabaseClient";

const LocationSelector = ({ onCitySelect, className }) => {
  const [currentCity, setCurrentCity] = useState("Detecting...");
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const hasFetched = useRef(false);

  // Fetch active cities from Supabase
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data, error } = await supabase
          .from("Citys_Data")
          .select("city_name, contact_1, contact_2, address_1")
          .eq("status", "Active");

        if (error) throw error;
        setCities(data || []);
      } catch (err) {
        console.error("Error fetching cities:", err.message);
        setError("Failed to load cities.");
      }
    };
    fetchCities();
  }, []);

  // Fetch initial city from IP
  useEffect(() => {
    if (hasFetched.current) return;

    let isMounted = true;
    const fetchCityFromIP = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Failed to fetch IP info");
        const data = await response.json();
        const cityName = data.city || "Unknown Location";

        if (isMounted) {
          setCurrentCity(cityName);
          // Check if the IP-detected city is in active cities
          const activeCity = cities.find((city) => city.city_name === cityName);
          if (activeCity && onCitySelect) {
            onCitySelect({
              city: cityName,
              cityDetails: {
                contact_1: activeCity.contact_1,
                contact_2: activeCity.contact_2,
                address_1: activeCity.address_1,
              },
            });
          } else if (onCitySelect) {
            onCitySelect({ city: cityName, notFound: true });
          }
        }
      } catch (err) {
        console.error("IP fetch error:", err.message);
        if (isMounted) {
          setError("Failed to detect location.");
          setCurrentCity("Select City");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          hasFetched.current = true;
        }
      }
    };

    // Delay IP fetch until cities are loaded
    if (cities.length > 0) {
      fetchCityFromIP();
    }

    return () => {
      isMounted = false;
    };
  }, [cities, onCitySelect]);

  // Handle city selection
  const handleCitySelect = (city) => {
    setCurrentCity(city.city_name);
    setIsOpen(false);
    if (onCitySelect) {
      onCitySelect({
        city: city.city_name,
        cityDetails: {
          contact_1: city.contact_1,
          contact_2: city.contact_2,
          address_1: city.address_1,
        },
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownVariants = {
    open: { opacity: 1, y: 0, display: "block" },
    closed: { opacity: 0, y: -10, transitionEnd: { display: "none" } },
  };

  const chevronVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-3 py-1 rounded-md
          text-black font-bold hover:bg-gray-100/50 hover:text-teal-600 
          transition-all duration-200 cursor-pointer
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
        `}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaMapMarkerAlt className="text-lg" />
        <span className="text-sm font-bold">
          {isLoading ? "Detecting..." : currentCity}
        </span>
        <motion.span
          variants={chevronVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-xs" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden"
          >
            {error && (
              <li className="px-4 py-3 text-sm text-red-500 font-bold">
                {error}
              </li>
            )}
            {cities.length === 0 && !error && (
              <li className="px-4 py-3 text-sm text-gray-500 font-bold">
                No active cities available
              </li>
            )}
            {cities.map((city) => (
              <motion.li
                key={city.city_name}
                whileHover={{ backgroundColor: "#e6fffa" }}
                className="px-4 py-3 text-sm text-black font-bold cursor-pointer hover:text-teal-600 transition-colors"
                onClick={() => handleCitySelect(city)}
              >
                {city.city_name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationSelector;
