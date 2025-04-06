import { useInView } from "react-intersection-observer";

export function useScrollReveal(options = { triggerOnce: true }) {
  const [ref, inView] = useInView(options);
  return { ref, inView };
}
