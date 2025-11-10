import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import BlankSection from "@/components/blocks/Home/BlankSection";
import Navbar from "@/components/blocks/Navbar/Navbar";
import DetailsSection from "@/components/blocks/ProfilePage/DetailsSection";
import FileSection from "@/components/blocks/ProfilePage/FileSection";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  deleteFile,
  deleteFolder,
  moveFileToFolder,
  updateFileTitle,
  updateFolderName,
} from "@/lib/fileManager";
import { getAllUserFolders, getAllUserMarkdowns } from "@/lib/storage";

export default function UserProfile() {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [markdowns, setMarkdowns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchUserData = useCallback(
    async (force = false) => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      // Don't fetch again if we already have data, unless forced
      if (hasFetched && !force) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try to fetch data, but handle gracefully if tables don't exist
        try {
          const [foldersData, markdownsData] = await Promise.all([
            getAllUserFolders(user.id), // Get all folders for user
            getAllUserMarkdowns(user.id), // Get all markdowns for user
          ]);

          setFolders(foldersData || []);
          setMarkdowns(markdownsData || []);
          setHasFetched(true);
        } catch (dbError) {
          // If tables don't exist, use empty arrays and show a setup message
          console.warn("Database tables not found:", dbError.message);
          setFolders([]);
          setMarkdowns([]);
          setHasFetched(true);
          if (dbError.message.includes("Could not find the table")) {
            setError("Database tables not set up yet. Please run the database migration.");
          } else {
            setError(dbError.message);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [user?.id, hasFetched]
  );

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdateTitle = async (id, currentTitle, type = "file") => {
    const newTitle = prompt(
      `Enter new ${type === "folder" ? "folder name" : "title"}:`,
      currentTitle
    );
    if (!newTitle || newTitle === currentTitle) return;

    const result =
      type === "folder"
        ? await updateFolderName(id, newTitle)
        : await updateFileTitle(id, newTitle);

    if (result.success) {
      toast.success(`${type === "folder" ? "Folder" : "File"} updated successfully`);
      fetchUserData(true);
    } else {
      toast.error(`Failed to update ${type}: ${result.error}`);
    }
  };

  const handleDeleteFile = async (id, type = "file") => {
    const confirmMessage = `Are you sure you want to delete this ${type}?${
      type === "folder" ? " Files in this folder will be moved to root." : ""
    }`;

    if (!confirm(confirmMessage)) return;

    const result = type === "folder" ? await deleteFolder(id) : await deleteFile(id);

    if (result.success) {
      toast.success(`${type === "folder" ? "Folder" : "File"} deleted successfully`);
      fetchUserData(true);
    } else {
      toast.error(`Failed to delete ${type}: ${result.error}`);
    }
  };

  const handleMoveToFolder = async (fileId) => {
    if (folders.length === 0) {
      toast.error("No folders available. Create a folder first.");
      return;
    }

    const folderOptions = folders.map((f, i) => `${i + 1}. ${f.name}`).join("\n");
    const selection = prompt(
      `Select a folder:\n${folderOptions}\n\nEnter the number (or 0 for root):`
    );

    if (selection === null) return;

    const folderIndex = parseInt(selection) - 1;
    const targetFolderId = folderIndex === -1 ? null : folders[folderIndex]?.id;

    if (folderIndex >= 0 && !targetFolderId) {
      toast.error("Invalid folder selection");
      return;
    }

    const result = await moveFileToFolder(fileId, targetFolderId);

    if (result.success) {
      toast.success("File moved successfully");
      fetchUserData(true);
    } else {
      toast.error(`Failed to move file: ${result.error}`);
    }
  };

  return (
    <div className="w-full h-screen grid grid-rows-[7vh_25vh_1vh_67vh_5vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden">
      <Navbar />
      <DetailsSection user={user} loading={loading} error={error} />
      <BlankSection />
      <FileSection
        folders={folders}
        markdowns={markdowns}
        loading={loading}
        error={error}
        onRefresh={() => fetchUserData(true)}
        onUpdateTitle={handleUpdateTitle}
        onDeleteFile={handleDeleteFile}
        onMoveToFolder={handleMoveToFolder}
      />
      <Footer />
    </div>
  );
}
