import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/blocks/Navbar/Navbar";
import DetailsSection from "@/components/blocks/ProfilePage/DetailsSection";
import FileSection from "@/components/blocks/ProfilePage/FileSection";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
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

  return (
    <div className="w-full h-screen grid grid-rows-[7vh_25vh_68vh_7vh] grid-cols-[5%_90%_5%] md:grid-cols-[10%_80%_10%] lg:grid-cols-[15%_70%_15%] overflow-x-hidden">
      <Navbar />
      <DetailsSection user={user} loading={loading} error={error} />
      <FileSection
        folders={folders}
        markdowns={markdowns}
        loading={loading}
        error={error}
        onRefresh={() => fetchUserData(true)}
      />
      <Footer />
    </div>
  );
}
