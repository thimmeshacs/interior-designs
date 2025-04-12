import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    id: "kitchen",
    name: "Kitchen",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//kitchen_53453455.png",
    description: "Modern kitchen designs for every home",
    features: ["Custom Cabinets", "Modern Appliances", "Efficient Layout"],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//bedroom_master_52342245.png",
    description: "Comfortable and stylish bedroom layouts",
    features: ["Spacious Design", "Built-in Storage", "Ambient Lighting"],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//bathroom_master_9022233.png",
    description: "Elegant bathroom solutions",
    features: ["Modern Fixtures", "Luxury Finishes", "Smart Storage"],
  },
  {
    id: "living-room",
    name: "Living Room",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//livingroom_modern_9993322.png",
    description: "Modern living room concepts",
    features: ["Open Concept", "Natural Light", "Flexible Space"],
  },
  {
    id: "dining-room",
    name: "Dining Room",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//dining_room_modern_7845633.png",
    description: "Beautiful dining room setups",
    features: ["Elegant Design", "Perfect Flow", "Ambient Lighting"],
  },
  {
    id: "wardrobe",
    name: "Wardrobe",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//wardrobe_modern_0909323.png",
    description: "Custom wardrobe solutions",
    features: ["Custom Storage", "Organized Space", "Modern Design"],
  },
  {
    id: "window",
    name: "Window",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//window_modern_92332220.png",
    description: "Innovative window designs",
    features: ["Natural Light", "Energy Efficient", "Modern Style"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      onClick={() => navigate(`/designs/${category.id}`)}
      className="cursor-pointer group"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {category.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {category.description}
          </p>
          <div className="space-y-2">
            {category.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-gray-500 dark:text-gray-400"
              >
                <svg
                  className="w-4 h-4 mr-2 text-green-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            View Designs
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function DesignCategories() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </motion.div>
    </div>
  );
}

export default DesignCategories;
