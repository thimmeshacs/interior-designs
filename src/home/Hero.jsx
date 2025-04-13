import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";

function Hero() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isHovering) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="hero-section"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="cursor-spotlight hidden md:block"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
          }}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
        }}
      />
      <div className="relative z-10 text-center text-grey-0 max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-sans mb-6"
        >
          Welcome to The Studio of Spaces
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl mb-12"
        >
          Where every room tells a story
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="animate-float"
        >
          <ArrowDown className="w-8 h-8 mx-auto" />
          <p className="mt-2">Enter the first space</p>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
