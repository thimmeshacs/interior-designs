import { motion } from "framer-motion";
import ProductCategories from "../features/products/ProductCategories";

function ProductCategoriesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-sans mb-4">Our Products</h1>
          <p className="text-grey-600 max-w-2xl mx-auto">
            Discover our extensive range of high-quality interior products, each
            carefully selected to help you create your perfect space.
          </p>
        </motion.div>
      </div>
      <ProductCategories />
    </motion.div>
  );
}

export default ProductCategoriesPage;
