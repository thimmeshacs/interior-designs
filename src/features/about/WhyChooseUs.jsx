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
    <div className="mb-spacing-xl">
      <h2 className="text-3xl font-semibold text-center mb-spacing-lg text-grey-800">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-spacing-md">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-grey-0 dark:bg-grey-800 p-spacing-md rounded-lg shadow-md text-center"
          >
            <h3 className="text-xl font-medium mb-spacing-sm text-grey-900 dark:text-grey-50">
              {reason.title}
            </h3>
            <p className="text-grey-600 dark:text-grey-300">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default WhyChooseUs;
