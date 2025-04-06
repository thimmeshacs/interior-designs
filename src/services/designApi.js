import { supabase } from "./supabaseClient";

export async function getDesigns() {
  const { data, error } = await supabase.from("interior_designs").select("*");
  if (error) throw error;
  return data;
}

export async function getDesignById(id) {
  const { data, error } = await supabase
    .from("interior_designs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}
