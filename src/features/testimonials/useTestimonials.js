import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabaseClient";

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*");
      if (error) throw error;
      return data;
    },
  });
}
