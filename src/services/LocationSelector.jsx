import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { supabase } from "./supabaseClient";

const LocationSelector = ({ onCitySelect, className }) => {
  const [currentCity, setCurrentCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const hasFetched = useRef(false);

  // Fetch active cities from Supabase
  useEffect(() => {
    let isMounted = true;
    const fetchCities = async () => {
      try {
        console.log("Fetching active cities from Supabase...");
        const { data, error } = await supabase
          .from("Citys_Data")
          .select("city_name, contact_1, contact_2, address_1")
          .eq("status", "Active");

        if (error) {
          console.error("Error fetching cities:", error.message);
          throw error;
        }

        if (isMounted) {
          console.log("Cities fetched successfully:", data);
          setCities(data || []);
        }
      } catch (err) {
        console.error("Error fetching cities:", err.message);
        if (isMounted) {
          setError("Failed to load cities.");
          setIsLoading(false);
        }
      }
    };

    fetchCities();

    return () => {
      console.log("Cleanup - City fetch unmounting");
      isMounted = false;
    };
  }, []);

  // Fetch initial city from IP
  useEffect(() => {
    if (hasFetched.current || cities.length === 0) return;

    let isMounted = true;
    const fetchCityFromIP = async () => {
      setIsLoading(true);
      hasFetched.current = true;

      try {
        console.log("Fetching IP details from ipapi.co...");
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          console.error("Failed to fetch IP info. Status:", response.status);
          throw new Error("Failed to fetch IP info");
        }
        const data = await response.json();
        const cityName = data.city || "Unknown Location";
        const ipAddress = data.ip;

        console.log("IP details fetched:", { ipAddress, cityName });

        // Insert into database
        console.log("Inserting into users_address...");
        const { error: insertError } = await supabase
          .from("users_address")
          .insert([{ ip_address: ipAddress, city_name: cityName }]);

        if (insertError) {
          console.error("Insert failed:", insertError.message);
          throw insertError;
        }
        console.log("Database insert successful");

        if (isMounted) {
          setCurrentCity(cityName);
          setIsLoading(false); // Move this here to ensure state updates first
          const activeCity = cities.find((c) => c.city_name === cityName);

          if (activeCity && onCitySelect) {
            console.log("Active city found:", activeCity);
            onCitySelect({
              city: cityName,
              cityDetails: {
                contact_1: activeCity.contact_1,
                contact_2: activeCity.contact_2,
                address_1: activeCity.address_1,
              },
            });
          } else if (onCitySelect) {
            console.log("No active city match");
            onCitySelect({ city: cityName, notFound: true });
          }
        }
      } catch (err) {
        console.error("IP fetch failed:", err.message);
        if (isMounted) {
          setError("Location detection failed");
          setCurrentCity("Select City");
          setIsLoading(false);
        }
      }
    };

    fetchCityFromIP();

    return () => {
      console.log("Cleanup - IP fetch unmounting");
      isMounted = false;
    };
  }, [cities, onCitySelect]);

  // Handle manual city selection
  const handleCitySelect = (city) => {
    console.log("User selected:", city.city_name);
    setCurrentCity(city.city_name);
    setIsOpen(false);
    setIsLoading(false); // Ensure loading is off after manual selection

    onCitySelect?.({
      city: city.city_name,
      cityDetails: {
        contact_1: city.contact_1,
        contact_2: city.contact_2,
        address_1: city.address_1,
      },
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        console.log("Outside click detected - closing dropdown");
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      console.log("Removing outside click listener");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Animation configurations
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
          {isLoading && !currentCity
            ? "Detecting..."
            : currentCity || "Select City"}
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
