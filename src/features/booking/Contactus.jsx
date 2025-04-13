import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Chatbot from "./Chatbot";

function Contactus() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = {
    phone: "+91 72073 44618",
    email: "info@homealive.in",
    address:
      "Home Alive Interiors, Retail Area, 1st Floor, Kukatpally Metro Station, Kukatpally, Hyderabad-500072",
    hours: "Mon to Fri 9.00AM to 6.00PM",
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Thanks for your message! We'll be in touch soon.");
      setFormState({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-grey-50 py-12 md:py-16">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-grey-0 rounded-lg shadow-md overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Contact Form */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-grey-800 mb-4">
                Get in Touch
              </h2>
              <p className="text-grey-600 mb-6 text-base">
                Have a question or want to discuss your project? Fill out the
                form below.
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-grey-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-grey-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-grey-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-md border border-grey-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-grey-700 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    className="w-full px-4 py-2 rounded-md border border-grey-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand-600 text-grey-0 px-6 py-3 rounded-md hover:bg-brand-700 transition-base flex items-center justify-center"
                >
                  <span className="text-base">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                </motion.button>
              </form>
            </div>
            {/* Contact Information */}
            <div className="bg-brand-600 p-6 md:p-8 text-grey-0">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-medium text-base">Phone</h4>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-sm hover:underline"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-medium text-base">Email</h4>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm hover:underline"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-medium text-base">Address</h4>
                    <p className="text-sm">{contactInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 mt-1" />
                  <div>
                    <h4 className="font-medium text-base">Business Hours</h4>
                    <p className="text-sm">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Chatbot />
    </div>
  );
}

export default Contactus;
