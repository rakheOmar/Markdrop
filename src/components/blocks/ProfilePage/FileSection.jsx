import { Calendar, FileText, Folder, FolderOpen, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FileSection({ folders, markdowns, loading, error, onRefresh }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getFolderMarkdowns = (folderId) => {
    return markdowns.filter((md) => md.folder_id === folderId);
  };

  if (loading) {
    return (
      <>
        <div className="border-r border-[#cecece] dark:border-[#16181d] relative overflow-hidden" />
        <div className="border-[#cecece] dark:border-[#16181d] flex items-center justify-center px-4 md:px-8">
          <div className="animate-pulse text-center">
            <div className="w-8 h-8 bg-gray-300 rounded mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-32 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-24 mx-auto"></div>
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
        <div className="border-r border-[#cecece] dark:border-[#16181d] relative overflow-hidden" />
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
      <div className="border-r border-[#cecece] dark:border-[#16181d] relative overflow-hidden" />
      <div className="border-[#cecece] dark:border-[#16181d] p-4 md:p-6">
        <div className="h-full flex flex-col">
          <Tabs defaultValue="files" className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">My Files</h2>
              <TabsList className="h-auto p-1">
                <TabsTrigger value="files" className="p-2">
                  <FileText className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger value="folders" className="p-2">
                  <Folder className="w-5 h-5" />
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="files" className="flex-1">
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {markdowns.map((doc) => (
                    <Card key={doc.id} className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <div className="flex-1">
                            <h3 className="font-medium">{doc.title}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              {doc.folder_id && (
                                <Badge variant="secondary" className="text-xs">
                                  {folders.find((f) => f.id === doc.folder_id)?.name ||
                                    "Unknown Folder"}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {formatDate(doc.updated_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {markdowns.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No files yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="folders" className="flex-1">
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {folders.map((folder) => (
                    <Card key={folder.id} className="cursor-pointer hover:bg-muted/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <div className="flex-1">
                            <h3 className="font-medium">{folder.name}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {getFolderMarkdowns(folder.id).length} files
                              </span>
                              <span className="text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                {formatDate(folder.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {folders.length === 0 && (
                    <div className="text-center py-8">
                      <Folder className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No folders yet</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="border-l border-[#cecece] dark:border-[#16181d]" />
    </>
  );
}
