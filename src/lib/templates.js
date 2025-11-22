import { supabase } from "./supabase";

export async function getAllTemplates() {
  try {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
  }
}

export async function getTemplateById(id) {
  try {
    const { data, error } = await supabase.from("templates").select("*").eq("id", id).single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching template:", error);
    throw error;
  }
}

export async function getTemplatesByCategory(category) {
  try {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("category", category)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching templates by category:", error);
    throw error;
  }
}

export async function searchTemplates(query) {
  try {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error searching templates:", error);
    throw error;
  }
}

export async function createTemplate(template) {
  try {
    const { data, error } = await supabase
      .from("templates")
      .insert({
        title: template.title,
        description: template.description,
        category: template.category,
        content: template.content,
        thumbnail: template.thumbnail,
        images: template.images || [],
        tags: template.tags || [],
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error creating template:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTemplate(id, updates) {
  try {
    const { data, error } = await supabase
      .from("templates")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error updating template:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTemplate(id) {
  try {
    const { error } = await supabase.from("templates").delete().eq("id", id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting template:", error);
    return { success: false, error: error.message };
  }
}
