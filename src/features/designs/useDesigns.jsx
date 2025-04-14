// src\features\designs\useDesigns.jsx
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getDesigns, getDesignsByCategory } from "../../services/designsApi";
import { useCallback, useMemo } from "react";
// Optimize the useDesigns hook to reduce unnecessary operations

export function useDesigns(categoryName, page = 1, limit = 12) {
  // Query function defined once and reused
  const fetchDesigns = useCallback(
    async (page = 1) => {
      return categoryName
        ? await getDesignsByCategory(categoryName, page, limit)
        : await getDesigns(page, limit);
    },
    [categoryName, limit]
  );

  // Standard pagination query
  const paginationQuery = useQuery({
    queryKey: ["designs", categoryName, page, limit],
    queryFn: () => fetchDesigns(page),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  // Infinite query for "load more" functionality
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["designsInfinite", categoryName, limit],
    queryFn: ({ pageParam = 1 }) => fetchDesigns(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: false,
  });

  // Use memoization to prevent unnecessary recalculations
  const designs = useMemo(
    () => paginationQuery.data?.designs || [],
    [paginationQuery.data]
  );

  const infiniteDesigns = useMemo(
    () => infiniteQuery.data?.pages?.flatMap((page) => page.designs) || [],
    [infiniteQuery.data]
  );

  const allDesigns = useMemo(
    () => [
      ...designs,
      ...infiniteDesigns.filter(
        (d) => !designs.some((design) => design.id === d.id)
      ),
    ],
    [designs, infiniteDesigns]
  );

  return {
    designs: allDesigns,
    isLoading: paginationQuery.isLoading,
    error: paginationQuery.error,
    totalPages: paginationQuery.data?.totalPages || 0,
    totalItems: paginationQuery.data?.totalCount || 0,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage,
  };
}
