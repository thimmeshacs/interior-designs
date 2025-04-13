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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md h-64"
              onClick={() => navigate(`/products/${category.slug}`)}
            >
              <div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-30 z-10" />
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                <h3 className="text-xl font-semibold mb-1 text-white">
                  {category.title}
                </h3>
                <p className="text-sm text-white opacity-90">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCategories;
