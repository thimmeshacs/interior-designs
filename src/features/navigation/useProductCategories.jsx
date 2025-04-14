import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../../services/productsApi";

export function useProductCategories() {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productCategories"],
    queryFn: async () => {
      const data = await getProductCategories();
      return data.map((category) => ({
        path: category.routePath, // Use the hyphenated path for routing
        display: category.name, // Use the formatted name for display
        originalPath: category.category_path[0], // Keep original path for database queries
      }));
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  return { categories, isLoading, error };
}
