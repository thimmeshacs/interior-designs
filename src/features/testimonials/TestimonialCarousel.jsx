import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabaseClient";
import { motion } from "framer-motion";
import { useState } from "react";

function TestimonialCarousel() {
  const {
    data: testimonials,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*");
      if (error) throw error;
      return data;
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  if (isLoading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-16 text-red-500">
        Error: {error.message}
      </div>
    );

  const nextSlide = () =>
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrentIndex(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Clients Say
        </h2>
        <div className="relative max-w-2xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md text-center"
          >
            <p className="text-lg italic">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="mt-4 font-semibold">
              {testimonials[currentIndex].client_name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {testimonials[currentIndex].role}
            </p>
          </motion.div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-accent-teal text-white p-2 rounded-full"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-accent-teal text-white p-2 rounded-full"
          >
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialCarousel;
