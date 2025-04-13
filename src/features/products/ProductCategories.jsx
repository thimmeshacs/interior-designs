import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Kitchen Cabinets",
    description: "Modern and sleek designs",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
    slug: "kitchen-cabinets",
  },
  {
    title: "Doors",
    description: "Elegant wooden and glass door options",
    image:
      "https://images.unsplash.com/photo-1558346547-4439467bd1d5?auto=format&fit=crop&w=800&q=80",
    slug: "doors",
  },
  {
    title: "Windows",
    description: "Large, stylish windows for natural lighting",
    image:
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80",
    slug: "windows",
  },
  {
    title: "Tiles",
    description: "Variety of textures and colors",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=800&q=80",
    slug: "tiles",
  },
  {
    title: "Sanitary Ware",
    description: "High-quality bathroom fixtures",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    slug: "sanitary-ware",
  },
  {
    title: "Marbles",
    description: "Premium marble finishes",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    slug: "marbles",
  },
  {
    title: "Lighting",
    description: "Ambient and task lighting solutions",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    slug: "lighting",
  },
];

function ProductCategories() {
  const navigate = useNavigate();

  return (
    <section className="py-xl bg-grey-50">
      <div className="container mx-auto px-md max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/products/${category.slug}`)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg h-72 mb-md">
                <div className="absolute inset-0 bg-black opacity-40 transition-all duration-300 group-hover:opacity-30 z-10" />
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-lg z-20">
                  <h3 className="text-2xl font-bold mb-xs text-white">
                    {category.title}
                  </h3>
                  <p className="text-base text-white opacity-90">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;
