import { motion } from "framer-motion";
import WhyChooseUs from "./WhyChooseUs";

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <p className="text-lg text-center mb-12">
          We are a team of passionate designers dedicated to transforming your
          living spaces with creativity and elegance.
        </p>
        <WhyChooseUs />
      </div>
    </motion.div>
  );
}

export default AboutPage;
