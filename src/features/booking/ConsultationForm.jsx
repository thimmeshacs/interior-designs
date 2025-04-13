import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

function ConsultationForm({ selectedCity }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [contactNumber, setContactNumber] = useState("+91 72073 44618");
  const [cityInput, setCityInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const services = [
    "Full Home Design",
    "Single Room Makeover",
    "Color Consultation",
    "Furniture Selection",
    "Space Planning",
    "Kitchen & Bath Design",
  ];

  useEffect(() => {
    setCityInput(selectedCity?.city || "");
  }, [selectedCity]);

  useEffect(() => {
    const fetchContactNumber = async () => {
      if (!selectedCity?.city || selectedCity?.notFound) {
        setContactNumber("+91 72073 44618");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("Citys_Data")
          .select("contact_1")
          .eq("city_name", selectedCity.city)
          .eq("status", "Active")
          .single();

        if (error || !data) {
          console.error("Error fetching contact:", error?.message);
          setContactNumber("+91 72073 44618");
        } else {
          setContactNumber(data.contact_1 || "+91 72073 44618");
        }
      } catch (err) {
        console.error("Supabase error:", err);
        setContactNumber("+91 72073 44618");
      }
    };

    fetchContactNumber();
  }, [selectedCity]);

  const onSubmit = async (data) => {
    try {
      if (!selectedDate) {
        throw new Error("Please select a preferred date");
      }
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const submissionData = {
        full_name: data.name,
        email_address: data.email,
        phone_number: data.phone,
        service_type: data.service,
        preferred_date: formattedDate,
        project_details: data.details || null,
        city_name: data.city || selectedCity?.city || "Unknown",
      };

      const { error } = await supabase
        .from("get_quotation_data")
        .insert([submissionData]);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Form submitted successfully!", {
        position: "top-right",
        duration: 3000,
      });

      setSubmittedName(data.name);
      setShowPopup(true);

      reset();
      setSelectedDate(null);
      setCityInput(selectedCity?.city || "");
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(
        err.message || "Failed to book consultation. Please try again.",
        {
          position: "top-right",
          duration: 4000,
        }
      );
    }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <Toaster />

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl border-t-4 border-brand-600"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Dear {submittedName},
              </h3>
              <p className="text-gray-700 mb-6">
                Thank you for choosing InteriorCo to transform your vision into
                reality! Our dedicated team of design experts is excited to
                connect with you soon, crafting a personalized experience to
                create the space of your dreams.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full bg-brand-600 text-white py-2 px-4 rounded-lg hover:bg-brand-700 transition duration-200 font-medium"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-grey-0 rounded-lg shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Form section */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-grey-900 mb-6">
              Book Your Consultation
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-grey-700 mb-2">
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-2 rounded-md border border-grey-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-red-700 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-grey-700 mb-2">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  className="w-full px-4 py-2 rounded-md border border-grey-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-700 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-grey-700 mb-2">
                  Phone Number
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                  className="w-full px-4 py-2 rounded-md border border-grey-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  placeholder="1234567890"
                />
                {errors.phone && (
                  <p className="mt-1 text-red-700 text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-grey-700 mb-2">
                  Service Type
                </label>
                <select
                  {...register("service", {
                    required: "Please select a service",
                  })}
                  className="w-full px-4 py-2 rounded-md border border-grey-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1 text-red-700 text-sm">
                    {errors.service.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-grey-700 mb-2">
                  Preferred Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-4 py-2 rounded-md border border-grey-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  minDate={new Date()}
                  placeholderText="Select a date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-grey-700 mb-2">
                  Project Details
                </label>
                <textarea
                  {...register("details")}
                  rows="4"
                  className="w-full px-4 py-2 rounded-md border border-grey-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-grey-700 mb-2">
                  City
                </label>
                <input
                  {...register("city", { required: "City is required" })}
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-grey-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-base"
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="mt-1 text-red-700 text-sm">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 text-grey-0 py-3 px-6 rounded-md hover:bg-brand-700 transition-base font-medium text-base"
              >
                Schedule Consultation
              </button>
            </form>
          </div>

          {/* Info section */}
          <div className="bg-brand-600 p-6 md:p-8 text-grey-0 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Why Choose Us?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-base">
                    Expert interior designers with years of experience
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-base">
                    Personalized design solutions for your space
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-base">
                    Comprehensive project management
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-brand-700 rounded-md p-6">
              <h4 className="text-lg font-semibold mb-2">Contact Support</h4>
              <p className="mb-4 text-base">
                Need help? Our team is here to assist you.
              </p>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-base">{contactNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ConsultationForm;
