import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-9xl font-bold text-gray-200"
        >
          404
        </motion.h1>

        <h2 className="mt-8 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-4 text-gray-600">
          Sorry, we couldn't find the page you're looking for. Perhaps you've
          mistyped the URL or the page has been moved.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Home className="w-4 h-4 mr-2" />
            Home Page
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
