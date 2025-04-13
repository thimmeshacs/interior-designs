import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-grey-50 flex items-center justify-center px-4">
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
          className="text-9xl font-bold text-grey-200"
        >
          404
        </motion.h1>

        <h2 className="mt-8 text-2xl font-semibold text-grey-800">
          Page Not Found
        </h2>
        <p className="mt-4 text-grey-600">
          Sorry, we couldn't find the page you're looking for. Perhaps you've
          mistyped the URL or the page has been moved.
        </p>

        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-6 py-3 text-sm font-medium text-grey-700 bg-grey-0 rounded-lg border border-grey-300 hover:bg-grey-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center px-6 py-3 text-sm font-medium text-grey-0 bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-base"
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
