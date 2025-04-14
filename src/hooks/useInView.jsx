// src\hooks\useInView.jsx
import { useState, useEffect, useRef } from "react";

function useInView(options = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);

        // If triggerOnce is true, unobserve after it enters view
        if (options.triggerOnce && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      {
        root: options.root || null,
        rootMargin: options.rootMargin || "0px",
        threshold: options.threshold || 0,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [
    options.root,
    options.rootMargin,
    options.threshold,
    options.triggerOnce,
  ]);

  return { ref, inView };
}

export default useInView;
