import { supabase } from "./supabaseClient";

export async function getProductsByCategory(category) {
  const formattedCategory = category.replace(/-/g, "_");

  console.log("Querying category:", formattedCategory);

  const { data, error } = await supabase
    .from("products")
    .select("id, image_url, description")
    .filter("category_path", "cs", `[${JSON.stringify(formattedCategory)}]`)
    .eq("isActive", true);

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  return data || [];
}

// New function to get a single product's complete details by ID
export async function getProductById(id) {
  console.log("Fetching product with ID:", id);

  const { data, error } = await supabase
    .from("products")
    .select("*") // Select all fields for the product details
    .eq("id", id)
    .single(); // We expect only one result
  console.log(data);
  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Product with ID ${id} not found`);
  }
  console.log(data);
  return data;
}
