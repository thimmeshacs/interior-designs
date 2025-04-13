import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect, memo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegEnvelope,
  FaRegClock,
  FaChevronRight,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaRegGem,
  FaRegLightbulb,
  FaRegBuilding,
  FaRegHandshake,
  FaRegCommentAlt,
} from "react-icons/fa";
import { supabase } from "../services/supabaseClient";

const Footer = memo(({ cityDetails }) => {
  const [email, setEmail] = useState("");
  const [operationalCities, setOperationalCities] = useState([]);
  const [upcomingCities, setUpcomingCities] = useState([]);
  const scrollRef = useRef(null);
  const controls = useAnimationControls();

  const defaultContactInfo = {
    address:
      "Homealive Interiors, Retail Area, 1st Floor, Kukatpally Metro Station, Kukatpally, Hyderabad-500072",
    phone: "+91 11111 44618",
    email: "info@homealive.in",
    hours: "Mon to Fri 9.00AM to 6.00PM",
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await supabase
          .from("Citys_Data")
          .select("city_name, status")
          .in("status", ["Active", "Comming Soon"]);

        const active = data
          .filter((c) => c.status === "Active")
          .map((c) => c.city_name);
        const coming = data
          .filter((c) => c.status === "Comming Soon")
          .map((c) => c.city_name);

        setOperationalCities(active);
        setUpcomingCities(coming);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    controls.start({
      x: "-100%",
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });

    return () => controls.stop();
  }, [controls]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const contact = cityDetails || defaultContactInfo;

  return (
    <motion.footer
      className="bg-gradient-to-br from-grey-50 to-grey-100 pt-24 pb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* City Scroller */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-4">
            <FaMapMarkerAlt className="text-brand-500 text-2xl" />
            <h4 className="text-xl font-bold text-grey-800 relative after:absolute after:bg-brand-500 after:h-0.5 after:w-8 after:bottom-0 after:left-0 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-base">
              Operational Cities
            </h4>
          </div>
          <motion.div
            className="relative overflow-hidden bg-grey-0 rounded-lg shadow-md p-4"
            onMouseEnter={async () => {
              await controls.stop();
            }}
            onMouseLeave={() => {
              controls.start({
                x: "-100%",
                transition: {
                  duration: 20,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop",
                },
              });
            }}
          >
            <motion.div
              ref={scrollRef}
              className="flex space-x-8 whitespace-nowrap"
              animate={controls}
            >
              {operationalCities.map((city, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center space-x-3 group"
                >
                  <FaMapMarkerAlt className="text-brand-500 text-xl" />
                  <span className="text-grey-700 text-lg font-medium group-hover:text-brand-500 transition-base">
                    {city}
                  </span>
                </div>
              ))}
              {operationalCities.length > 0 && (
                <>
                  {operationalCities.map((city, index) => (
                    <div
                      key={`dup-${index}`}
                      className="flex-shrink-0 flex items-center space-x-3 group"
                    >
                      <FaMapMarkerAlt className="text-brand-500 text-xl" />
                      <span className="text-grey-700 text-lg font-medium group-hover:text-brand-500 transition-base">
                        {city}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Links Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaRegHandshake className="text-brand-500 text-2xl" />
              <h4 className="text-xl font-bold text-grey-800 relative after:absolute after:bg-brand-500 after:h-0.5 after:w-8 after:bottom-0 after:left-0 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-base">
                Quick Links
              </h4>
            </div>

            <ul className="space-y-3">
              {[
                { label: "Home", icon: FaRegGem },
                { label: "Designs", icon: FaRegLightbulb },
                { label: "About", icon: FaRegBuilding },
                { label: "Services", icon: FaRegHandshake },
                { label: "Portfolio", icon: FaRegCommentAlt },
              ].map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Link
                    to={`/${label.toLowerCase()}`}
                    className="text-grey-600 hover:text-brand-500 transition-base flex items-center group"
                  >
                    <motion.span className="mr-2" whileHover={{ scale: 1.1 }}>
                      <Icon className="text-brand-500" />
                    </motion.span>
                    <span className="group-hover:translate-x-2 transition-base">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaRegEnvelope className="text-brand-500 text-2xl" />
              <h4 className="text-xl font-bold text-grey-800 relative after:absolute after:bg-brand-500 after:h-0.5 after:w-8 after:bottom-0 after:left-0 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-base">
                Contact Us
              </h4>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <FaMapMarkerAlt className="text-brand-500 text-xl mt-1 flex-shrink-0 transition-transform group-hover:scale-110" />
                <span className="text-grey-600 text-sm leading-relaxed group-hover:text-brand-500 transition-base">
                  {contact.address_1 || contact.address}
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <FaPhoneAlt className="text-brand-500 text-lg transition-transform group-hover:scale-110" />
                <a
                  href={`tel:${contact.contact_1 || contact.phone}`}
                  className="text-grey-600 hover:text-brand-500 transition-base group"
                >
                  <span className="group-hover:underline">
                    {contact.contact_1 || contact.phone}
                  </span>
                </a>
              </li>
              {contact.contact_2 && (
                <li className="flex items-center space-x-3 group">
                  <FaPhoneAlt className="text-brand-500 text-lg transition-transform group-hover:scale-110" />
                  <a
                    href={`tel:${contact.contact_2}`}
                    className="text-grey-600 hover:text-brand-500 transition-base group"
                  >
                    <span className="group-hover:underline">
                      {contact.contact_2}
                    </span>
                  </a>
                </li>
              )}
              <li className="flex items-center space-x-3 group">
                <FaRegEnvelope className="text-brand-500 text-lg transition-transform group-hover:scale-110" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-grey-600 hover:text-brand-500 transition-base group"
                >
                  <span className="group-hover:underline">{contact.email}</span>
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <FaRegClock className="text-brand-500 text-lg transition-transform group-hover:scale-110" />
                <span className="text-grey-600 group-hover:text-brand-500 transition-base">
                  {contact.hours}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaRegCommentAlt className="text-brand-500 text-2xl" />
              <h4 className="text-xl font-bold text-grey-800 relative after:absolute after:bg-brand-500 after:h-0.5 after:w-8 after:bottom-0 after:left-0 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-base">
                Newsletter
              </h4>
            </div>

            <div className="space-y-4">
              <p className="text-grey-600">
                Subscribe for exclusive updates and design inspiration
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg border border-grey-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base bg-grey-0 shadow-sm"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="absolute right-0 top-0 mt-1 mr-2 bg-brand-500 text-grey-0 px-4 py-2 rounded-lg hover:bg-brand-600 transition-base"
                  >
                    <FaRegEnvelope className="text-lg" />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Upcoming Cities Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <FaRegLightbulb className="text-brand-500 text-2xl" />
              <h4 className="text-xl font-bold text-grey-800 relative after:absolute after:bg-brand-500 after:h-0.5 after:w-8 after:bottom-0 after:left-0 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-base">
                Coming Soon
              </h4>
            </div>

            <ul className="space-y-4">
              {upcomingCities.length > 0 ? (
                upcomingCities.map((city) => (
                  <li
                    key={city}
                    className="text-grey-600 flex items-center space-x-2"
                  >
                    <FaChevronRight className="text-brand-500 text-xs" />
                    <span>{city}</span>
                  </li>
                ))
              ) : (
                <li className="text-grey-600 flex items-center space-x-2">
                  <FaRegClock className="text-brand-500" />
                  <span>More cities coming soon!</span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-grey-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-grey-600 text-sm md:text-base">
              © {new Date().getFullYear()} Home Alive Interiors. All rights
              reserved.
              <br className="md:hidden" />
              <span className="hidden md:inline"> | </span>
              <span className="text-brand-500 font-medium">Crafted with</span>
              <span className="text-red-700 mx-1">❤</span>
              <span className="text-brand-500 font-medium">in Bengalore</span>
            </p>

            <div className="flex items-center space-x-8">
              <div className="flex space-x-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map(
                  (Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-grey-0 shadow-lg flex items-center justify-center text-grey-600 hover:text-brand-500 transition-base"
                    >
                      <Icon className="text-lg" />
                    </motion.a>
                  )
                )}
              </div>

              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-grey-600 hover:text-brand-500 transition-base flex items-center group"
                >
                  <span className="mr-1">Privacy Policy</span>
                  <motion.span
                    className="block w-2 h-2 bg-brand-500 rounded-full"
                    layoutId="privacy-policy"
                  />
                </a>
                <a
                  href="#"
                  className="text-grey-600 hover:text-brand-500 transition-base flex items-center group"
                >
                  <span className="mr-1">Terms of Service</span>
                  <motion.span
                    className="block w-2 h-2 bg-brand-500 rounded-full"
                    layoutId="terms-service"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
});

export default Footer;
