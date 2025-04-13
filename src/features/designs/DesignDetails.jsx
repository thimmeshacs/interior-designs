import { motion } from "framer-motion";
import { useDesignDetails } from "./useDesignDetails";
import MoveBack from "../../ui/MoveBack";
import { Calendar, ChevronRight } from "lucide-react";

function DesignDetails({ categoryname, id }) {
  const { design, isLoading, error } = useDesignDetails(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    console.log(error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-700">Error: {error.message}</div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-grey-500">Design not found</div>
      </div>
    );
  }

  const renderDetailsSections = () => {
    if (!design.details || !design.details.details) return null;

    return Object.entries(design.details.details).map(([key, value]) => {
      if (!value || key === "0" || key === "1") return null;

      return (
        <div key={key} className="mb-8 last:mb-0">
          <h2 className="text-xl font-semibold text-grey-900 mb-4 flex items-center">
            <ChevronRight className="w-5 h-5 text-brand-500 mr-2" />
            <span className="capitalize">{key.replace(/_/g, " ")}</span>
          </h2>

          {typeof value === "object" && !Array.isArray(value) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(value).map(([subKey, subValue]) => (
                <div
                  key={subKey}
                  className="bg-grey-50 rounded-lg p-5 border border-grey-100 hover:border-brand-200 transition-colors duration-300"
                >
                  <p className="text-sm font-medium text-grey-500 capitalize mb-2">
                    {subKey.replace(/_/g, " ")}
                  </p>
                  <p className="text-grey-900">{subValue}</p>
                </div>
              ))}
            </div>
          ) : Array.isArray(value) ? (
            <div className="bg-grey-50 rounded-lg p-6 border border-grey-100">
              <ul className="space-y-3">
                {value.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 mt-2 bg-brand-500 rounded-full mr-3" />
                    <span className="text-grey-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-grey-50 rounded-lg p-5 border border-grey-100">
              <p className="text-grey-700">{value}</p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <MoveBack />
      </div>

      <div className="bg-grey-0 rounded-2xl shadow-xl overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <div className="relative h-[600px] lg:h-full">
              <img
                src={design.main.image_url}
                alt={design.main.description}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          <div className="lg:w-1/2 lg:overflow-y-auto lg:h-[600px] scrollbar-thin scrollbar-thumb-grey-200 scrollbar-track-transparent">
            <div className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-grey-900 mb-3">
                  {design.main.description}
                </h1>
                <div className="flex items-center space-x-2 text-grey-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(design.main.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="bg-grey-50 rounded-lg p-6 border border-grey-100 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-grey-500">Category</span>
                    <span className="text-grey-900 capitalize bg-brand-50 px-3 py-1 rounded-full text-sm">
                      {design.main.category.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-grey-500">
                      Room Dimension
                    </span>
                    <span className="text-grey-900 bg-blue-100 px-3 py-1 rounded-full text-sm">
                      {design.main.room_dimension}
                    </span>
                  </div>
                </div>
              </div>

              {renderDetailsSections()}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DesignDetails;
