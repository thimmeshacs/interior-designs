import { motion } from "framer-motion";
import {
  Upload,
  Palette,
  GitCompare as Compare,
  Presentation as PresentationScreen,
} from "lucide-react";

function WhyChooseUs() {
  const processSteps = [
    {
      icon: <Upload />,
      title: "Upload Interior",
      description: "Upload your current interior images",
    },
    {
      icon: <Palette />,
      title: "AI Design",
      description: "Generate AI-based design concepts",
    },
    {
      icon: <Compare />,
      title: "Compare Options",
      description: "Compare and choose your preferred design",
    },
    {
      icon: <PresentationScreen />,
      title: "Visual Proposal",
      description: "Get before-and-after visual proposals",
    },
  ];

  return (
    <section className="py-xl bg-grey-0">
      <div className="container mx-auto px-md">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-sans text-grey-900 text-center mb-xl"
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-lg">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-grey-50 p-lg rounded-lg text-center shadow-sm hover:shadow-md transition-smooth"
            >
              <div className="w-16 h-16 mx-auto mb-md bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-grey-900 mb-sm">
                {step.title}
              </h3>
              <p className="text-grey-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
