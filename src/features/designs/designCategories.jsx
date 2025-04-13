import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    id: "kitchen",
    name: "Kitchen",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//kitchen_53453455.png",
    description: "Modern kitchen designs for every home",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//bedroom_master_52342245.png",
    description: "Comfortable and stylish bedroom layouts",
  },
  {
    id: "bathroom",
    name: "Bathroom",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//bathroom_master_9022233.png",
    description: "Elegant bathroom solutions",
  },
  {
    id: "living-room",
    name: "Living Room",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//livingroom_modern_9993322.png",
    description: "Modern living room concepts",
  },
  {
    id: "dining-room",
    name: "Dining Room",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//dining_room_modern_7845633.png",
    description: "Beautiful dining room setups",
  },
  {
    id: "wardrobe",
    name: "Wardrobe",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//wardrobe_modern_0909323.png",
    description: "Custom wardrobe solutions",
  },
  {
    id: "window",
    name: "Window",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//window_modern_92332220.png",
    description: "Innovative window designs",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
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
      <div className="bg-grey-0 dark:bg-grey-800 rounded-xl overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-xl">
        <div className="relative h-72 overflow-hidden">
          <motion.img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-grey-900 dark:text-grey-0 mb-3">
            {category.name}
          </h3>
          <p className="text-grey-600 dark:text-grey-300">
            {category.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function DesignCategories() {
  return (
    <div className="container mx-auto px-4 py-12">
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
