import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  createFolder,
  createMarkdown,
  deleteFolder,
  deleteMarkdown,
  getUserFolders,
  getUserMarkdowns,
  updateMarkdown,
} from "@/lib/storage";

export const useMarkdownStorage = () => {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [markdowns, setMarkdowns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load user's folders and markdowns
  const loadUserData = useCallback(
    async (folderId = null) => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const [foldersData, markdownsData] = await Promise.all([
          getUserFolders(user.id, folderId),
          getUserMarkdowns(user.id, folderId),
        ]);

        setFolders(foldersData);
        setMarkdowns(markdownsData);
      } catch (err) {
        setError(err.message);
        console.error("Error loading user data:", err);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // Create a new folder
  const addFolder = async (folderName, parentFolderId = null) => {
    if (!user) return;

    try {
      const newFolder = await createFolder(user.id, folderName, parentFolderId);
      setFolders((prev) => [...prev, newFolder]);
      return newFolder;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Create a new markdown
  const addMarkdown = async (title, content = "", folderId = null) => {
    if (!user) return;

    try {
      const newMarkdown = await createMarkdown(user.id, title, content, folderId);
      setMarkdowns((prev) => [...prev, newMarkdown]);
      return newMarkdown;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update a markdown
  const editMarkdown = async (markdownId, updates) => {
    try {
      const updatedMarkdown = await updateMarkdown(markdownId, updates);
      setMarkdowns((prev) => prev.map((md) => (md.id === markdownId ? updatedMarkdown : md)));
      return updatedMarkdown;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete a markdown
  const removeMarkdown = async (markdownId) => {
    try {
      await deleteMarkdown(markdownId);
      setMarkdowns((prev) => prev.filter((md) => md.id !== markdownId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete a folder
  const removeFolder = async (folderId) => {
    try {
      await deleteFolder(folderId);
      setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Load data when user changes
  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setFolders([]);
      setMarkdowns([]);
    }
  }, [user, loadUserData]);

  return {
    folders,
    markdowns,
    loading,
    error,
    loadUserData,
    addFolder,
    addMarkdown,
    editMarkdown,
    removeMarkdown,
    removeFolder,
  };
};
