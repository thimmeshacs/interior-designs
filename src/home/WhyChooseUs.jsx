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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-serif text-center mb-16"
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 p-6 rounded-lg text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
