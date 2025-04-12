import { supabase } from "./supabaseClient";

export async function getDesigns() {
  const { data, error } = await supabase.from("interior_designsV2").select("*");
  if (error) throw error;
  return data;
}

export async function getDesignsByCategory(category) {
  const { data, error } = await supabase
    .from("interior_designsV2")
    .select("*")
    .eq("category", category);
  if (error) throw error;
  return data;
}

export async function getDesignWithDetails(id) {
  // Get the main design data
  const { data: mainData, error: mainError } = await supabase
    .from("interior_designsV2")
    .select("*")
    .eq("id", id)
    .single();

  if (mainError) throw mainError;

  // Get the design details
  const { data: detailsData, error: detailsError } = await supabase
    .from("design_details")
    .select("*")
    .eq("id", id)
    .single();

  if (detailsError) throw detailsError;

  return {
    main: mainData,
    details: detailsData,
  };
}
