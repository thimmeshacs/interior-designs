import { useEffect } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";

function ScrollToTop() {
  const scrollPosition = useScrollPosition();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    scrollPosition > 300 && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-accent-teal text-white p-3 rounded-full shadow-md hover:bg-teal-600"
      >
        ↑
      </button>
    )
  );
}

export default ScrollToTop;
