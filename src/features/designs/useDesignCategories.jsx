// src\features\designs\useDesignCategories.js
import { useQuery } from "@tanstack/react-query";
import { getDesignCategories } from "../../services/designsApi";

export function useDesignCategories() {
  const {
    data: categories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["designCategoriesWithImages"],
    queryFn: getDesignCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  return { categories, isLoading, error };
}
