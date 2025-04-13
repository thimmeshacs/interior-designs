import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const categories = [
  {
    id: "kitchen",
    name: "Kitchen",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//kitchen_53453455.png",
    span: "col-span-2 row-span-2",
    height: 400,
  },
  {
    id: "bedroom",
    name: "Bedroom",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//bedroom_master_52342245.png",
    span: "col-span-1 row-span-1",
    height: 200,
  },
  {
    id: "bathroom",
    name: "Bathroom",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//bathroom_master_9022233.png",
    span: "col-span-1 row-span-2",
    height: 400,
  },
  {
    id: "living-room",
    name: "Living Room",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//livingroom_modern_9993322.png",
    span: "col-span-2 row-span-1",
    height: 200,
  },
  {
    id: "dining-room",
    name: "Dining Room",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//dining_room_modern_7845633.png",
    span: "col-span-1 row-span-1",
    height: 200,
  },
  {
    id: "wardrobe",
    name: "Wardrobe",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//wardrobe_modern_0909323.png",
    span: "col-span-1 row-span-1",
    height: 200,
  },
  {
    id: "window",
    name: "Window",
    image:
      "https://nesdosiongcedbcytfzl.supabase.co/storage/v1/object/public/designimages//window_modern_92332220.png",
    span: "col-span-2 row-span-1",
    height: 200,
  },
];

function DesignCategoriesGrid() {
  const navigate = useNavigate();
  const [columns, setColumns] = useState(4);
  const gridRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = categories.length;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1);
      } else if (width < 768) {
        setColumns(2);
      } else if (width < 1024) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const preloadImages = () => {
      categories.forEach((category) => {
        const img = new Image();
        img.src = category.image;
        img.onload = () => {
          setImagesLoaded((prev) => {
            const newCount = prev + 1;
            if (newCount === totalImages) {
              setLoaded(true);
            }
            return newCount;
          });
        };
      });
    };

    preloadImages();
  }, []);

  const getMasonryItems = () => {
    const columnItems = Array.from({ length: columns }, () => []);
    let columnHeights = Array(columns).fill(0);

    categories.forEach((category, index) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      columnItems[shortestColumn].push(category);
      columnHeights[shortestColumn] += category.height;
    });

    return columnItems;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <section className="py-20 bg-grey-0 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-sans text-center mb-16"
        >
          Explore Our Design Categories
        </motion.h2>

        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {loaded ? (
            getMasonryItems().map((column, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className="flex flex-col gap-4 md:gap-6"
              >
                {column.map((category, itemIndex) => (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: "var(--shadow-xl)",
                    }}
                    className="relative overflow-hidden rounded-xl cursor-pointer group"
                    style={{ height: `${category.height}px` }}
                    onClick={() => navigate(`/designs/${category.id}`)}
                    layoutId={`category-${category.id}`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-grey-900/20 transition-base"
                      whileHover={{ opacity: 0 }}
                    />
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-grey-900/70 via-grey-900/20 to-transparent opacity-70 group-hover:opacity-100 transition-base" />
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-base group-hover:scale-110"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1 * (columnIndex + itemIndex),
                          duration: 0.6,
                        }}
                        className="transform group-hover:translate-y-0 translate-y-2 transition-base"
                      >
                        <h3 className="text-2xl font-bold text-grey-0 mb-2 group-hover:text-brand-500 transition-base">
                          {category.name}
                        </h3>
                        <div className="flex items-center">
                          <div className="h-1 w-12 bg-grey-0 group-hover:bg-brand-500 group-hover:w-16 transition-base" />
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            whileHover={{ opacity: 1, width: "auto" }}
                            className="ml-2 text-grey-0 text-sm opacity-0 group-hover:opacity-100 transition-base"
                          >
                            View Designs
                          </motion.span>
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-1 bg-brand-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </motion.div>
                ))}
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full">
              {Array.from({ length: totalImages }).map((_, index) => (
                <div
                  key={`placeholder-${index}`}
                  className="animate-pulse bg-grey-300 rounded-xl h-[200px]"
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default DesignCategoriesGrid;
