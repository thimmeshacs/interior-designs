import Hero from "./Hero";
import WhyChooseUs from "./WhyChooseUs";
import ProductCategories from "./ProductCategories";
import CTASection from "./CTASection";
import { motion } from "framer-motion";
import { MapPin, Building2 } from "lucide-react";

function HomePage() {
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Miami",
    "Houston",
    "Seattle",
  ];
  const partners = [
    "Modern Homes Co.",
    "Elite Interiors",
    "Design Masters",
    "Luxury Living",
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <ProductCategories />

      {/* Cities and Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-serif text-center mb-16"
          >
            Our Reach and Partners
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <MapPin className="mr-2" />
                Operational Cities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {cities.map((city) => (
                  <div key={city} className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-teal-600" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-6">Trusted Partners</h3>
              <div className="grid grid-cols-2 gap-4">
                {partners.map((partner) => (
                  <div key={partner} className="p-4 bg-gray-50 rounded">
                    {partner}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

export default HomePage;
