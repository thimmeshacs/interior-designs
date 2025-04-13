import { supabase } from "./supabaseClient";

export async function getProductsByCategory(category) {
  const formattedCategory = category.replace(/-/g, "_");

  console.log("Querying category:", formattedCategory);

  // Query for active products in the specified category
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .filter("category_path", "cs", `[${JSON.stringify(formattedCategory)}]`)
    .eq("isActive", true); // Only get products where isActive is true

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return data || [];
}
