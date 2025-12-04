import { supabase } from "./supabase";

// Create a folder for the user
export const createFolder = async (userId, folderName, parentFolderId = null) => {
  const { data, error } = await supabase
    .from("folders")
    .insert({
      name: folderName,
      user_id: userId,
      parent_folder_id: parentFolderId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user's folders
export const getUserFolders = async (userId, parentFolderId = null) => {
  let query = supabase.from("folders").select("*").eq("user_id", userId);

  // If parentFolderId is specified, filter by it
  if (parentFolderId !== undefined) {
    if (parentFolderId === null) {
      query = query.is("parent_folder_id", null);
    } else {
      query = query.eq("parent_folder_id", parentFolderId);
    }
  }
  // If parentFolderId is undefined, get all folders for the user

  const { data, error } = await query.order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

// Create a markdown document
export const createMarkdown = async (userId, title, content, folderId = null) => {
  const { data, error } = await supabase
    .from("markdowns")
    .insert({
      title,
      content,
      user_id: userId,
      folder_id: folderId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user's markdown documents
export const getUserMarkdowns = async (userId, folderId = null) => {
  let query = supabase.from("markdowns").select("*").eq("user_id", userId);

  // If folderId is specified, filter by it
  if (folderId !== undefined) {
    if (folderId === null) {
      query = query.is("folder_id", null);
    } else {
      query = query.eq("folder_id", folderId);
    }
  }
  // If folderId is undefined, get all markdowns for the user

  const { data, error } = await query.order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
};

// Update markdown document
export const updateMarkdown = async (markdownId, updates) => {
  const { data, error } = await supabase
    .from("markdowns")
    .update(updates)
    .eq("id", markdownId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete markdown document
export const deleteMarkdown = async (markdownId) => {
  const { error } = await supabase.from("markdowns").delete().eq("id", markdownId);

  if (error) throw error;
};

// Delete folder (and all its contents)
export const deleteFolder = async (folderId) => {
  const { error } = await supabase.from("folders").delete().eq("id", folderId);

  if (error) throw error;
};

// Get a single markdown by ID
export const getMarkdownById = async (markdownId) => {
  const { data, error } = await supabase
    .from("markdowns")
    .select("*")
    .eq("id", markdownId)
    .single();

  if (error) throw error;
  return data;
};

// Get all folders for a user (helper function for UserProfile)
export const getAllUserFolders = async (userId) => {
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

// Get all markdowns for a user (helper function for UserProfile)
export const getAllUserMarkdowns = async (userId) => {
  const { data, error } = await supabase
    .from("markdowns")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data;
};
