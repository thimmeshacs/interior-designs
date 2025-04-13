import { motion } from "framer-motion";
import ConsultationForm from "./ConsultationForm";
import { BiBuildingHouse, BiTime, BiPalette } from "react-icons/bi";

function BookingPage() {
  const features = [
    {
      icon: <BiBuildingHouse className="w-16 h-16 text-brand-600" />,
      title: "Expert Consultation",
      description:
        "Get personalized advice from our experienced interior designers",
    },
    {
      icon: <BiTime className="w-16 h-16 text-brand-600" />,
      title: "Flexible Scheduling",
      description: "Choose a time that works best for your schedule",
    },
    {
      icon: <BiPalette className="w-16 h-16 text-brand-600" />,
      title: "Custom Design Solutions",
      description: "Tailored interior design solutions for your space",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-grey-50 to-grey-100 pt-32 md:pt-40 pb-24"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-grey-900 mb-6"
          >
            Transform Your Space
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-grey-600 max-w-2xl mx-auto mb-16"
          >
            Book a consultation with our expert interior designers and bring
            your vision to life
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-grey-0 rounded-xl p-8 shadow-lg hover:shadow-xl transition-smooth"
              >
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold text-grey-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-grey-600 text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <ConsultationForm />
        </div>
      </div>
    </motion.div>
  );
}

export default BookingPage;
