import { Github, Plus, Trash2 } from "lucide-react";
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

export default function GitHubStatsBlock({ block, onUpdate }) {
  const stats = block.stats || [
    { type: "stars", username: "", repo: "", label: "Stars" },
  ];
  const align = block.align || "left";

  const handleStatChange = (index, field, value) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    onUpdate(block.id, { ...block, stats: newStats });
  };

  const handleAlignChange = (value) => {
    onUpdate(block.id, { ...block, align: value });
  };

  const addStat = () => {
    const newStats = [
      ...stats,
      { type: "stars", username: "", repo: "", label: "Stars" },
    ];
    onUpdate(block.id, { ...block, stats: newStats });
  };

  const removeStat = (index) => {
    if (stats.length === 1) return;
    const newStats = stats.filter((_, i) => i !== index);
    onUpdate(block.id, { ...block, stats: newStats });
  };

  const generateStatUrl = (stat) => {
    const { type, username, repo, label } = stat;

    if (!username || !repo) return "";

    const baseUrl = "https://img.shields.io/github";

    switch (type) {
      case "stars":
        return `${baseUrl}/stars/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}`;
      case "forks":
        return `${baseUrl}/forks/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}`;
      case "issues":
        return `${baseUrl}/issues/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}`;
      case "pull-requests":
        return `${baseUrl}/issues-pr/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}`;
      case "license":
        return `${baseUrl}/license/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}`;
      case "last-commit":
        return `${baseUrl}/last-commit/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}`;
      case "repo-size":
        return `${baseUrl}/repo-size/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}`;
      case "languages":
        return `${baseUrl}/languages/top/${username}/${repo}?style=flat-square&label=${encodeURIComponent(
          label
        )}`;
      default:
        return "";
    }
  };

  const statTypes = [
    { value: "stars", label: "Stars" },
    { value: "forks", label: "Forks" },
    { value: "issues", label: "Issues" },
    { value: "pull-requests", label: "Pull Requests" },
    { value: "license", label: "License" },
    { value: "last-commit", label: "Last Commit" },
    { value: "repo-size", label: "Repository Size" },
    { value: "languages", label: "Languages" },
  ];

  return (
    <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            GitHub Stats
          </span>
        </div>
        <Button
          onClick={addStat}
          size="sm"
          variant="outline"
          className="h-7 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Stat
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

      {stats.map((stat, index) => (
        <div key={index} className="space-y-2 p-3 bg-background rounded border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Stat {index + 1}
            </span>
            {stats.length > 1 && (
              <Button
                onClick={() => removeStat(index)}
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
              <Label className="text-xs">Type</Label>
              <Select
                value={stat.type}
                onValueChange={(value) =>
                  handleStatChange(index, "type", value)
                }
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {statTypes.map((type) => (
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
                value={stat.label}
                onChange={(e) =>
                  handleStatChange(index, "label", e.target.value)
                }
                placeholder="Custom label"
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs">Username</Label>
              <Input
                value={stat.username}
                onChange={(e) =>
                  handleStatChange(index, "username", e.target.value)
                }
                placeholder="GitHub username"
                className="bg-background"
              />
            </div>

            <div>
              <Label className="text-xs">Repository</Label>
              <Input
                value={stat.repo}
                onChange={(e) =>
                  handleStatChange(index, "repo", e.target.value)
                }
                placeholder="Repository name"
                className="bg-background"
              />
            </div>
          </div>

          {stat.username && stat.repo && (
            <div className="mt-2 p-2 bg-muted rounded">
              <img
                src={generateStatUrl(stat)}
                alt={`${stat.type} badge`}
                className="max-w-full h-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      ))}

      {stats.some((stat) => stat.username && stat.repo) && (
        <div className="mt-3 p-3 bg-background rounded border">
          <div style={{ textAlign: align }}>
            {stats
              .filter((stat) => stat.username && stat.repo)
              .map((stat, index) => (
                <img
                  key={index}
                  src={generateStatUrl(stat)}
                  alt={`${stat.type} badge`}
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
