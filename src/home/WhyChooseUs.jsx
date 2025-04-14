// src/home/WhyChooseUs.jsx
import { motion } from "framer-motion";
import { HeartHandshake, Users, ClipboardList, Hammer } from "lucide-react";

function WhyChooseUs() {
  const processSteps = [
    {
      icon: <HeartHandshake />,
      title: "Tailored Design Solutions",
      description:
        "Every space we design is uniquely crafted to reflect your personal style and vision.",
    },
    {
      icon: <Users />,
      title: "Experienced & Passionate Team",
      description:
        "Our skilled designers bring years of experience and creative passion to every project.",
    },
    {
      icon: <ClipboardList />,
      title: "End-to-End Project Management",
      description:
        "We manage everything from concept to completion for a smooth, stress-free experience.",
    },
    {
      icon: <Hammer />,
      title: "Quality & Craftsmanship Guaranteed",
      description:
        "We work with trusted craftsmen and use premium materials for lasting quality.",
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
