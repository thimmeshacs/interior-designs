import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function ConsultationForm() {
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", { ...data, consultationDate: selectedDate });
  };

  const services = [
    "Full Home Design",
    "Single Room Makeover",
    "Color Consultation",
    "Furniture Selection",
    "Space Planning",
    "Kitchen & Bath Design",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <div className="bg-grey-0 rounded-lg shadow-md overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left side - Form */}
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
                      message: "Invalid phone number",
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

              <button
                type="submit"
                className="w-full bg-brand-600 text-grey-0 py-3 px-6 rounded-md hover:bg-brand-700 transition-base font-medium text-base"
              >
                Schedule Consultation
              </button>
            </form>
          </div>

          {/* Right side - Image and Info */}
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
                <span className="text-base">+91 72073 44618</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ConsultationForm;
