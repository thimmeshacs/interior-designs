import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabaseClient";
import { motion } from "framer-motion";
import { PhotoView } from "react-photo-view"; // For image zoom functionality

function IllustrationGallery() {
  const {
    data: illustrations,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["illustrations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("illustrations").select("*");
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-16 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Illustration Gallery
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {illustrations.map(illustration => (
            <motion.div
              key={illustration.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
            >
              <PhotoView src={illustration.image_url}>
                <img
                  src={illustration.image_url}
                  alt={illustration.title}
                  className="w-full h-64 object-cover cursor-pointer"
                />
              </PhotoView>
              <div className="p-4">
                <h3 className="text-xl font-medium">{illustration.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {illustration.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default IllustrationGallery;
