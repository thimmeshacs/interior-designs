import { useQuery } from "@tanstack/react-query";
import { getDesignsByCategory } from "../../services/designsApi";

export function useDesigns(category) {
  // Convert hyphens to underscores for database query
  const formattedCategory = category?.replace(/-/g, "_");

  const {
    data: designs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["designs", formattedCategory],
    queryFn: () => getDesignsByCategory(formattedCategory),
    enabled: !!formattedCategory,
  });

  return { designs, isLoading, error };
}
