import { motion } from "framer-motion";
import ConsultationForm from "./ConsultationForm";
import { BiBuildingHouse, BiTime, BiPalette } from "react-icons/bi";

function BookingPage() {
  const features = [
    {
      icon: <BiBuildingHouse className="w-12 h-12 text-teal-600" />,
      title: "Expert Consultation",
      description:
        "Get personalized advice from our experienced interior designers",
    },
    {
      icon: <BiTime className="w-12 h-12 text-teal-600" />,
      title: "Flexible Scheduling",
      description: "Choose a time that works best for your schedule",
    },
    {
      icon: <BiPalette className="w-12 h-12 text-teal-600" />,
      title: "Custom Design Solutions",
      description: "Tailored interior design solutions for your space",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            Transform Your Space
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12"
          >
            Book a consultation with our expert interior designers and bring
            your vision to life
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <ConsultationForm />
      </div>
    </motion.div>
  );
}

export default BookingPage;
