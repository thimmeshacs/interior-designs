import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProductDetails } from "./useProductDetails";
import { ArrowLeft } from "lucide-react";

function ProductDetails() {
  const { category, id } = useParams(); // Get both category and id
  const navigate = useNavigate();
  const { product, isLoading, error } = useProductDetails(id);

  // Handle back navigation to products list
  const handleBackClick = () => {
    navigate(`/products/${category}`);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-24 pb-12 font-sans"
    >
      {/* Back button */}
      <button
        onClick={handleBackClick}
        className="flex items-center gap-1 text-grey-700 hover:text-brand-500 mb-6 transition-smooth"
      >
        <ArrowLeft size={18} />
        <span>Back to {category.replace(/-/g, " ")}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg overflow-hidden shadow-md"
        >
          <img
            src={product.image_url}
            alt={product.description}
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-3xl font-bold text-grey-900 mb-4">
            {product.description}
          </h1>

          {product.dimension && (
            <div className="mb-4">
              <span className="text-sm font-medium text-grey-700">
                Dimensions:
              </span>
              <p className="text-grey-800">{product.dimension}</p>
            </div>
          )}

          {/* Display JSONB details if available */}
          {product.details && product.details.features && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-grey-900 mb-3">
                Features
              </h2>
              <ul className="space-y-2">
                {product.details.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-grey-800"
                  >
                    <span className="text-brand-500 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display category path if available */}
          {product.category_path && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-grey-900 mb-3">
                Category
              </h2>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(product.category_path) &&
                  product.category_path.map((categoryItem, index) => (
                    <span
                      key={index}
                      className="bg-grey-100 text-grey-700 px-3 py-1 rounded-full text-sm"
                    >
                      {categoryItem.replace(/_/g, " ")}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Additional details can be added here as needed */}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
