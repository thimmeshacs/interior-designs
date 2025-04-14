import { supabase } from "./supabaseClient";

// Get products by category
export async function getProductsByCategory(category) {
  // Convert kebab-case to underscore format
  const searchCategory = category.replace(/-/g, "_").toLowerCase();

  // First, get the category to ensure it exists and is active
  const { data: categoryData, error: categoryError } = await supabase
    .from("product_categories")
    .select("id, name, category_path")
    .filter("name", "ilike", searchCategory)
    .eq("isActive", true);

  if (categoryError)
    throw new Error(`Category search error: ${categoryError.message}`);

  if (!categoryData || categoryData.length === 0) {
    // Try a more flexible search by tokenizing the category
    const parts = searchCategory.split("_");

    // Try to find a partial match
    const { data: fallbackData, error: fallbackError } = await supabase
      .from("product_categories")
      .select("id, name, category_path")
      .like("name", `%${parts.join("%")}%`)
      .eq("isActive", true);

    if (fallbackError)
      throw new Error(
        `Category fallback search error: ${fallbackError.message}`
      );

    if (!fallbackData || fallbackData.length === 0) {
      return []; // No matching category found
    }

    categoryData = fallbackData;
  }

  // Collect all category IDs that match
  const categoryIds = categoryData.map((cat) => cat.id);

  console.log("Matching category IDs:", categoryIds);

  // Get all products with any of the matching category IDs
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_categories:category_id (
        id,
        name,
        category_path
      )
    `
    )
    .in("category_id", categoryIds)
    .eq("isActive", true);

  if (error) throw new Error(`Product fetch error: ${error.message}`);

  // Process the data to format it properly
  const formattedData = data.map((product) => ({
    ...product,
    category: product.product_categories?.name || null,
    categoryPath: product.product_categories?.category_path || null,
    // Remove the joined data to keep the structure clean
    product_categories: undefined,
  }));

  console.log(
    `Found ${formattedData.length} products for category: ${category}`
  );

  return formattedData || [];
}

// Get a single product by ID
export async function getProductById(id) {
  console.log("Fetching product with ID:", id);

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_categories:category_id (
        id,
        name,
        category_path
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  if (!data) {
    throw new Error(`Product with ID ${id} not found`);
  }

  // Format the data
  const formattedData = {
    ...data,
    category: data.product_categories?.name || null,
    categoryPath: data.product_categories?.category_path || null,
    // Remove the joined data to keep the structure clean
    product_categories: undefined,
  };

  console.log(formattedData);
  return formattedData;
}

// Get unique product categories
export async function getProductCategories() {
  const { data, error } = await supabase
    .from("product_categories")
    .select("id, name, category_path")
    .eq("isActive", true)
    .order("name");

  if (error) {
    throw new Error(`Database error: ${error.message}`);
  }

  // Create a Map to track unique categories by name
  const uniqueMap = new Map();

  data.forEach((category) => {
    // Get original name for path construction
    const originalName = category.name;

    // Format the name for display: replace underscores with spaces and capitalize each word
    const displayName = originalName
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    // Create routing path: convert to lowercase and replace underscores with hyphens
    const routePath = originalName.toLowerCase().replace(/_/g, "-");

    // Create a new category object with both formatted name and route path
    const formattedCategory = {
      ...category,
      name: displayName,
      routePath: routePath,
    };

    uniqueMap.set(originalName, formattedCategory);
  });

  // Convert the Map values back to an array
  const uniqueCategories = Array.from(uniqueMap.values());

  return uniqueCategories;
}

// Get all products (new function)
export async function getAllProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_categories:category_id (
        id,
        name,
        category_path
      )
    `
    )
    .eq("isActive", true);

  if (error) throw new Error(`Database error: ${error.message}`);

  // Process the data to format it properly
  const formattedData = data.map((product) => ({
    ...product,
    category: product.product_categories?.name || null,
    categoryPath: product.product_categories?.category_path || null,
    // Remove the joined data to keep the structure clean
    product_categories: undefined,
  }));

  return formattedData || [];
}
