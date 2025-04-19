import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaLeaf,
  FaLightbulb,
  FaPalette,
  FaHome,
  FaHeart,
} from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function AboutPage() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: false, threshold: 0.3 });
  const navigate = useNavigate();

  // Mouse follower effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const values = [
    {
      icon: <FaLeaf />,
      title: "Sustainable",
      text: "Eco-friendly practices and materials",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovative",
      text: "Cutting-edge design solutions",
    },
    {
      icon: <FaPalette />,
      title: "Artistic",
      text: "Creative expression in every detail",
    },
    {
      icon: <FaHeart />,
      title: "Passionate",
      text: "Dedicated to exceeding expectations",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, var(--color-grey-50) 0%, var(--color-grey-100) 100%)",
      }}
    >
      {/* Custom cursor spotlight */}
      <div
        className="cursor-spotlight"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          opacity: isScrolled ? 0.5 : 0.8,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Hero section */}
      <div className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute w-full h-full">
          <div className="absolute top-0 right-0 w-3/5 h-full overflow-hidden z-0 opacity-80">
            <motion.div
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "saturate(1.2)",
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-grey-50)] via-[var(--color-grey-50)] to-transparent z-10" />
        </div>

        <div className="container mx-auto px-spacing-md pt-[120px] relative z-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-lg font-medium tracking-wider text-brand-600 mb-4 uppercase"
              style={{ letterSpacing: "0.25em" }}
            >
              <span className="inline-block mr-2 transform -translate-y-1">
                ―
              </span>
              Our Story
            </motion.h2>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl font-bold mb-6 leading-tight"
              style={{
                fontWeight: 700,
                background:
                  "linear-gradient(to right, var(--color-brand-700), var(--color-brand-500))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              About
              <span className="relative">
                <span className="relative z-10"> Home Alive</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                  className="absolute bottom-2 left-0 h-3 bg-brand-200 z-0"
                  style={{ borderRadius: "var(--border-radius-sm)" }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl leading-relaxed text-grey-700 mb-8"
              style={{ fontWeight: 400, lineHeight: 1.7 }}
            >
              Home Alive doesn't just decorate spaces, we{" "}
              <em className="font-medium text-brand-600">awaken</em> them. With
              a meticulous eye for detail and a passion for translating personal
              visions into vibrant realities, our team breathes life into your
              home.
            </motion.p>

            <motion.div variants={fadeInUp} className="mb-10">
              <p
                className="text-xl leading-relaxed text-grey-700 mb-6"
                style={{ lineHeight: 1.7 }}
              >
                Imagine a space where the color palette sings your story,
                curated furnishings whisper comfort, and every element reflects
                both your unique personality and our unwavering commitment to
                excellence.
              </p>
              <p
                className="text-xl leading-relaxed text-grey-700"
                style={{ lineHeight: 1.7 }}
              >
                Home Alive believes your haven shouldn't just look stunning—it
                should{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">feel alive</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-300 z-0"></span>
                </span>{" "}
                with purpose and personality.
              </p>
            </motion.div>

            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-brand-600 text-white px-8 py-4 rounded-md font-medium transition-all hover:bg-brand-700 hover:shadow-lg"
              style={{ borderRadius: "var(--border-radius-md)" }}
            >
              <span>Discover Our Process</span>
              <BsArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mission section */}
      <div className="py-spacing-xl relative z-10" ref={contentRef}>
        <div className="container mx-auto px-spacing-md">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-grey-800 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row"
            style={{ borderRadius: "var(--border-radius-2xl)" }}
          >
            <div className="md:w-1/2 p-12 md:p-16 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-8 relative">
                Our Mission
                <span className="absolute -bottom-3 left-0 w-16 h-1 bg-brand-500"></span>
              </h2>
              <p className="text-lg text-grey-700 dark:text-grey-300 mb-6 leading-relaxed">
                We believe that exceptional interior design creates harmony
                between aesthetics and functionality, transforming ordinary
                spaces into extraordinary experiences that enrich daily life.
              </p>
              <p className="text-lg text-grey-700 dark:text-grey-300 leading-relaxed">
                Every project begins with understanding your unique story,
                preferences, and lifestyle, allowing us to craft spaces that are
                not only visually stunning but deeply personal and meaningful.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {[
                  { number: "7+", label: "Years Experience" },
                  { number: "350+", label: "Projects Completed" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg bg-grey-50 dark:bg-grey-700"
                  >
                    <h3 className="text-3xl font-bold text-brand-600">
                      {item.number}
                    </h3>
                    <p className="text-sm text-grey-600 dark:text-grey-400">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 relative min-h-[400px]">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-10">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Crafting Living Art
                  </h3>
                  <p className="text-white/80">
                    Where design meets emotion and function
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values section */}
      <div className="py-spacing-xl bg-grey-100 dark:bg-grey-800 relative z-10">
        <div className="container mx-auto px-spacing-md">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 relative inline-block">
              Our Core Values
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute -bottom-3 left-0 h-1 bg-brand-500"
              ></motion.span>
            </h2>
            <p className="text-xl text-grey-700 dark:text-grey-300 max-w-3xl mx-auto">
              These principles guide every decision we make and define how we
              approach each project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white dark:bg-grey-700 p-8 rounded-xl flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all"
                style={{ borderRadius: "var(--border-radius-xl)" }}
              >
                <div className="text-4xl text-brand-500 mb-4 p-5 bg-brand-50 dark:bg-brand-900/30 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-grey-600 dark:text-grey-400">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Design approach */}
      <div className="py-spacing-xl relative z-10">
        <div className="container mx-auto px-spacing-md">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-4xl font-bold mb-6">Our Design Approach</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Listen",
                    desc: "We begin by understanding your vision, needs, and lifestyle.",
                  },
                  {
                    title: "Conceptualize",
                    desc: "We transform your ideas into thoughtful design concepts.",
                  },
                  {
                    title: "Create",
                    desc: "We bring designs to life with careful attention to detail.",
                  },
                  {
                    title: "Deliver",
                    desc: "We reveal spaces that exceed expectations and inspire.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-grey-700 dark:text-grey-300">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 1.1, y: 20 }}
                  whileInView={{ scale: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden shadow-xl"
                  style={{ borderRadius: "var(--border-radius-2xl)" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                    alt="Interior design process"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-10">
                    <div className="text-white max-w-sm">
                      <div className="text-brand-400 text-sm uppercase tracking-wider mb-2">
                        <GiSofa className="inline-block mr-2" /> Featured
                        Project
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Coastal Elegance Villa
                      </h3>
                      <p className="text-white/80">
                        A harmonious blend of beachside tranquility and
                        sophisticated design
                      </p>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-100 rounded-full flex items-center justify-center z-[-1]" />
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-brand-200 rounded-full z-[-1]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonial section */}
      <div className="py-spacing-xl bg-brand-50 dark:bg-brand-900/20 relative z-10">
        <div className="container mx-auto px-spacing-md text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
            <p className="text-xl text-grey-700 dark:text-grey-300 max-w-3xl mx-auto">
              We take pride in transforming spaces and exceeding expectations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white dark:bg-grey-800 p-10 rounded-2xl shadow-lg relative"
            style={{ borderRadius: "var(--border-radius-2xl)" }}
          >
            <div className="absolute top-8 left-8 text-8xl text-brand-200 dark:text-brand-800 opacity-50">
              "
            </div>
            <div className="relative z-10">
              <p className="text-2xl font-medium text-grey-700 dark:text-grey-300 italic mb-8">
                Home Alive transformed our house into a true reflection of who
                we are. Their ability to listen and translate our vague ideas
                into a cohesive, beautiful design was nothing short of magical.
                Every day, we're reminded of how lucky we were to work with such
                talented designers.
              </p>
              <div>
                <h4 className="text-xl font-bold">Sarah & James Thompson</h4>
                <p className="text-grey-600 dark:text-grey-400">
                  Residential Project, 2024
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Call to action */}
      <div className="py-spacing-xl relative z-10">
        <div className="container mx-auto px-spacing-md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-brand-600 text-white rounded-2xl p-12 text-center relative overflow-hidden"
            style={{ borderRadius: "var(--border-radius-2xl)" }}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/3" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <FaHome className="text-5xl mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-6">
                Ready to Bring Your Space to Life?
              </h2>
              <p className="text-xl mb-10 text-white/90">
                Let's collaborate to create spaces that resonate with your
                unique vision and lifestyle
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/booking")}
                className="bg-white text-brand-600 px-10 py-4 rounded-md font-bold text-lg inline-flex items-center gap-2 hover:shadow-lg transition-all"
                style={{ borderRadius: "var(--border-radius-md)" }}
              >
                <span>Start Your Project</span>
                <BsArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutPage;
