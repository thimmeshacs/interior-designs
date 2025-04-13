import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productsApi";

export function useProductDetails(id) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // Only run the query if an ID is provided
  });

  return { product, isLoading, error };
}
