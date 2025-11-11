import {
  Calendar,
  Edit,
  FileText,
  Folder,
  FolderInput,
  FolderOpen,
  MoreVertical,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/fileManager";

const FileCard = ({ doc, onUpdateTitle, onMoveToFolder, onDeleteFile, onDoubleClick }) => {
  return (
    <Card
      className="cursor-pointer hover:bg-muted/50 relative group overflow-hidden p-0"
      onDoubleClick={() => onDoubleClick(doc.id)}
    >
      <div className="aspect-video bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
        <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>
      <CardContent className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-sm truncate flex-1">{doc.title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 shrink-0">
                <MoreVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onUpdateTitle(doc.id, doc.title)}>
                <Edit className="w-4 h-4 mr-2" />
                Update Title
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onMoveToFolder(doc.id)}>
                <FolderInput className="w-4 h-4 mr-2" />
                Move to Folder
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteFile(doc.id)}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {doc.description || "No description"}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(doc.updated_at)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FileSection({
  folders,
  markdowns,
  loading,
  error,
  onRefresh,
  onUpdateTitle,
  onDeleteFile,
  onMoveToFolder,
}) {
  const navigate = useNavigate();

  const handleDoubleClick = (fileId) => {
    navigate(`/builder/${fileId}`);
  };

  const TopRightLabel = () => (
    <div className="absolute top-0 right-0 w-auto h-auto px-2 py-1.5 sm:px-2.5 sm:py-2 border-l border-b border-[#cecece] dark:border-[#16181d] sm:flex items-center justify-center hidden">
      <span className="font-mono text-[0.55rem] sm:text-[0.65rem] md:text-xs text-black dark:text-white whitespace-nowrap leading-tight">
        Files & Folders
      </span>
    </div>
  );

  const getFolderMarkdowns = (folderId) => {
    return markdowns.filter((md) => md.folder_id === folderId);
  };

  if (loading) {
    return (
      <>
        <div className="border-r border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
          <TopRightLabel />
        </div>
        <div className="border-[#cecece] dark:border-[#16181d] p-4 md:p-6 relative h-full overflow-hidden">
          <div className="animate-pulse h-full flex flex-col">
            {/* Header skeleton */}
            <div className="absolute top-2 left-2 z-10 h-auto p-1">
              <div className="p-2 flex items-center">
                <div className="h-6 md:h-7 bg-gray-300 dark:bg-gray-600 rounded w-48" />
              </div>
            </div>

            {/* Tab triggers skeleton */}
            <div className="absolute top-2 right-2 z-10">
              <div className="h-auto p-1 bg-transparent flex gap-1">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded" />
              </div>
            </div>

            {/* Content skeleton - Grid of cards */}
            <div className="flex-1 mt-14">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="border border-[#cecece] dark:border-[#16181d] rounded-lg overflow-hidden"
                  >
                    {/* Card image area */}
                    <div className="aspect-video bg-gray-300 dark:bg-gray-600" />
                    {/* Card content */}
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-l border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

  if (error) {
    const isDatabaseSetupError = error.includes("Database tables not set up");

    return (
      <>
        <div className="border-r border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
          <TopRightLabel />
        </div>
        <div className="border-[#cecece] dark:border-[#16181d] flex items-center justify-center px-4 md:px-8">
          <div className="text-center max-w-md">
            {isDatabaseSetupError ? (
              <>
                <Folder className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Database Setup Required</h3>
                <p className="text-muted-foreground mb-4">
                  The database tables for folders and documents haven't been created yet.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Please run the{" "}
                  <code className="bg-muted px-2 py-1 rounded">setup-database.sql</code> script in
                  your Supabase SQL editor.
                </p>
              </>
            ) : (
              <>
                <p className="text-red-500 mb-4">Error loading files: {error}</p>
              </>
            )}
            <Button onClick={onRefresh} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
        <div className="border-l border-[#cecece] dark:border-[#16181d]" />
      </>
    );
  }

  return (
    <>
      <div className="border-r border-[#cecece] dark:border-[#16181d] relative overflow-hidden">
        <TopRightLabel />
      </div>
      <div className="border-[#cecece] dark:border-[#16181d] p-4 md:p-6 relative h-full overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="absolute top-2 left-2 z-10 h-auto p-1">
            <div className="p-2 flex items-center">
              <h2 className="text-lg md:text-xl font-semibold">
                {markdowns.length} {markdowns.length === 1 ? "File" : "Files"} and {folders.length}{" "}
                {folders.length === 1 ? "Folder" : "Folders"}
              </h2>
            </div>
          </div>
          <Tabs defaultValue="files" className="flex-1 flex flex-col min-h-0">
            <div className="absolute top-2 right-2 z-10">
              <TabsList className="h-auto p-1 bg-transparent">
                <TabsTrigger value="files" className="p-2">
                  <FileText className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger value="folders" className="p-2">
                  <Folder className="w-5 h-5" />
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="files" className="flex-1 mt-14 min-h-0">
              <ScrollArea className="h-full w-full">
                {markdowns.length === 0 ? (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No files yet</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-1">
                    {markdowns.map((doc) => (
                      <FileCard
                        key={doc.id}
                        doc={doc}
                        onUpdateTitle={onUpdateTitle}
                        onMoveToFolder={onMoveToFolder}
                        onDeleteFile={onDeleteFile}
                        onDoubleClick={handleDoubleClick}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            <TabsContent value="folders" className="flex-1 mt-14 min-h-0">
              <ScrollArea className="h-full w-full">
                {folders.length === 0 ? (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Folder className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No folders yet</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-1">
                    {folders.map((folder) => (
                      <Card
                        key={folder.id}
                        className="cursor-pointer hover:bg-muted/50 relative group"
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => onUpdateTitle?.(folder.id, folder.name, "folder")}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Rename Folder
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteFile?.(folder.id, "folder")}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Folder
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <CardContent className="p-3">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 pr-6">
                              <FolderOpen className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                              <h3 className="font-medium text-sm truncate">{folder.name}</h3>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-muted-foreground">
                                {getFolderMarkdowns(folder.id).length} files
                              </span>
                              <span className="text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {formatDate(folder.created_at)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="border-l border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
