import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  const [email, setEmail] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add newsletter subscription logic here
    setEmail("");
  };

  const contactInfo = {
    address:
      "Home Alive Interiors, Retail Area, 1st Floor, Kukatpally Metro Station, Kukatpally, Hyderabad-500072",
    phone: "+91 72073 44618",
    email: "info@homealive.in",
    hours: "Mon to Fri 9.00AM to 6.00PM",
  };

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      className="bg-gradient-to-br from-gray-50 to-gray-100 pt-16 pb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-accent-teal to-teal-600 bg-clip-text text-transparent">
              Home Alive Interiors
            </h3>
            <p className="text-gray-600 pr-4">
              Transform your living spaces with our expert interior design
              services. We bring your vision to life.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Designs", "About", "Services", "Portfolio"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase()}`}
                      className="text-gray-600 hover:text-accent-teal transition-colors duration-300 flex items-center space-x-2"
                    >
                      <span>→</span>
                      <span>{link}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-accent-teal mt-1 flex-shrink-0" />
                <span className="text-gray-600 text-sm">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-accent-teal" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-600 hover:text-accent-teal transition-colors duration-300"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-accent-teal" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-600 hover:text-accent-teal transition-colors duration-300"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaClock className="text-accent-teal" />
                <span className="text-gray-600 text-sm">
                  {contactInfo.hours}
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Newsletter</h4>
            <p className="text-gray-600">
              Subscribe to receive updates and interior design tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-accent-teal focus:border-transparent transition duration-200"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3 w-full bg-accent-teal text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Home Alive Interiors. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-600 hover:text-accent-teal transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-accent-teal transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
