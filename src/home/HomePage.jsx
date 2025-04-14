// src/home/HomePage.jsx
import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import CTASection from "./CTASection";
import DesignCategoriesGrid from "./DesignCategoriesGrid";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

function HomePage() {
  const logos = [
    { name: "Godrej", src: "/assets/partners/godrej.png" },
    { name: "Nimmi", src: "/assets/partners/nimmi.png" },
    { name: "Bosch", src: "/assets/partners/bosch.png" },
    { name: "Kaff", src: "/assets/partners/kaff.png" },
    { name: "Hettich", src: "/assets/partners/hettich.png" },
    { name: "Ebco", src: "/assets/partners/ebco.png" },
  ];

  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (marqueeRef.current) observer.observe(marqueeRef.current);
    return () => marqueeRef.current && observer.unobserve(marqueeRef.current);
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <DesignCategoriesGrid />

      {/* Trusted Partners */}
      <section className="py-20 bg-grey-0">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-sans text-center mb-12"
          >
            Our Trusted Partners
          </motion.h2>

          <div
            ref={marqueeRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="overflow-hidden relative"
          >
            <motion.div
              animate={{
                x: isHovered || !inView ? 0 : ["0%", "-100%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              className="flex gap-16 whitespace-nowrap"
            >
              {[...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="min-w-[150px] h-24 flex items-center justify-center p-4 hover:scale-105 transition-transform cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

export default HomePage;
