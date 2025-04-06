import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabaseClient";

export function useIllustrations() {
  return useQuery({
    queryKey: ["illustrations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("illustrations").select("*");
      if (error) throw error;
      return data;
    },
  });
}
