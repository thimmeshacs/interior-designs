import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../services/supabaseClient";
import { ArrowRight, Home, Lightbulb, Heart } from "lucide-react"; // Added icons
import { useEffect, useState } from "react";

function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true });
  const heroImages = [
    "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/images//Home_PageBG1.webp",
    "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/images//Home_PageBG2.webp",
    "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/images//Home_PageBG3.webp",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroInView) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroInView]);

  const { data: designs, isLoading } = useQuery({
    queryKey: ["designs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("interior_designs")
        .select("*")
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary dark:border-white rounded-full border-t-transparent"
        />
      </div>
    );
  }

  const features = [
    {
      title: "Modern Living",
      description: "Contemporary designs for modern lifestyles",
      icon: <Home className="w-6 h-6 text-primary" />,
    },
    {
      title: "Creative Solutions",
      description: "Innovative approaches to space utilization",
      icon: <Lightbulb className="w-6 h-6 text-primary" />,
    },
    {
      title: "Comfort First",
      description: "Prioritizing comfort in every design",
      icon: <Heart className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 to-sage-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <motion.div
            key={currentImageIndex}
            style={{
              backgroundImage: `url(${heroImages[currentImageIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7)",
            }}
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1,
              },
            }}
            className="text-6xl font-bold mb-6"
          >
            {Array.from("Transform Your Living Space").map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl mb-8"
          >
            Discover extraordinary interior designs that reflect your style
          </motion.p>
          <Link to="/designs">
            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative inline-flex items-center px-8 py-3 bg-white text-gray-900 rounded-full font-semibold overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-primary/20"
                initial={{ scale: 0 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className="relative z-10">Explore Designs</span>
              <ArrowRight className="ml-2 w-5 h-5 relative z-10" />
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="py-20 bg-white dark:bg-gray-900 relative"
      >
        <svg
          className="absolute top-0 left-0 right-0 h-16 -mt-8"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path fill="#ffffff" fillOpacity="1"></path>
        </svg>
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Key Features
          </motion.h2>
          <div className="relative">
            <motion.div
              className="hidden md:block"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
                hidden: { opacity: 0 },
              }}
            >
              <div className="grid grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 50 },
                    }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="bg-white dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg h-48 flex flex-col justify-between">
                      <div className="flex items-center">
                        {feature.icon}
                        <h3 className="text-xl font-semibold ml-2 text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="md:hidden overflow-x-auto scroll-smooth snap-x"
              initial="hidden"
              animate={featuresInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
                hidden: { opacity: 0 },
              }}
            >
              <div className="flex snap-x">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    variants={{
                      visible: { opacity: 1, x: 0 },
                      hidden: { opacity: 0, x: 50 },
                    }}
                    transition={{ duration: 0.8 }}
                    className="snap-center flex-shrink-0 w-full sm:w-96 px-4"
                  >
                    <div className="bg-white dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg h-48 flex flex-col justify-between">
                      <div className="flex items-center">
                        {feature.icon}
                        <h3 className="text-xl font-semibold ml-2 text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Designs Section */}
      <section className="py-20 bg-sage-50/50 dark:bg-gray-900/50 relative">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            Latest Designs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {designs?.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                className="group relative overflow-hidden rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg"
                whileHover="hover"
                variants={{
                  hover: {
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  },
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={design.image_url}
                    alt={design.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {design.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {design.description}
                  </p>
                  <Link
                    to={`/designs/${design.id}`}
                    className="inline-flex items-center text-primary font-semibold hover:underline"
                  >
                    View Details
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
