// src\services\designsApi.js
import { supabase } from "./supabaseClient";

// Get all designs with pagination
export async function getDesigns(page = 1, limit = 12) {
  // Calculate start and end for pagination
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // Get total count first
  const { count, error: countError } = await supabase
    .from("interior_designs")
    .select("*", { count: "exact", head: true });

  if (countError) throw countError;

  // Join with designs_categories to get category information
  const { data, error } = await supabase
    .from("interior_designs")
    .select(
      `
      *,
      designs_categories:category_id (
        id,
        name,
        category_path
      )
    `
    )
    .range(start, end);

  if (error) throw error;

  // Process the data to format it properly
  const formattedData = data.map((design) => ({
    ...design,
    category: design.designs_categories?.name || null,
    categoryPath: design.designs_categories?.category_path || null,
    // Remove the joined data to keep the structure clean
    designs_categories: undefined,
  }));

  console.log("getDesigns returning:", {
    designs: formattedData,
    page,
    totalCount: count,
    totalPages: Math.ceil(count / limit),
  });

  // Return with pagination metadata
  return {
    designs: formattedData,
    page,
    totalCount: count,
    totalPages: Math.ceil(count / limit),
  };
}

// Get designs by category with pagination
export async function getDesignsByCategory(category, page = 1, limit = 12) {
  console.log(
    `getDesignsByCategory called with category: ${category}, page: ${page}, limit: ${limit}`
  );

  // Convert kebab-case to underscore format
  const searchCategory = category.replace(/-/g, "_").toLowerCase();
  console.log("searchCategory:", searchCategory);

  // First, get the category to ensure it exists and is active
  const { data: categoryData, error: categoryError } = await supabase
    .from("designs_categories")
    .select("id, name, category_path")
    .ilike("name", searchCategory)
    .eq("isActive", true);

  if (categoryError) {
    console.error("Category error:", categoryError);
    throw categoryError;
  }

  console.log("categoryData:", categoryData);

  let matchedCategories = categoryData || [];

  if (matchedCategories.length === 0) {
    // Try a more flexible search by tokenizing the category
    const parts = searchCategory.split("_");
    console.log("Trying fallback search with parts:", parts);

    // Try to find a partial match
    const { data: fallbackData, error: fallbackError } = await supabase
      .from("designs_categories")
      .select("id, name, category_path")
      .like("name", `%${parts.join("%")}%`)
      .eq("isActive", true);

    if (fallbackError) {
      console.error("Fallback error:", fallbackError);
      throw fallbackError;
    }

    console.log("fallbackData:", fallbackData);

    if (!fallbackData || fallbackData.length === 0) {
      console.log("No categories found, returning empty result");
      // Return empty result with pagination structure
      return {
        designs: [],
        page,
        totalCount: 0,
        totalPages: 0,
      };
    }

    matchedCategories = fallbackData;
  }

  // Collect all category IDs that match
  const categoryIds = matchedCategories.map((cat) => cat.id);
  console.log("categoryIds:", categoryIds);

  // Calculate start and end for pagination
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  // Get total count first
  const { count, error: countError } = await supabase
    .from("interior_designs")
    .select("*", { count: "exact", head: true })
    .in("category_id", categoryIds);

  if (countError) {
    console.error("Count error:", countError);
    throw countError;
  }

  console.log("Total count:", count);

  // If no designs found, return empty result
  if (count === 0) {
    console.log("No designs found for these categories");
    return {
      designs: [],
      page,
      totalCount: 0,
      totalPages: 0,
    };
  }

  // Get all designs with any of the matching category IDs, with pagination
  const { data, error } = await supabase
    .from("interior_designs")
    .select(
      `
      *,
      designs_categories:category_id (
        id,
        name,
        category_path
      )
    `
    )
    .in("category_id", categoryIds)
    .range(start, end);

  if (error) {
    console.error("Designs fetch error:", error);
    throw error;
  }

  console.log("Designs data:", data);

  // Process the data to format it properly
  const formattedData = data.map((design) => ({
    ...design,
    category: design.designs_categories?.name || null,
    categoryPath: design.designs_categories?.category_path || null,
    // Remove the joined data to keep the structure clean
    designs_categories: undefined,
  }));

  console.log("Formatted data:", formattedData);

  const result = {
    designs: formattedData,
    page,
    totalCount: count,
    totalPages: Math.ceil(count / limit),
  };

  console.log("getDesignsByCategory returning:", result);

  // Return with pagination metadata
  return result;
}

// Get a single design with its details
export async function getDesignWithDetails(id) {
  // Get the design with category information
  const { data, error } = await supabase
    .from("interior_designs")
    .select(
      `
      *,
      designs_categories:category_id (
        id,
        name,
        category_path
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) throw error;

  // The details are now stored in the design record itself
  // Format the data for consistent API structure
  const formattedData = {
    main: {
      id: data.id,
      created_at: data.created_at,
      description: data.description,
      dimension: data.dimension,
      image_url: data.image_url,
      category: data.designs_categories?.name || null,
      categoryPath: data.designs_categories?.category_path || null,
    },
    details: data.details || {},
  };
  console.log(formattedData);
  return formattedData;
}

// src\services\designsApi.js - getDesignCategories function
export async function getDesignCategories() {
  try {
    // Get all categories
    const { data, error } = await supabase
      .from("designs_categories")
      .select("id, name, category_path")
      .eq("isActive", true)
      .order("name");

    if (error) throw error;

    // Create a Map to ensure categories are unique by name
    const uniqueMap = new Map();

    data.forEach((category) => {
      // Get original name for path construction
      const originalName = category.name;

      // Only add if this category name isn't already in the map
      if (!uniqueMap.has(originalName)) {
        // Format the name for display: replace underscores with spaces and capitalize each word
        const displayName = originalName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());

        // Create routing path: convert to lowercase and replace underscores with hyphens
        const routePath = originalName.toLowerCase().replace(/_/g, "-");

        // Create a new category object with both formatted name and route path
        uniqueMap.set(originalName, {
          ...category,
          name: displayName,
          originalName,
          routePath,
        });
      }
    });

    // Convert the Map values back to an array
    const uniqueCategories = Array.from(uniqueMap.values());

    // Get unique category IDs
    const uniqueCategoryIds = uniqueCategories.map((category) => category.id);

    // Now fetch one image per unique category
    const { data: designsWithImages, error: imagesError } = await supabase
      .from("interior_designs")
      .select("category_id, image_url")
      .in("category_id", uniqueCategoryIds)
      .not("image_url", "is", null); // Ensure we get designs with images

    if (imagesError) throw imagesError;

    // Create a map of category_id to image_url
    const imageMap = new Map();

    if (designsWithImages && designsWithImages.length > 0) {
      // For each unique category ID, find a design with an image
      uniqueCategoryIds.forEach((categoryId) => {
        const designWithImage = designsWithImages.find(
          (design) => design.category_id === categoryId
        );

        if (designWithImage) {
          imageMap.set(categoryId, designWithImage.image_url);
        }
      });
    }

    // Add image URLs to the unique categories
    const categoriesWithImages = uniqueCategories.map((category) => ({
      ...category,
      image_url: imageMap.get(category.id) || null,
    }));

    return categoriesWithImages;
  } catch (error) {
    console.error("Error in getDesignCategories:", error);
    throw error;
  }
}
