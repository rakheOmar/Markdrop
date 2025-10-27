import { FileText, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DocumentationBadgesBlock({ block, onUpdate }) {
  const badges = block.badges || [
    { type: "stars", username: "", repo: "", label: "Stars" },
  ];
  const align = block.align || "left";

  const handleBadgeChange = (index, field, value) => {
    const newBadges = [...badges];
    newBadges[index] = { ...newBadges[index], [field]: value };
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const handleAlignChange = (value) => {
    onUpdate(block.id, { ...block, align: value });
  };

  const addBadge = () => {
    const newBadges = [
      ...badges,
      { type: "stars", username: "", repo: "", label: "Stars" },
    ];
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const removeBadge = (index) => {
    if (badges.length === 1) return;
    const newBadges = badges.filter((_, i) => i !== index);
    onUpdate(block.id, { ...block, badges: newBadges });
  };

  const generateBadgeUrl = (badge) => {
    const { type, username, repo, label, docsPath } = badge;

    const baseUrl = "https://img.shields.io";

    switch (type) {
      case "stars":
        if (!username || !repo) return "";
        return `${baseUrl}/github/stars/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "forks":
        if (!username || !repo) return "";
        return `${baseUrl}/github/forks/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "issues":
        if (!username || !repo) return "";
        return `${baseUrl}/github/issues/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "license":
        if (!username || !repo) return "";
        return `${baseUrl}/github/license/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "last-commit":
        if (!username || !repo) return "";
        return `${baseUrl}/github/last-commit/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "repo-size":
        if (!username || !repo) return "";
        return `${baseUrl}/github/repo-size/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "languages":
        if (!username || !repo) return "";
        return `${baseUrl}/github/languages/top/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "contributors":
        if (!username || !repo) return "";
        return `${baseUrl}/github/contributors/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}&logo=github&logoColor=white`;
      case "gitbook":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(
          label
        )}&message=GitBook&color=3884FF&logo=gitbook&logoColor=white&style=flat-square`;
      case "notion":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(
          label
        )}&message=Notion&color=000000&logo=notion&logoColor=white&style=flat-square`;
      case "confluence":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(
          label
        )}&message=Confluence&color=172B4D&logo=confluence&logoColor=white&style=flat-square`;
      case "docusaurus":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(
          label
        )}&message=Docusaurus&color=2E8555&logo=docusaurus&logoColor=white&style=flat-square`;
      case "mkdocs":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(
          label
        )}&message=MkDocs&color=000000&logo=markdown&logoColor=white&style=flat-square`;
      case "sphinx":
        return `${baseUrl}/static/v1?label=${encodeURIComponent(
          label
        )}&message=Sphinx&color=4B8B3B&logo=sphinx&logoColor=white&style=flat-square`;
      default:
        return "";
    }
  };

  const badgeTypes = [
    { value: "stars", label: "Stars", needsRepo: true },
    { value: "forks", label: "Forks", needsRepo: true },
    { value: "issues", label: "Issues", needsRepo: true },
    { value: "license", label: "License", needsRepo: true },
    { value: "last-commit", label: "Last Commit", needsRepo: true },
    { value: "repo-size", label: "Repository Size", needsRepo: true },
    { value: "languages", label: "Languages", needsRepo: true },
    { value: "contributors", label: "Contributors", needsRepo: true },
    { value: "gitbook", label: "GitBook", needsRepo: false },
    { value: "notion", label: "Notion", needsRepo: false },
    { value: "confluence", label: "Confluence", needsRepo: false },
    { value: "docusaurus", label: "Docusaurus", needsRepo: false },
    { value: "mkdocs", label: "MkDocs", needsRepo: false },
    { value: "sphinx", label: "Sphinx", needsRepo: false },
  ];

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            Documentation Badges
          </span>
        </div>
        <Button
          onClick={addBadge}
          size="sm"
          variant="outline"
          className="h-7 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Badge
        </Button>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Alignment
        </label>
        <Select value={align} onValueChange={handleAlignChange}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {badges.map((badge, index) => {
        const badgeType = badgeTypes.find((t) => t.value === badge.type);
        const needsRepo = badgeType?.needsRepo;

        return (
          <div
            key={index}
            className="space-y-2 p-3 bg-background rounded border"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Badge {index + 1}
              </span>
              {badges.length > 1 && (
                <Button
                  onClick={() => removeBadge(index)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs">Platform</Label>
                <Select
                  value={badge.type}
                  onValueChange={(value) =>
                    handleBadgeChange(index, "type", value)
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {badgeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Label</Label>
                <Input
                  value={badge.label}
                  onChange={(e) =>
                    handleBadgeChange(index, "label", e.target.value)
                  }
                  placeholder="Custom label"
                  className="bg-background"
                />
              </div>
            </div>

            {needsRepo && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Username</Label>
                  <Input
                    value={badge.username || ""}
                    onChange={(e) =>
                      handleBadgeChange(index, "username", e.target.value)
                    }
                    placeholder="GitHub username"
                    className="bg-background"
                  />
                </div>

                <div>
                  <Label className="text-xs">Repository</Label>
                  <Input
                    value={badge.repo || ""}
                    onChange={(e) =>
                      handleBadgeChange(index, "repo", e.target.value)
                    }
                    placeholder="Repository name"
                    className="bg-background"
                  />
                </div>
              </div>
            )}

            {((needsRepo && badge.username && badge.repo) ||
              (!needsRepo && badge.label)) && (
              <div className="mt-2 p-2 bg-muted rounded">
                <img
                  src={generateBadgeUrl(badge)}
                  alt={`${badge.type} badge`}
                  className="max-w-full h-auto"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      {badges.some((badge) => {
        const badgeType = badgeTypes.find((t) => t.value === badge.type);
        const needsRepo = badgeType?.needsRepo;
        return (
          (needsRepo && badge.username && badge.repo) ||
          (!needsRepo && badge.label)
        );
      }) && (
        <div className="mt-3 p-3 bg-background rounded border">
          <div style={{ textAlign: align }}>
            {badges
              .filter((badge) => {
                const badgeType = badgeTypes.find(
                  (t) => t.value === badge.type
                );
                const needsRepo = badgeType?.needsRepo;
                return (
                  (needsRepo && badge.username && badge.repo) ||
                  (!needsRepo && badge.label)
                );
              })
              .map((badge, index) => (
                <img
                  key={index}
                  src={generateBadgeUrl(badge)}
                  alt={`${badge.type} badge`}
                  className="max-w-full h-auto inline-block mr-2 mb-2"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
