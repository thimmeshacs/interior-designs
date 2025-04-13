import { motion } from "framer-motion";
import WhyChooseUs from "./WhyChooseUs";

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-grey-50 dark:bg-grey-900"
    >
      <div className="container mx-auto px-spacing-md pt-[88px]">
        <div className="space-y-spacing-md py-spacing-xl">
          <h1 className="text-4xl font-bold text-center text-grey-900 dark:text-grey-0">
            About Us
          </h1>
          <p className="text-lg text-center max-w-3xl mx-auto text-grey-700 dark:text-grey-300">
            We are a team of passionate designers dedicated to transforming your
            living spaces with creativity and elegance.
          </p>
          <WhyChooseUs />
        </div>
      </div>
    </motion.div>
  );
}

export default AboutPage;
