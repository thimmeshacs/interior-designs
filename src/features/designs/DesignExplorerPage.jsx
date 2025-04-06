import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabaseClient";
import { motion } from "framer-motion";

function DesignExplorerPage() {
  const { data: designs, isLoading } = useQuery({
    queryKey: ["designs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("interior_designs")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="text-center py-16">Loading...</div>;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Explore Designs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {designs.map(design => (
            <motion.div
              key={design.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={design.image_url}
                alt={design.category}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-2 text-xl font-medium">{design.category}</h3>
              <p className="mt-1 text-sm">{design.description}</p>
              <p className="mt-2 text-accent-teal font-semibold">
                ₹{design.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DesignExplorerPage;
