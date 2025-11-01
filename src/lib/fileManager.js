import { supabase } from "./supabase";

export async function updateFileTitle(fileId, newTitle) {
  try {
    const { data, error } = await supabase
      .from("markdowns")
      .update({ title: newTitle })
      .eq("id", fileId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error updating file title:", error);
    return { success: false, error: error.message };
  }
}

export async function updateFolderName(folderId, newName) {
  try {
    const { data, error } = await supabase
      .from("folders")
      .update({ name: newName })
      .eq("id", folderId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error updating folder name:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteFile(fileId) {
  try {
    const { error } = await supabase.from("markdowns").delete().eq("id", fileId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting file:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteFolder(folderId) {
  try {
    const { error: filesError } = await supabase
      .from("markdowns")
      .update({ folder_id: null })
      .eq("folder_id", folderId);

    if (filesError) throw filesError;

    const { error } = await supabase.from("folders").delete().eq("id", folderId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting folder:", error);
    return { success: false, error: error.message };
  }
}

export async function moveFileToFolder(fileId, folderId) {
  try {
    const { data, error } = await supabase
      .from("markdowns")
      .update({ folder_id: folderId })
      .eq("id", fileId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error moving file to folder:", error);
    return { success: false, error: error.message };
  }
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
