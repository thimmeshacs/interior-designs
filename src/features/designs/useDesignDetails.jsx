// src/features/designs/useDesignDetails.jsx
import { useQuery } from "@tanstack/react-query";
import { getDesignWithDetails } from "../../services/designsApi";

export function useDesignDetails(id) {
  const {
    data: design,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["design", id],
    queryFn: () => getDesignWithDetails(id),
    select: (data) => ({
      main: data.main,
      details: data.details,
    }),
  });

  return { design, isLoading, error };
}
