// src\features\navigation\useDesignCategories.jsx
import { useQuery } from "@tanstack/react-query";
import { getDesignCategories } from "../../services/designsApi";

export function useDesignCategories() {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["designCategoriesNav"],
    queryFn: async () => {
      const data = await getDesignCategories();
      return data.map((category) => ({
        path: category.routePath, // Use the hyphenated path for routing
        display: category.name, // Use the formatted name for display
        originalPath: category.originalName, // Keep original name for database queries
      }));
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  return { categories, isLoading, error };
}
