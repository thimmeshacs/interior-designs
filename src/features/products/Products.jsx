import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "./useProducts";
import { ArrowRight } from "lucide-react";

function Products() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { products, isLoading, error } = useProducts(category);

  // Handle navigation to product details with category in URL
  const handleProductClick = (productId) => {
    navigate(`/products/${category}/${productId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-700 bg-red-100 p-4 rounded-md shadow-sm">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-24 font-sans"
    >
      <h1 className="text-4xl font-bold mb-8 capitalize text-grey-900 dark:text-grey-0 transition-base">
        {category.replace(/-/g, " ")}
      </h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {products?.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-smooth overflow-hidden relative cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            {/* Product Image with overlay on hover */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-grey-900 opacity-0 group-hover:opacity-20 transition-smooth z-0"></div>
              <img
                src={product.image_url}
                alt={product.description}
                className="w-full h-full object-cover transform transition-smooth group-hover:scale-105"
              />
            </div>

            {/* Product Information */}
            <div className="p-5 flex flex-col h-[140px]">
              {/* Description */}
              <p className="text-grey-800 text-lg font-medium mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Horizontal divider */}
              <div className="w-16 h-1 bg-brand-300 my-3"></div>

              {/* View Details link at bottom right */}
              <div className="mt-auto self-end">
                <button className="text-brand-500 font-medium flex items-center gap-1 hover:text-brand-700 transition-smooth group">
                  View Details
                  <ArrowRight
                    size={16}
                    className="transform transition-smooth group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default Products;
