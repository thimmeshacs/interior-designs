import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabaseClient";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei"; // For 3D viewer
import { useEffect, useState } from "react";

function DesignDetailsPage() {
  const { id } = useParams(); // Get design ID from URL

  // Fetch design details from Supabase
  const {
    data: design,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["design", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("interior_designs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  // State for related designs (optional carousel)
  const [relatedDesigns, setRelatedDesigns] = useState([]);
  useEffect(() => {
    if (design) {
      // Fetch related designs (same category, excluding current design)
      supabase
        .from("interior_designs")
        .select("*")
        .eq("category", design.category)
        .neq("id", design.id)
        .limit(3)
        .then(({ data }) => setRelatedDesigns(data || []));
    }
  }, [design]);

  if (isLoading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-16 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Main Image Section with 3D Viewer */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">{design.category} Design</h1>
          <div className="w-full h-[500px] bg-neutral-200 rounded-lg overflow-hidden">
            <Canvas>
              <Stage environment="city">
                <OrbitControls enableZoom={true} />
                {/* Placeholder 3D model - replace with actual 3D asset if available */}
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="teal" />
                </mesh>
              </Stage>
            </Canvas>
            {/* Fallback image if 3D isn't fully implemented */}
            <img
              src={design.image_url}
              alt={design.category}
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity"
            />
          </div>
        </motion.section>

        {/* Design Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Design Details</h2>
            <p className="text-lg">{design.description}</p>
            <p className="mt-4 text-accent-teal font-bold text-xl">
              ₹{design.price}
            </p>
            <p className="mt-2">BHK: {design.bhk}</p>
            <p className="mt-2">Elements: {design.design_elements}</p>
          </motion.div>

          {/* Dynamic Illustration Placeholder */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-100 p-4 rounded-lg"
          >
            <h3 className="text-xl font-medium mb-2">Layout Diagram</h3>
            <div className="w-full h-64 bg-gray-300 rounded-md flex items-center justify-center">
              <p>Interactive SVG/Canvas Diagram (To Be Implemented)</p>
            </div>
          </motion.div>
        </section>

        {/* Related Designs Carousel */}
        {relatedDesigns.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Related Designs</h2>
            <div className="flex space-x-4 overflow-x-auto">
              {relatedDesigns.map(related => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="min-w-[300px] bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={related.image_url}
                    alt={related.category}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="mt-2 text-xl font-medium">
                    {related.category}
                  </h3>
                  <p className="mt-1 text-sm">{related.description}</p>
                  <p className="mt-2 text-accent-teal font-semibold">
                    ₹{related.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default DesignDetailsPage;
