import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabaseClient";
import DesignCard from "./DesignCard";
import DesignFilters from "./DesignFilters";
import { useState } from "react";

function DesignList() {
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    bhk: "",
  });

  const {
    data: designs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["designs", filters],
    queryFn: async () => {
      let query = supabase.from("interior_designs").select("*");
      if (filters.category) query = query.eq("category", filters.category);
      if (filters.bhk) query = query.eq("bhk", filters.bhk);
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-");
        query = query.gte("price", min || 0).lte("price", max || Infinity);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleFilterChange = newFilters => setFilters(newFilters);

  if (isLoading) return <div className="text-center py-16">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-16 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <DesignFilters onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {designs.map(design => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesignList;
