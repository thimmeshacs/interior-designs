import { motion } from "framer-motion";

function WhyChooseUs() {
  const reasons = [
    {
      title: "Expert Designers",
      desc: "Our team consists of experienced professionals.",
    },
    {
      title: "Custom Solutions",
      desc: "Tailored designs to fit your unique style.",
    },
    {
      title: "Affordable Pricing",
      desc: "Quality designs at competitive rates.",
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center"
          >
            <h3 className="text-xl font-medium mb-2">{reason.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default WhyChooseUs;
